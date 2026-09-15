import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { Link } from 'wouter';

type Stats = { conversations: string; messages: string; problems: string; new_problems: string; today_conversations: string; today_problems: string };
type VisitorStats = { actual_visits: string; display_offset: string; displayed_visits: string; updated_at: string };
type Conversation = { id: string; language: string; created_at: string; updated_at: string; message_count: number; first_message: string };
type Message = { id: string; role: 'user' | 'assistant'; content: string; created_at: string };
type Problem = { id: string; name: string; commune: string; description: string; language: string; status: 'new' | 'in_progress' | 'resolved'; created_at: string; updated_at: string };
type Tab = 'overview' | 'chats' | 'problems';

const API_BASE_URL = (() => {
  const configured = import.meta.env.VITE_CHAT_API_URL;
  if (!configured) return typeof window !== 'undefined' ? window.location.origin : '';
  return configured.replace(/\/api\/chat\/?$/, '').replace(/\/$/, '');
})();
const ADMIN_TOKEN_KEY = 'baramijx_admin_token';

async function api(path: string, options: RequestInit = {}) {
  let response: Response;
  try {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem(ADMIN_TOKEN_KEY) : null;
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    });
  } catch {
    throw new Error('Unable to connect to the admin server. Please check your connection and try again.');
  }

  const raw = await response.text();
  let data: any = {};
  try { data = raw ? JSON.parse(raw) : {}; } catch { data = { raw }; }
  if (!response.ok) {
    const detail = data?.error || data?.message || data?.raw || response.statusText;
    if (response.status === 401) {
      if (path === '/api/admin/login') throw new Error('Incorrect username or password.');
      throw new Error('Your admin session is not valid. Please sign in again.');
    }
    if (response.status === 400 && detail) throw new Error(String(detail));
    if (response.status === 403) throw new Error('You do not have permission to perform this action.');
    if (response.status === 404) throw new Error('The requested admin service could not be found. Please check the server deployment.');
    if (response.status >= 500) throw new Error('The admin server encountered an error. Please try again.');
    throw new Error(String(detail || 'Something went wrong. Please try again.'));
  }
  return data;
}

function formatDate(value: string) { return new Date(value).toLocaleString(); }

