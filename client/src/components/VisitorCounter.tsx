import { useEffect, useState } from 'react';

const API_BASE_URL = (() => {
  const configured = import.meta.env.VITE_CHAT_API_URL;
  if (!configured) return typeof window !== 'undefined' ? window.location.origin : '';
  return configured.replace(/\/api\/chat\/?$/, '').replace(/\/$/, '');
})();

interface VisitorCounterProps { language: 'ar' | 'fr' | 'en'; }

const labels = { ar: 'زوار الموقع', fr: 'Visiteurs du site', en: 'Website Visitors' };

export default function VisitorCounter({ language }: VisitorCounterProps) {
  const [visits, setVisits] = useState<number>(0);

  useEffect(() => {
    let active = true;
    const countedKey = 'baramijx-visitor-counted';
    const load = async () => {
      try {
        const counted = sessionStorage.getItem(countedKey);
        const response = await fetch(`${API_BASE_URL}/api/visitor/${counted ? 'count' : 'visit'}`, {
          method: counted ? 'GET' : 'POST',
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Visitor API unavailable');
        const data = await response.json();
        if (active) setVisits(Number.isFinite(Number(data.visits)) ? Math.max(0, Number(data.visits)) : 0);
        if (!counted) sessionStorage.setItem(countedKey, '1');
      } catch {
        // Keep the visible counter at 0 rather than hiding the component.
      }
    };
    void load();
    return () => { active = false; };
  }, []);

  return (
    <div className="mt-8 flex justify-center" aria-label={labels[language]}>
      <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/5 px-5 py-2.5 text-sm text-primary-foreground/80 shadow-sm">
        <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
        <span>{labels[language]}:</span>
        <strong className="text-accent tabular-nums">{visits.toLocaleString()}</strong>
      </div>
    </div>
  );
}
