import { useEffect, useMemo, useState } from 'react';

const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL || 'http://localhost:3001/api/chat';
const API_BASE_URL = CHAT_API_URL.replace(/\/api\/chat\/?$/, '');

type Stats = {
  conversations: string;
  messages: string;
  problems: string;
  new_problems: string;
  today_conversations: string;
  today_problems: string;
};

type Conversation = {
  id: string;
  language: string;
  created_at: string;
  updated_at: string;
  message_count: number;
  first_message: string;
};

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
};

type Problem = {
  id: string;
  name: string;
  commune: string;
  description: string;
  language: string;
  status: 'new' | 'in_progress' | 'resolved';
  created_at: string;
  updated_at: string;
};

type Tab = 'overview' | 'chats' | 'problems';

async function api(path: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || 'Request failed');
  }
  return response.json();
}

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

function statusLabel(status: Problem['status']) {
  return status === 'in_progress' ? 'In progress' : status === 'resolved' ? 'Resolved' : 'New';
}

function Icon({ name }: { name: 'grid' | 'chat' | 'flag' | 'refresh' | 'logout' | 'menu' | 'close' | 'arrow' | 'users' | 'message' | 'alert' | 'check' }) {
  const common = { width: 19, height: 19, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const paths: Record<string, React.ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    chat: <><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.7 8.7 0 0 1-3.2-.6L4 20l1.6-4.1A7.3 7.3 0 0 1 4.5 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z" /><path d="M8 10h8M8 14h5" /></>,
    flag: <><path d="M5 21V4" /><path d="M5 5c4-3 7 2 14-1v10c-7 3-10-2-14 1" /></>,
    refresh: <><path d="M20 11a8 8 0 0 0-14.7-4L4 9" /><path d="M4 4v5h5" /><path d="M4 13a8 8 0 0 0 14.7 4L20 15" /><path d="M20 20v-5h-5" /></>,
    logout: <><path d="M10 17l5-5-5-5" /><path d="M15 12H3" /><path d="M21 19V5a2 2 0 0 0-2-2h-6" /></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    close: <><path d="M6 6l12 12M18 6 6 18" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="9.5" cy="7" r="4" /><path d="M19 8a4 4 0 0 1 0 7.8" /></>,
    message: <><path d="M21 12a8 8 0 0 1-8.5 8A9.2 9.2 0 0 1 9 19l-5 2 1.8-4.5A7.8 7.8 0 0 1 3 12a9 9 0 0 1 18 0Z" /></>,
    alert: <><path d="M10.3 3.6 2.9 17a2 2 0 0 0 1.7 3h14.8a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4M12 17h.01" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [stats, setStats] = useState<Stats | null>(null);
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
      const [statsData, conversationsData, problemsData] = await Promise.all([
        api('/api/admin/stats'),
        api('/api/admin/conversations'),
        api('/api/admin/problems'),
      ]);
      setStats(statsData);
      setConversations(conversationsData);
      setProblems(problemsData);
    } catch (error) {
      if (error instanceof Error && error.message === 'Unauthorized.') setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    api('/api/admin/me')
      .then(() => {
        setAuthenticated(true);
        return loadDashboard();
      })
      .catch(() => setAuthenticated(false))
      .finally(() => setChecking(false));
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError('');
    try {
      await api('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
      setAuthenticated(true);
      setPassword('');
      await loadDashboard();
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'Unable to sign in.');
    }
  }

  async function handleLogout() {
    await api('/api/admin/logout', { method: 'POST' }).catch(() => undefined);
    setAuthenticated(false);
    setStats(null);
    setConversations([]);
    setProblems([]);
  }

  async function openConversation(id: string) {
    try {
      const data = await api(`/api/admin/conversations/${id}`);
      setSelectedConversation(data);
    } catch (error) {
      window.alert(error instanceof Error ? error.message : 'Unable to load conversation.');
    }
  }

  async function updateProblem(id: string, status: Problem['status']) {
    try {
      await api(`/api/admin/problems/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      await loadDashboard();
    } catch (error) {
      window.alert(error instanceof Error ? error.message : 'Unable to update problem.');
    }
  }

  async function deleteProblem(id: string) {
    if (!window.confirm('Delete this problem report?')) return;
    try {
      await api(`/api/admin/problems/${id}`, { method: 'DELETE' });
      await loadDashboard();
    } catch (error) {
      window.alert(error instanceof Error ? error.message : 'Unable to delete problem.');
    }
  }

  async function deleteConversation(id: string) {
    if (!window.confirm('Delete this conversation?')) return;
    try {
      await api(`/api/admin/conversations/${id}`, { method: 'DELETE' });
      setSelectedConversation(null);
      await loadDashboard();
    } catch (error) {
      window.alert(error instanceof Error ? error.message : 'Unable to delete conversation.');
    }
  }

  const filteredConversations = useMemo(() => {
    const query = chatSearch.trim().toLowerCase();
    if (!query) return conversations;
    return conversations.filter((item) => `${item.id} ${item.first_message} ${item.language}`.toLowerCase().includes(query));
  }, [chatSearch, conversations]);

  const filteredProblems = useMemo(() => {
    const query = problemSearch.trim().toLowerCase();
    if (!query) return problems;
    return problems.filter((item) => `${item.name} ${item.commune} ${item.description} ${item.status}`.toLowerCase().includes(query));
  }, [problemSearch, problems]);

  const navigate = (nextTab: Tab) => {
    setTab(nextTab);
    setSidebarOpen(false);
  };

  if (checking) {
    return <div dir="ltr" className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-600">Loading admin panel...</div>;
  }

  if (!authenticated) {
    return (
      <div dir="ltr" className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-7">
            <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg text-xl font-bold">P</div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Portal</h1>
            <p className="text-sm text-slate-500 mt-2">Private campaign administration</p>
          </div>
          <form onSubmit={handleLogin} className="bg-white border border-slate-200 rounded-2xl shadow-xl p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">Welcome back</h2>
              <p className="text-sm text-slate-500 mt-1">Sign in to manage conversations and citizen reports.</p>
            </div>
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Username</span>
                <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" autoComplete="username" className="mt-1.5 w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent" />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Password</span>
                <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" autoComplete="current-password" className="mt-1.5 w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent" />
              </label>
              {loginError && <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">{loginError}</div>}
              <button type="submit" className="cta-button w-full !rounded-xl !py-3.5">Sign in to dashboard</button>
            </div>
          </form>
          <p className="text-center text-xs text-slate-400 mt-5">Private area · Authorized administrators only</p>
        </div>
      </div>
    );
  }

  const navItems: { id: Tab; label: string; icon: 'grid' | 'chat' | 'flag' }[] = [
    { id: 'overview', label: 'Overview', icon: 'grid' },
    { id: 'chats', label: 'Conversations', icon: 'chat' },
    { id: 'problems', label: 'Problem Reports', icon: 'flag' },
  ];

  return (
    <div dir="ltr" className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      {sidebarOpen && <button aria-label="Close menu" className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 text-white flex flex-col transform transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-20 px-5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white text-slate-950 flex items-center justify-center font-extrabold">P</div>
            <div>
              <p className="font-bold leading-tight">Campaign Admin</p>
              <p className="text-[11px] text-white/50 mt-0.5">Management Portal</p>
            </div>
          </div>
          <button className="lg:hidden text-white/70" onClick={() => setSidebarOpen(false)}><Icon name="close" /></button>
        </div>

        <nav className="p-4 space-y-1 flex-1">
          <p className="px-3 pt-2 pb-3 text-[10px] uppercase tracking-[0.16em] text-white/35 font-semibold">Workspace</p>
          {navItems.map((item) => (
            <button key={item.id} onClick={() => navigate(item.id)} className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition ${tab === item.id ? 'bg-white text-slate-950 shadow-sm' : 'text-white/65 hover:text-white hover:bg-white/10'}`}>
              <Icon name={item.icon} />
              <span>{item.label}</span>
              {item.id === 'problems' && stats?.new_problems !== '0' && <span className={`ml-auto text-[10px] rounded-full px-2 py-0.5 ${tab === item.id ? 'bg-slate-100' : 'bg-white/10'}`}>{stats?.new_problems}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="rounded-xl bg-white/5 p-3 mb-3">
            <p className="text-xs text-white/40">Admin access</p>
            <p className="text-sm mt-1 text-white/80">Authenticated session</p>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm text-white/65 hover:text-white hover:bg-white/10 transition"><Icon name="logout" /> Logout</button>
        </div>
      </aside>

      <main className="lg:ml-64 min-h-screen">
        <header className="sticky top-0 z-30 h-20 bg-white/90 backdrop-blur border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="lg:hidden h-10 w-10 rounded-xl border border-slate-200 flex items-center justify-center" onClick={() => setSidebarOpen(true)}><Icon name="menu" /></button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{tab === 'overview' ? 'Overview' : tab === 'chats' ? 'Conversations' : 'Problem Reports'}</h1>
              <p className="hidden sm:block text-xs text-slate-500 mt-0.5">Monitor and manage campaign activity</p>
            </div>
          </div>
          <button onClick={loadDashboard} disabled={loading} className="h-10 px-3 sm:px-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 disabled:opacity-50 flex items-center gap-2 text-sm font-medium">
            <Icon name="refresh" /><span className="hidden sm:inline">{loading ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </header>

        <div className="p-4 sm:p-6 lg:p-8 max-w-[1500px] mx-auto">
          {tab === 'overview' && stats && (
            <>
              <div className="mb-7">
                <h2 className="text-lg font-semibold">Good to see you</h2>
                <p className="text-sm text-slate-500 mt-1">Here is what is happening across your public website.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Conversations', value: stats.conversations, icon: 'chat' as const, note: `${stats.today_conversations} today` },
                  { label: 'Total Messages', value: stats.messages, icon: 'message' as const, note: 'Visitor + assistant' },
                  { label: 'Problem Reports', value: stats.problems, icon: 'flag' as const, note: `${stats.today_problems} today` },
                  { label: 'New Problems', value: stats.new_problems, icon: 'alert' as const, note: 'Need attention' },
                ].map((card) => (
                  <div key={card.label} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center"><Icon name={card.icon} /></div>
                      <span className="text-[11px] text-slate-400">LIVE</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-5">{card.label}</p>
                    <p className="text-3xl font-bold tracking-tight mt-1">{card.value}</p>
                    <p className="text-xs text-slate-400 mt-2">{card.note}</p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-5 sm:p-6 flex items-center justify-between border-b border-slate-100">
                    <div><h2 className="font-semibold">Recent conversations</h2><p className="text-xs text-slate-500 mt-1">Latest visitor questions</p></div>
                    <button onClick={() => navigate('chats')} className="text-xs font-semibold text-accent flex items-center gap-1">View all <Icon name="arrow" /></button>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {conversations.slice(0, 5).map((conversation) => (
                      <button key={conversation.id} onClick={() => openConversation(conversation.id)} className="w-full text-left p-4 sm:p-5 hover:bg-slate-50 transition flex items-center gap-4">
                        <div className="h-9 w-9 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"><Icon name="chat" /></div>
                        <div className="min-w-0 flex-1"><p className="text-sm font-medium truncate">{conversation.first_message}</p><p className="text-xs text-slate-400 mt-1">{formatDate(conversation.created_at)} · {conversation.language.toUpperCase()}</p></div>
                        <Icon name="arrow" />
                      </button>
                    ))}
                    {conversations.length === 0 && <p className="p-6 text-sm text-slate-400">No conversations yet.</p>}
                  </div>
                </section>

                <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-5 sm:p-6 flex items-center justify-between border-b border-slate-100">
                    <div><h2 className="font-semibold">Recent problem reports</h2><p className="text-xs text-slate-500 mt-1">Citizen submissions needing review</p></div>
                    <button onClick={() => navigate('problems')} className="text-xs font-semibold text-accent flex items-center gap-1">View all <Icon name="arrow" /></button>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {problems.slice(0, 5).map((problem) => (
                      <div key={problem.id} className="p-4 sm:p-5 flex items-center gap-4">
                        <div className="h-9 w-9 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"><Icon name="flag" /></div>
                        <div className="min-w-0 flex-1"><p className="text-sm font-medium truncate">{problem.name} · {problem.commune}</p><p className="text-xs text-slate-400 mt-1 truncate">{problem.description}</p></div>
                        <span className={`shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full ${problem.status === 'resolved' ? 'bg-emerald-50 text-emerald-700' : problem.status === 'in_progress' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'}`}>{statusLabel(problem.status)}</span>
                      </div>
                    ))}
                    {problems.length === 0 && <p className="p-6 text-sm text-slate-400">No problem reports yet.</p>}
                  </div>
                </section>
              </div>
            </>
          )}

          {tab === 'chats' && (
            <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div><h2 className="font-semibold">Chat Conversations</h2><p className="text-xs text-slate-500 mt-1">Every stored visitor question and assistant response</p></div>
                <input value={chatSearch} onChange={(e) => setChatSearch(e.target.value)} placeholder="Search conversations..." className="w-full md:w-72 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/30" />
              </div>
              <div className="divide-y divide-slate-100">
                {filteredConversations.length === 0 ? <p className="p-8 text-sm text-slate-400">No conversations found.</p> : filteredConversations.map((conversation) => (
                  <div key={conversation.id} className="p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 hover:bg-slate-50/70 transition">
                    <div className="flex gap-4 min-w-0"><div className="h-10 w-10 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600"><Icon name="chat" /></div><div className="min-w-0"><div className="flex flex-wrap gap-2 text-[11px] text-slate-400 mb-1.5"><span>#{conversation.id}</span><span>{conversation.language.toUpperCase()}</span><span>{conversation.message_count} messages</span><span>{formatDate(conversation.created_at)}</span></div><p className="text-sm font-medium truncate max-w-3xl">{conversation.first_message}</p></div></div>
                    <div className="flex gap-2 shrink-0"><button onClick={() => openConversation(conversation.id)} className="px-4 py-2.5 rounded-xl bg-slate-950 text-white text-sm font-semibold hover:bg-slate-800">View conversation</button><button onClick={() => deleteConversation(conversation.id)} className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm hover:bg-red-50 hover:text-red-700 hover:border-red-100">Delete</button></div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {tab === 'problems' && (
            <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div><h2 className="font-semibold">Citizen Problem Reports</h2><p className="text-xs text-slate-500 mt-1">Review submissions and update their status</p></div>
                <input value={problemSearch} onChange={(e) => setProblemSearch(e.target.value)} placeholder="Search reports..." className="w-full md:w-72 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/30" />
              </div>
              <div className="divide-y divide-slate-100">
                {filteredProblems.length === 0 ? <p className="p-8 text-sm text-slate-400">No problem reports found.</p> : filteredProblems.map((problem) => (
                  <div key={problem.id} className="p-5 sm:p-6">
                    <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-5">
                      <div className="flex gap-4 min-w-0"><div className="h-10 w-10 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600"><Icon name="flag" /></div><div className="min-w-0"><div className="flex flex-wrap gap-2 text-[11px] text-slate-400 mb-2"><span>#{problem.id}</span><span>{problem.language.toUpperCase()}</span><span>{formatDate(problem.created_at)}</span></div><p className="font-semibold">{problem.name}</p><p className="text-sm font-medium text-slate-500 mt-1">📍 {problem.commune}</p><p className="text-sm leading-relaxed text-slate-600 mt-3 whitespace-pre-wrap">{problem.description}</p></div></div>
                      <div className="flex flex-wrap items-center gap-2 shrink-0 xl:pt-1"><span className={`text-xs font-semibold px-3 py-2 rounded-xl ${problem.status === 'resolved' ? 'bg-emerald-50 text-emerald-700' : problem.status === 'in_progress' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'}`}>{statusLabel(problem.status)}</span><select value={problem.status} onChange={(e) => updateProblem(problem.id, e.target.value as Problem['status'])} className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none"><option value="new">New</option><option value="in_progress">In progress</option><option value="resolved">Resolved</option></select><button onClick={() => deleteProblem(problem.id)} className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm hover:bg-red-50 hover:text-red-700 hover:border-red-100">Delete</button></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {selectedConversation && (
        <div className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-sm p-3 sm:p-6 flex items-center justify-center" onMouseDown={(e) => { if (e.target === e.currentTarget) setSelectedConversation(null); }}>
          <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col" dir="ltr">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between gap-3"><div><h2 className="font-bold">Conversation #{selectedConversation.conversation.id}</h2><p className="text-xs text-slate-400 mt-1">{selectedConversation.conversation.language.toUpperCase()} · {formatDate(selectedConversation.conversation.created_at)}</p></div><button onClick={() => setSelectedConversation(null)} className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50"><Icon name="close" /></button></div>
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/60">
              {selectedConversation.messages.map((message) => (
                <div key={message.id} className={`max-w-[88%] p-4 rounded-2xl ${message.role === 'user' ? 'ml-auto bg-slate-950 text-white rounded-br-md' : 'mr-auto bg-white border border-slate-200 text-slate-800 rounded-bl-md shadow-sm'}`}>
                  <p className="text-[11px] opacity-60 mb-1.5">{message.role === 'user' ? 'Visitor' : 'Assistant'} · {formatDate(message.created_at)}</p>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-slate-100 flex justify-end"><button onClick={() => deleteConversation(selectedConversation.conversation.id)} className="px-4 py-2.5 rounded-xl border border-red-100 text-red-700 text-sm hover:bg-red-50">Delete conversation</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
