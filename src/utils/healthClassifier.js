export const classifyHealth = ({ hr, spo2, temperature }) => {
  if (hr > 135 || hr < 45 || spo2 < 88 || temperature > 39) return 'CRITICAL';
  if (hr > 120 || hr < 50 || spo2 < 92 || temperature > 38) return 'DANGER';
  if (hr > 110 || spo2 < 95 || temperature > 37.5) return 'WARNING';
  return 'NORMAL';
};
