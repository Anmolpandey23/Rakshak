import { useEffect, useState } from 'react';
import BarChart from '../components/charts/BarChart';
import ChartWrapper from '../components/ui/ChartWrapper';
import { ErrorState, Loader } from '../components/ui/Loader';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { alertService } from '../services/alertService';

export default function PreEntryGate() {
  const [checks, setChecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await alertService.getGateChecks();
      setChecks(data);
    } catch (err) {
      setError(err.message || 'Failed to load gate checks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const approveEntry = async (manholeId, status) => {
    if (status === 'UNSAFE') {
      const confirmed = window.confirm('This location is marked UNSAFE. Approve entry override anyway?');
      if (!confirmed) return;
    }

    await alertService.approveEntry(manholeId);
    setChecks((prev) =>
      prev.map((item) =>
        item.id === manholeId
          ? { ...item, status: 'SAFE', reason: 'Approved by supervisor after manual verification' }
          : item
      )
    );
    setMessage(`Entry approved for ${manholeId}.`);
  };

  if (loading) return <Loader rows={3} />;
  if (error) return <ErrorState message={error} onRetry={load} />;

  return (
    <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {message ? (
        <div className="lg:col-span-2 xl:col-span-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
          {message}
        </div>
      ) : null}

      {checks.map((check) => (
        <Card key={check.id} className="p-4" hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">{check.location}</p>
              <h3 className="text-sm font-semibold text-slate-100">{check.id}</h3>
            </div>
            <Badge value={check.status} />
          </div>

          <div className="mt-3 grid grid-cols-5 gap-2 text-xs">
            {Object.entries(check.readings).map(([key, value]) => (
              <div key={key} className="rounded-lg border border-slate-700 bg-slate-800/60 p-2 text-slate-200">
                <p className="text-[10px] text-slate-500">{key}</p>
                <p className="font-semibold">{value}</p>
              </div>
            ))}
          </div>

          <p className="mt-3 min-h-10 text-xs text-slate-400">{check.reason || 'All sensors are within safe range.'}</p>

          <ChartWrapper title="Depth-Based Gas Readings" subtitle="0m to 6m sensor layers">
            <BarChart
              labels={['0m', '2m', '4m', '6m']}
              values={check.depthReadings}
              label="Composite Risk"
              color={check.status === 'UNSAFE' ? '#EF4444' : '#10B981'}
            />
          </ChartWrapper>

          <button
            type="button"
            onClick={() => approveEntry(check.id, check.status)}
            disabled={check.status === 'SAFE'}
            className="mt-3 w-full rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {check.status === 'SAFE' ? 'Already Approved' : 'Approve Entry'}
          </button>
        </Card>
      ))}
    </section>
  );
}
