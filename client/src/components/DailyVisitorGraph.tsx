import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
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
    const observer = cleanup ? undefined : new MutationObserver(() => {
      const found = findTarget();
      if (found) observer.disconnect();
    });
    observer?.observe(document.body, { childList: true, subtree: true });
    return () => { observer?.disconnect(); cleanup?.(); };
  }, []);

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

  if (!host) return null;
  const chartData = data.map((item) => ({ ...item, visitors: Number(item.visitors) || 0, label: new Date(`${item.date}T00:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) }));
  const chart: ReactNode = <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 text-slate-900" dir="ltr">
    <div className="mb-4"><h2 className="text-lg font-bold">Daily Visitors</h2><p className="text-sm text-slate-500 mt-1">Actual visitor sessions recorded for the last 30 days.</p></div>
    {error ? <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-800 break-words"><strong>Daily visitor graph error:</strong><div className="mt-1 font-mono text-xs whitespace-pre-wrap">{error}</div></div> : chartData.length ? <div className="h-72 w-full"><ResponsiveContainer width="100%" height="100%"><LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="label" tick={{ fontSize: 11 }}/><YAxis allowDecimals={false} tick={{ fontSize: 11 }}/><Tooltip labelFormatter={(_, payload) => payload?.[0]?.payload?.date || ''}/><Line type="monotone" dataKey="visitors" name="Visitors" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 5 }}/></LineChart></ResponsiveContainer></div> : <div className="h-72 flex items-center justify-center text-sm text-slate-500">No visitor data recorded yet.</div>}
  </section>;
  return createPortal(chart, host);
}
