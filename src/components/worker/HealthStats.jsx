export default function HealthStats({ health }) {
  return (
    <div className="grid grid-cols-3 gap-2 text-xs">
      <div className="rounded-lg border border-slate-700 bg-slate-800/60 px-2 py-2">
        <p className="text-slate-400">HR</p>
        <p className="font-semibold text-slate-100">{health.hr} bpm</p>
      </div>
      <div className="rounded-lg border border-slate-700 bg-slate-800/60 px-2 py-2">
        <p className="text-slate-400">SpO2</p>
        <p className="font-semibold text-slate-100">{health.spo2}%</p>
      </div>
      <div className="rounded-lg border border-slate-700 bg-slate-800/60 px-2 py-2">
        <p className="text-slate-400">Temp</p>
        <p className="font-semibold text-slate-100">{health.temperature} C</p>
      </div>
    </div>
  );
}
