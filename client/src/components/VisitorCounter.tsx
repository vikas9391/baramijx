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
    let retryTimer: ReturnType<typeof setTimeout> | undefined;
    const countedKey = 'baramijx-visitor-counted';

    const load = async () => {
      try {
        const counted = sessionStorage.getItem(countedKey) === '1';
        const response = await fetch(`${API_BASE_URL}/api/visitor/${counted ? 'count' : 'visit'}`, {
          method: counted ? 'GET' : 'POST',
          credentials: 'include',
          cache: 'no-store',
          headers: { Accept: 'application/json' },
        });
        if (!response.ok) throw new Error(`Visitor API returned ${response.status}`);
        const data = await response.json();
        const nextVisits = Number(data?.visits);
        if (!Number.isFinite(nextVisits)) throw new Error('Visitor API returned an invalid count');
        if (active) setVisits(Math.max(0, Math.floor(nextVisits)));
        // Only mark this browser session as counted after the increment succeeds.
        if (!counted) sessionStorage.setItem(countedKey, '1');
      } catch {
        // Retry once after a short delay so a temporary backend startup/network
        // issue does not leave the public counter stuck at zero.
        if (active) retryTimer = setTimeout(() => void load(), 1500);
      }
    };

    void load();
    return () => {
      active = false;
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, []);

  return (
    <div className="mt-8 flex justify-center" aria-label={labels[language]} aria-live="polite">
      <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/5 px-5 py-2.5 text-sm text-primary-foreground/80 shadow-sm">
        <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
        <span>{labels[language]}:</span>
        <strong className="text-accent tabular-nums">{visits.toLocaleString()}</strong>
      </div>
    </div>
  );
}
