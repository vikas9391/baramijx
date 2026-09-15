import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const API_BASE_URL = (() => {
  const configured = import.meta.env.VITE_CHAT_API_URL;
  if (!configured) return typeof window !== 'undefined' ? window.location.origin : '';
  return configured.replace(/\/api\/chat\/?$/, '').replace(/\/$/, '');
})();

type DailyVisitor = { date: string; visitors: string };

export default function DailyVisitorGraph() {
  const [data, setData] = useState<DailyVisitor[]>([]);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/admin/me`, { credentials: 'include' })
      .then((response) => {
        if (!response.ok) throw new Error('Not authenticated');
        return fetch(`${API_BASE_URL}/api/admin/visitors/daily?days=30`, { credentials: 'include' });
      })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Unable to load daily visitors (${response.status})`);
        const result = await response.json();
        setData(Array.isArray(result?.days) ? result.days : []);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Unable to load daily visitors.'));
  }, []);

  if (!open) return <button type="button" onClick={() => setOpen(true)} className="fixed bottom-4 right-4 z-[90] rounded-xl bg-slate-950 text-white px-4 py-3 text-sm font-semibold shadow-xl">Daily Visitors</button>;

  const chartData = data.map((item) => ({ ...item, visitors: Number(item.visitors) || 0, label: new Date(`${item.date}T00:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) }));

  return <section className="fixed bottom-4 right-4 z-[90] w-[min(430px,calc(100vw-2rem))] bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 text-slate-900" dir="ltr">
    <div className="flex items-center justify-between mb-3">
      <div><h2 className="font-bold">Daily Visitors</h2><p className="text-xs text-slate-500 mt-0.5">Last 30 days</p></div>
      <button type="button" onClick={() => setOpen(false)} aria-label="Close daily visitor graph" className="w-8 h-8 rounded-lg border text-slate-600 hover:bg-slate-50">×</button>
    </div>
    {error ? <p className="text-xs text-red-600 break-words">{error}</p> : chartData.length ? <div className="h-48"><ResponsiveContainer width="100%" height="100%"><LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="label" tick={{ fontSize: 10 }}/><YAxis allowDecimals={false} tick={{ fontSize: 10 }}/><Tooltip labelFormatter={(_, payload) => payload?.[0]?.payload?.date || ''}/><Line type="monotone" dataKey="visitors" name="Visitors" strokeWidth={2.5} dot={{ r: 2 }} activeDot={{ r: 4 }}/></LineChart></ResponsiveContainer></div> : <p className="h-48 flex items-center justify-center text-xs text-slate-500">No visitor data recorded yet.</p>}
  </section>;
}
