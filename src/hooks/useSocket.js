import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const randomDelta = (value, variance = 0.2) => Math.max(0, Number((value + (Math.random() - 0.5) * variance).toFixed(2)));

export const useSocket = ({ enabled = true, onWorkerUpdate, onAlertEvent }) => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;

    // This is API-ready: if backend socket exists, this connection can be used directly.
    const socket = io('http://localhost:4000', {
      autoConnect: false,
      transports: ['websocket'],
      reconnection: true
    });

    socketRef.current = socket;

    const intervalId = window.setInterval(() => {
      const workerId = ['RK-1001', 'RK-1002', 'RK-1003', 'RK-1004'][Math.floor(Math.random() * 4)];
      const payload = {
        workerId,
        updatedAt: new Date().toISOString(),
        batteryDelta: Math.random() > 0.7 ? -1 : 0,
        gases: {
          H2S: randomDelta(10 + Math.random() * 20, 2),
          CH4: randomDelta(4 + Math.random() * 8, 1.2),
          CO: randomDelta(20 + Math.random() * 90, 5),
          O2: randomDelta(20 - Math.random() * 4, 0.4),
          NH3: randomDelta(10 + Math.random() * 60, 3)
        }
      };
      onWorkerUpdate?.(payload);

      if (payload.gases.CO > 80 || payload.gases.H2S > 28 || payload.gases.O2 < 17.5) {
        onAlertEvent?.({
          workerId,
          severity: payload.gases.CO > 110 || payload.gases.O2 < 16.8 ? 'CRITICAL' : 'DANGER',
          type: 'REALTIME_SENSOR_BREACH',
          createdAt: payload.updatedAt,
          gases: payload.gases
        });
      }
    }, 3500);

    return () => {
      window.clearInterval(intervalId);
      socket.disconnect();
    };
  }, [enabled, onAlertEvent, onWorkerUpdate]);

  return { socket: socketRef.current };
};
