import { useEffect, useState } from 'react';

const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL || 'http://localhost:3001/api/chat';
const API_BASE_URL = CHAT_API_URL.replace(/\/api\/chat\/?$/, '');

interface VisitorCounterProps {
  language: 'ar' | 'fr' | 'en';
}

const labels = {
  ar: 'زوار الموقع',
  fr: 'Visiteurs du site',
  en: 'Website Visitors',
};

export default function VisitorCounter({ language }: VisitorCounterProps) {
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    const countedKey = 'baramijx-visitor-counted';
    if (sessionStorage.getItem(countedKey)) {
      fetch(`${API_BASE_URL}/api/visitor/count`)
        .then((r) => r.json())
        .then((data) => setVisits(Number(data.visits) || 0))
        .catch(() => undefined);
      return;
    }

    fetch(`${API_BASE_URL}/api/visitor/visit`, { method: 'POST' })
      .then((r) => r.json())
      .then((data) => {
        setVisits(Number(data.visits) || 0);
        sessionStorage.setItem(countedKey, '1');
      })
      .catch(() => undefined);
  }, []);

  if (visits === null) return null;

  return (
    <div className="mt-8 flex justify-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-2 text-xs text-primary-foreground/75">
        <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
        <span>{labels[language]}:</span>
        <strong className="text-accent tabular-nums">{visits.toLocaleString()}</strong>
      </div>
    </div>
  );
}
