import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const API_BASE_URL = (() => {
  const configured = import.meta.env.VITE_CHAT_API_URL;
  if (!configured) return typeof window !== 'undefined' ? window.location.origin : '';
  return configured.replace(/\/api\/chat\/?$/, '').replace(/\/$/, '');
})();

type DailyVisitor = { date: string; visitors: string };
type TrackingInfo = { year: number; month: number; start_date: string; days: DailyVisitor[] };

function currentMonth() { const now = new Date(); return { year: now.getFullYear(), month: now.getMonth() + 1 }; }
function labelForMonth(year: number, month: number) { return new Date(year, month - 1, 1).toLocaleDateString(undefined, { month: 'long', year: 'numeric' }); }

export default function DailyVisitorGraph() {
  const current = currentMonth();
  const [selectedYear, setSelectedYear] = useState(current.year);
  const [selectedMonth, setSelectedMonth] = useState(current.month);
  const [trackingStart, setTrackingStart] = useState(`${current.year}-${String(current.month).padStart(2, '0')}-01`);
  const [data, setData] = useState<DailyVisitor[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [host, setHost] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const findTarget = () => {
      const heading = Array.from(document.querySelectorAll('h2')).find((node) => node.textContent?.trim() === 'Website Visitor Counter');
      const section = heading?.closest('section');
      if (!section?.parentElement) return;
      const target = document.createElement('div');
      target.className = 'mb-6';
      section.parentElement.insertBefore(target, section);
      setHost(target);
      return () => { target.remove(); setHost(null); };
    };
    const cleanup = findTarget();
    const observer = cleanup ? undefined : new MutationObserver(() => { const found = findTarget(); if (found) observer.disconnect(); });
    observer?.observe(document.body, { childList: true, subtree: true });
    return () => { observer?.disconnect(); cleanup?.(); };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true); setError('');
    // AdminPage already verifies the session before this component is rendered.
    // Avoid a second /api/admin/me request here: immediately after login that
    // extra request can race the newly-created session cookie and briefly report
    // "Not authenticated" even though the dashboard itself is authenticated.
    fetch(`${API_BASE_URL}/api/admin/visitors/daily?year=${selectedYear}&month=${selectedMonth}`, { credentials: 'include' })
      .then(async (response) => {
        if (!response.ok) {
          const raw = await response.text();
          throw new Error(`Unable to load ${labelForMonth(selectedYear, selectedMonth)} (${response.status}): ${raw || response.statusText}`);
        }
        return response.json() as Promise<TrackingInfo>;
      })
      .then((result) => {
        if (!cancelled) {
          setTrackingStart(result.start_date);
          setData(Array.isArray(result.days) ? result.days : []);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Unable to load daily visitors.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [selectedYear, selectedMonth]);

  const start = useMemo(() => { const [year, month] = trackingStart.split('-').map(Number); return { year: year || current.year, month: month || current.month }; }, [trackingStart, current.year, current.month]);
  const years = useMemo(() => Array.from({ length: Math.max(1, current.year - start.year + 1) }, (_, i) => start.year + i), [start.year, current.year]);
  const months = useMemo(() => {
    const first = selectedYear === start.year ? start.month : 1;
    const last = selectedYear === current.year ? current.month : 12;
    if (first > last) return [];
    return Array.from({ length: last - first + 1 }, (_, i) => first + i);
  }, [selectedYear, start.year, start.month, current.year, current.month]);

  const chartData = data.map((item) => ({ ...item, visitors: Number(item.visitors) || 0, label: new Date(`${item.date}T00:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) }));
  if (!host) return null;

  const chart: ReactNode = <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 text-slate-900" dir="ltr">
    <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div><h2 className="text-lg font-bold">Daily Visitors</h2><p className="text-sm text-slate-500 mt-1">Actual visitor sessions recorded by day. Tracking starts from {labelForMonth(start.year, start.month)}.</p></div>
      <div className="flex gap-2" dir="ltr">
        <label className="flex flex-col gap-1 text-xs font-medium text-slate-600">Month<select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))} className="h-10 min-w-28 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900">{months.map((month) => <option key={month} value={month}>{new Date(2000, month - 1, 1).toLocaleDateString(undefined, { month: 'short' })}</option>)}</select></label>
        <label className="flex flex-col gap-1 text-xs font-medium text-slate-600">Year<select value={selectedYear} onChange={(e) => { const year = Number(e.target.value); setSelectedYear(year); setSelectedMonth(year === current.year ? current.month : year === start.year ? start.month : 1); }} className="h-10 min-w-24 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900">{years.map((year) => <option key={year} value={year}>{year}</option>)}</select></label>
      </div>
    </div>
    {error ? <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-800 break-words"><strong>Daily visitor graph error:</strong><div className="mt-1 font-mono text-xs whitespace-pre-wrap">{error}</div></div> : loading ? <div className="h-72 flex items-center justify-center text-sm text-slate-500">Loading visitor data...</div> : chartData.length ? <div className="h-72 w-full"><ResponsiveContainer width="100%" height="100%"><LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="label" tick={{ fontSize: 11 }}/><YAxis allowDecimals={false} tick={{ fontSize: 11 }}/><Tooltip labelFormatter={(_, payload) => payload?.[0]?.payload?.date || ''}/><Line type="monotone" dataKey="visitors" name="Visitors" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 5 }}/></LineChart></ResponsiveContainer></div> : <div className="h-72 flex items-center justify-center text-sm text-slate-500">No visitor data recorded for this month.</div>}
  </section>;
  return createPortal(chart, host);
}