function Icon({ name }: { name: 'grid' | 'chat' | 'flag' | 'refresh' | 'logout' | 'menu' | 'close' | 'users' | 'message' | 'alert' | 'check' | 'eye' | 'eyeoff' }) {
  const common = { width: 19, height: 19, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const paths: Record<string, ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    chat: <><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.7 8.7 0 0 1-3.2-.6L4 20l1.6-4.1A7.3 7.3 0 0 1 4.5 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z"/><path d="M8 10h8M8 14h5"/></>,
    flag: <><path d="M5 21V4"/><path d="M5 5c4-3 7 2 14-1v10c-7 3-10-2-14 1"/></>,
    refresh: <><path d="M20 11a8 8 0 0 0-14.7-4L4 9"/><path d="M4 4v5h5"/><path d="M4 13a8 8 0 0 0 14.7 4L20 15"/><path d="M20 20v-5h-5"/></>,
    logout: <><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/><path d="M21 19V5a2 2 0 0 0-2-2h-6"/></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>,
    close: <><path d="M6 6l12 12M18 6 6 18"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9.5" cy="7" r="4"/><path d="M19 8a4 4 0 0 1 0 7.8"/></>,
    message: <path d="M21 12a8 8 0 0 1-8.5 8A9.2 9.2 0 0 1 9 19l-5 2 1.8-4.5A7.8 7.8 0 0 1 3 12a9 9 0 0 1 18 0Z"/>,
    alert: <><path d="M10.3 3.6 2.9 17a2 2 0 0 0 1.7 3h14.8a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/></>,
    eyeoff: <><path d="m3 3 18 18"/><path d="M10.6 6.2A10.6 10.6 0 0 1 12 6c6.5 0 10 6 10 6a18.4 18.4 0 0 1-3.2 3.8"/><path d="M6.7 6.7C3.7 8.6 2 12 2 12s3.5 6 10 6a10.4 10.4 0 0 0 3.5-.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [stats, setStats] = useState<Stats | null>(null);
  const [visitorStats, setVisitorStats] = useState<VisitorStats | null>(null);
  const [visitorInput, setVisitorInput] = useState('0');
  const [visitorSaving, setVisitorSaving] = useState(false);
  const [visitorError, setVisitorError] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<{ conversation: Conversation; messages: Message[] } | null>(null);
  const [tab, setTab] = useState<Tab>('overview');
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatSearch, setChatSearch] = useState('');
  const [problemSearch, setProblemSearch] = useState('');

  async function loadDashboard() {
    setLoading(true);
    try {
      const [statsData, conversationsData, problemsData] = await Promise.all([api('/api/admin/stats'), api('/api/admin/conversations'), api('/api/admin/problems')]);
      setStats(statsData); setConversations(conversationsData); setProblems(problemsData);
    } catch (error) {
      if (error instanceof Error && error.message.includes('session')) setAuthenticated(false);
    } finally { setLoading(false); }
    try {
      const visitorData = await api('/api/admin/visitors');
      setVisitorStats(visitorData); setVisitorInput(String(visitorData.displayed_visits)); setVisitorError('');
    } catch (error) {
      setVisitorError(error instanceof Error ? error.message : 'Unable to load visitor counter.');
    }
  }

  useEffect(() => {
    api('/api/admin/me').then(() => { setAuthenticated(true); void loadDashboard(); }).catch(() => setAuthenticated(false)).finally(() => setChecking(false));
  }, []);

  async function handleLogin(event: FormEvent) {
    event.preventDefault(); setLoginError('');
    try {
      const data = await api('/api/admin/login', { method: 'POST', body: JSON.stringify({ username, password }) });
      if (data?.admin_token) sessionStorage.setItem(ADMIN_TOKEN_KEY, data.admin_token);
      setAuthenticated(true);
      setPassword('');
      await loadDashboard();
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'Unable to sign in.');
    }
  }

  async function saveVisitorCount(event: FormEvent) {
    event.preventDefault();
    const desired = Number(visitorInput);
    if (!Number.isSafeInteger(desired) || desired < 0) { setVisitorError('Enter a non-negative whole number.'); return; }
    setVisitorSaving(true); setVisitorError('');
    try {
      const data = await api('/api/admin/visitors', { method: 'POST', body: JSON.stringify({ displayed_visits: desired }) });
      setVisitorStats(data); setVisitorInput(String(data.displayed_visits));
    } catch (error) { setVisitorError(error instanceof Error ? error.message : 'Unable to update visitor count.'); }
    finally { setVisitorSaving(false); }
  }

  async function handleLogout() {
    await api('/api/admin/logout', { method: 'POST' }).catch(() => undefined);
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    setAuthenticated(false); setStats(null); setVisitorStats(null); setConversations([]); setProblems([]);
  }
  async function openConversation(id: string) { try { setSelectedConversation(await api(`/api/admin/conversations/${id}`)); } catch (e) { window.alert(e instanceof Error ? e.message : 'Unable to load conversation.'); } }
  async function updateProblem(id: string, status: Problem['status']) { try { await api(`/api/admin/problems/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }); await loadDashboard(); } catch (e) { window.alert(e instanceof Error ? e.message : 'Unable to update problem.'); } }
  async function deleteProblem(id: string) { if (!window.confirm('Delete this problem report?')) return; try { await api(`/api/admin/problems/${id}`, { method: 'DELETE' }); await loadDashboard(); } catch (e) { window.alert(e instanceof Error ? e.message : 'Unable to delete problem.'); } }
  async function deleteConversation(id: string) { if (!window.confirm('Delete this conversation?')) return; try { await api(`/api/admin/conversations/${id}`, { method: 'DELETE' }); setSelectedConversation(null); await loadDashboard(); } catch (e) { window.alert(e instanceof Error ? e.message : 'Unable to delete conversation.'); } }

  const filteredConversations = useMemo(() => { const q = chatSearch.trim().toLowerCase(); return q ? conversations.filter(x => `${x.id} ${x.first_message} ${x.language}`.toLowerCase().includes(q)) : conversations; }, [chatSearch, conversations]);
  const filteredProblems = useMemo(() => { const q = problemSearch.trim().toLowerCase(); return q ? problems.filter(x => `${x.name} ${x.commune} ${x.description} ${x.status}`.toLowerCase().includes(q)) : problems; }, [problemSearch, problems]);

  if (checking) return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-900">Loading admin panel...</div>;
  if (!authenticated) return <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4" dir="ltr"><form onSubmit={handleLogin} className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl p-7 text-slate-900"><div className="flex items-center justify-between mb-6"><Link href="/" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold !text-slate-900 hover:bg-slate-50">← Back to website</Link><span className="text-xs text-slate-400">Admin</span></div><div className="text-center mb-7"><div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-xl">P</div><h1 className="text-3xl font-bold text-slate-900">Admin Portal</h1><p className="text-sm text-slate-600 mt-2">Private campaign administration</p></div><label className="block mb-4"><span className="text-sm font-medium text-slate-900">Username</span><input value={username} onChange={e => setUsername(e.target.value)} className="mt-1.5 w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400" autoComplete="username" /></label><label className="block mb-4"><span className="text-sm font-medium text-slate-900">Password</span><div className="relative mt-1.5"><input value={password} onChange={e => setPassword(e.target.value)} type={passwordVisible ? 'text' : 'password'} className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400" autoComplete="current-password" /><button type="button" aria-label={passwordVisible ? 'Hide password' : 'Show password'} onClick={() => setPasswordVisible(v => !v)} className="absolute right-0 top-0 h-full w-12 flex items-center justify-center text-slate-600 hover:text-slate-900" tabIndex={-1}><Icon name={passwordVisible ? 'eyeoff' : 'eye'} /></button></div></label>{loginError && <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700 break-words">{loginError}</div>}<button type="submit" className="admin-login-submit w-full rounded-xl py-3.5" style={{ backgroundColor: '#0F172A', color: '#FFFFFF', WebkitTextFillColor: '#FFFFFF', fontWeight: 700, fontSize: '16px', lineHeight: 1.2, minHeight: '52px', border: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 1, cursor: 'pointer' }}>Sign in to dashboard</button></form></div>;

  const nav: { id: Tab; label: string; icon: 'grid' | 'chat' | 'flag' }[] = [{ id: 'overview', label: 'Overview', icon: 'grid' }, { id: 'chats', label: 'Conversations', icon: 'chat' }, { id: 'problems', label: 'Problem Reports', icon: 'flag' }];
  return <div className="min-h-screen bg-slate-50 text-slate-900" dir="ltr">
    {sidebarOpen && <button className="fixed inset-0 z-40 bg-black/40 lg:hidden" aria-label="Close menu" onClick={() => setSidebarOpen(false)} />}
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 text-white flex flex-col transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}><div className="h-20 px-5 flex items-center justify-between border-b border-white/10"><div className="flex items-center gap-3"><div className="h-10 w-10 rounded-xl bg-white text-slate-950 flex items-center justify-center font-extrabold">P</div><div><p className="font-bold">Campaign Admin</p><p className="text-[11px] text-white/50">Management Portal</p></div></div><button className="lg:hidden" onClick={() => setSidebarOpen(false)}><Icon name="close" /></button></div><nav className="p-4 space-y-1 flex-1"><p className="px-3 py-2 text-[10px] uppercase tracking-widest text-white/35">Workspace</p>{nav.map(item => <button key={item.id} onClick={() => { setTab(item.id); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm ${tab === item.id ? 'bg-white text-slate-950' : 'text-white/65 hover:text-white hover:bg-white/10'}`}><Icon name={item.icon} /><span>{item.label}</span>{item.id === 'problems' && stats && stats.new_problems !== '0' && <span className="ml-auto text-xs rounded-full bg-white/10 px-2">{stats.new_problems}</span>}</button>)}</nav><div className="p-4 border-t border-white/10"><button onClick={handleLogout} className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm text-white/65 hover:text-white hover:bg-white/10"><Icon name="logout" /> Logout</button></div></aside>
    <main className="lg:ml-64 min-h-screen"><header className="sticky top-0 z-30 h-20 bg-white/90 backdrop-blur border-b px-4 sm:px-6 flex items-center justify-between"><div className="flex items-center gap-3"><button className="lg:hidden h-10 w-10 rounded-xl border flex items-center justify-center" onClick={() => setSidebarOpen(true)}><Icon name="menu" /></button><div><h1 className="text-xl sm:text-2xl font-bold">{tab === 'overview' ? 'Overview' : tab === 'chats' ? 'Conversations' : 'Problem Reports'}</h1><p className="text-xs text-slate-500 mt-1">Campaign management dashboard</p></div></div><button onClick={() => void loadDashboard()} className="h-10 px-3 rounded-xl border bg-white flex items-center gap-2 text-sm"><Icon name="refresh" /> Refresh</button></header>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {tab === 'overview' && <>
          <div className="grid grid-cols-2 xl:grid-cols-5 gap-4 mb-6">{[['Conversations', stats?.conversations ?? '—'], ['Messages', stats?.messages ?? '—'], ['Problems', stats?.problems ?? '—'], ['New problems', stats?.new_problems ?? '—'], ['Website Visitors', visitorStats?.displayed_visits ?? '—']].map(([label, value]) => <div key={label} className="bg-white border rounded-2xl p-5 shadow-sm"><p className="text-xs text-slate-500">{label}</p><p className="text-2xl font-bold mt-2">{value}</p></div>)}</div>
          <section className="bg-white border rounded-2xl shadow-sm p-5 sm:p-6 mb-6"><div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5"><div><h2 className="text-lg font-bold">Website Visitor Counter</h2><p className="text-sm text-slate-500 mt-1">The original visit count is preserved separately from the public displayed number.</p></div><Icon name="users" /></div><form onSubmit={saveVisitorCount} className="flex flex-col sm:flex-row gap-3"><input type="number" min="0" step="1" value={visitorInput} onChange={e => setVisitorInput(e.target.value)} className="w-full sm:max-w-xs px-4 py-3 rounded-xl border bg-slate-50" placeholder="Public visitor count" /><button disabled={visitorSaving} className="cta-button rounded-xl px-5 py-3" type="submit">{visitorSaving ? 'Updating...' : 'Update displayed number'}</button></form>{visitorError && <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-800 break-words"><strong>Visitor update error:</strong><div className="mt-1 font-mono text-xs whitespace-pre-wrap">{visitorError}</div></div>}<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5"><div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-500">Original visits</p><p className="text-xl font-bold mt-1">{visitorStats?.actual_visits ?? '—'}</p></div><div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-500">Public displayed</p><p className="text-xl font-bold mt-1">{visitorStats?.displayed_visits ?? '—'}</p></div><div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-500">Adjustment</p><p className="text-xl font-bold mt-1">{visitorStats?.display_offset ?? '—'}</p></div></div></section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><section className="bg-white border rounded-2xl p-5"><h2 className="font-bold">Today</h2><div className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-500">Conversations</p><p className="text-xl font-bold mt-1">{stats?.today_conversations ?? '—'}</p></div><div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-500">Problems</p><p className="text-xl font-bold mt-1">{stats?.today_problems ?? '—'}</p></div></div></section><section className="bg-white border rounded-2xl p-5"><h2 className="font-bold">Status</h2><p className="text-sm text-slate-500 mt-3">{loading ? 'Refreshing dashboard data...' : 'Dashboard is connected.'}</p></section></div>
        </>}
        {tab === 'chats' && <section className="bg-white border rounded-2xl shadow-sm overflow-hidden"><div className="p-5 border-b"><input value={chatSearch} onChange={e => setChatSearch(e.target.value)} placeholder="Search conversations..." className="w-full px-4 py-3 rounded-xl border bg-slate-50" /></div><div className="divide-y">{filteredConversations.length === 0 ? <p className="p-8 text-center text-slate-500">No conversations found.</p> : filteredConversations.map(c => <button key={c.id} onClick={() => void openConversation(c.id)} className="w-full text-left p-5 hover:bg-slate-50"><div className="flex justify-between gap-4"><div><p className="font-semibold truncate">{c.first_message || 'Conversation'}</p><p className="text-xs text-slate-500 mt-1">{c.language} · {c.message_count} messages · {formatDate(c.created_at)}</p></div><span className="text-xs text-slate-400">View</span></div></button>)}</div></section>}
        {tab === 'problems' && <section className="bg-white border rounded-2xl shadow-sm overflow-hidden"><div className="p-5 border-b"><input value={problemSearch} onChange={e => setProblemSearch(e.target.value)} placeholder="Search problem reports..." className="w-full px-4 py-3 rounded-xl border bg-slate-50" /></div><div className="divide-y">{filteredProblems.length === 0 ? <p className="p-8 text-center text-slate-500">No problem reports found.</p> : filteredProblems.map(p => <div key={p.id} className="p-5"><div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4"><div><p className="font-semibold">{p.name} · {p.commune}</p><p className="text-sm mt-2 whitespace-pre-wrap">{p.description}</p><p className="text-xs text-slate-500 mt-2">{p.language} · {formatDate(p.created_at)}</p></div><div className="flex gap-2 items-center"><select value={p.status} onChange={e => void updateProblem(p.id, e.target.value as Problem['status'])} className="px-3 py-2 rounded-lg border text-sm"><option value="new">New</option><option value="in_progress">In progress</option><option value="resolved">Resolved</option></select><button onClick={() => void deleteProblem(p.id)} className="px-3 py-2 rounded-lg border text-sm text-red-600">Delete</button></div></div></div>)}</div></section>}
      </div>
    </main>
    {selectedConversation && <div className="fixed inset-0 z-[100] bg-black/50 p-4 flex items-center justify-center" onMouseDown={e => { if (e.target === e.currentTarget) setSelectedConversation(null); }}><div className="w-full max-w-3xl max-h-[85vh] overflow-auto bg-white rounded-2xl shadow-2xl"><div className="sticky top-0 bg-white border-b p-5 flex justify-between"><div><h2 className="font-bold">Conversation</h2><p className="text-xs text-slate-500 mt-1">{selectedConversation.conversation.language} · {selectedConversation.conversation.id}</p></div><button onClick={() => setSelectedConversation(null)}><Icon name="close" /></button></div><div className="p-5 space-y-3">{selectedConversation.messages.map(m => <div key={m.id} className={`rounded-xl p-4 ${m.role === 'user' ? 'bg-slate-100' : 'bg-primary/10'}`}><p className="text-xs font-semibold mb-1">{m.role}</p><p className="whitespace-pre-wrap">{m.content}</p><p className="text-[10px] text-slate-400 mt-2">{formatDate(m.created_at)}</p></div>)}</div><div className="border-t p-4 flex justify-end"><button onClick={() => void deleteConversation(selectedConversation.conversation.id)} className="px-4 py-2 rounded-lg border text-red-600">Delete conversation</button></div></div></div>}
  </div>;
}
