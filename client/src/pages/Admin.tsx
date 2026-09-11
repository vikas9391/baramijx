import { useEffect, useState } from 'react';

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
  const [tab, setTab] = useState<'overview' | 'chats' | 'problems'>('overview');
  const [loading, setLoading] = useState(false);

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

  if (checking) return <div className="min-h-screen bg-background flex items-center justify-center text-foreground">Loading...</div>;

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="w-full max-w-md bg-card border border-border rounded-lg shadow-lg p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Admin Login</h1>
          <p className="text-sm text-muted-foreground mb-6">Private campaign administration</p>
          <div className="space-y-4">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              autoComplete="username"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
            {loginError && <p className="text-sm text-destructive">{loginError}</p>}
            <button type="submit" className="cta-button w-full">Sign in</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Campaign Admin</h1>
            <p className="text-sm text-muted-foreground">Chats and citizen problem reports</p>
          </div>
          <div className="flex gap-2">
            <button onClick={loadDashboard} disabled={loading} className="px-4 py-2 rounded-lg border border-border hover:border-accent">Refresh</button>
            <button onClick={handleLogout} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground">Logout</button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {(['overview', 'chats', 'problems'] as const).map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${tab === item ? 'bg-accent text-accent-foreground' : 'border border-border'}`}
            >
              {item === 'overview' ? 'Overview' : item === 'chats' ? 'Chat Conversations' : 'Problem Reports'}
            </button>
          ))}
        </div>

        {tab === 'overview' && stats && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-card border border-border rounded-lg p-5"><p className="text-sm text-muted-foreground">Conversations</p><p className="text-3xl font-bold mt-1">{stats.conversations}</p></div>
              <div className="bg-card border border-border rounded-lg p-5"><p className="text-sm text-muted-foreground">Messages</p><p className="text-3xl font-bold mt-1">{stats.messages}</p></div>
              <div className="bg-card border border-border rounded-lg p-5"><p className="text-sm text-muted-foreground">Problem Reports</p><p className="text-3xl font-bold mt-1">{stats.problems}</p></div>
              <div className="bg-card border border-border rounded-lg p-5"><p className="text-sm text-muted-foreground">New Problems</p><p className="text-3xl font-bold mt-1">{stats.new_problems}</p></div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-5">
                <h2 className="font-bold text-lg mb-3">Today</h2>
                <p className="text-sm text-muted-foreground">Chat conversations: <strong className="text-foreground">{stats.today_conversations}</strong></p>
                <p className="text-sm text-muted-foreground mt-2">Problem reports: <strong className="text-foreground">{stats.today_problems}</strong></p>
              </div>
              <div className="bg-card border border-border rounded-lg p-5">
                <h2 className="font-bold text-lg mb-3">Latest Activity</h2>
                <button onClick={() => setTab('chats')} className="text-sm text-accent font-semibold">View recent conversations →</button>
                <br />
                <button onClick={() => setTab('problems')} className="text-sm text-accent font-semibold mt-2">View problem reports →</button>
              </div>
            </div>
          </>
        )}

        {tab === 'chats' && (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="p-5 border-b border-border"><h2 className="font-bold text-lg">Chat Conversations</h2></div>
            <div className="divide-y divide-border">
              {conversations.length === 0 ? <p className="p-5 text-muted-foreground">No conversations yet.</p> : conversations.map((conversation) => (
                <div key={conversation.id} className="p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-1">
                      <span>#{conversation.id}</span><span>{conversation.language.toUpperCase()}</span><span>{formatDate(conversation.created_at)}</span><span>{conversation.message_count} messages</span>
                    </div>
                    <p className="text-sm truncate">{conversation.first_message}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => openConversation(conversation.id)} className="px-3 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-semibold">View</button>
                    <button onClick={() => deleteConversation(conversation.id)} className="px-3 py-2 rounded-lg border border-border text-sm">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'problems' && (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="p-5 border-b border-border"><h2 className="font-bold text-lg">Citizen Problem Reports</h2></div>
            <div className="divide-y divide-border">
              {problems.length === 0 ? <p className="p-5 text-muted-foreground">No problem reports yet.</p> : problems.map((problem) => (
                <div key={problem.id} className="p-5">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-2">
                        <span>#{problem.id}</span><span>{problem.language.toUpperCase()}</span><span>{formatDate(problem.created_at)}</span>
                      </div>
                      <p className="font-bold">{problem.name}</p>
                      <p className="text-sm text-accent mt-1">📍 {problem.commune}</p>
                      <p className="text-sm leading-relaxed mt-3 whitespace-pre-wrap">{problem.description}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <select value={problem.status} onChange={(e) => updateProblem(problem.id, e.target.value as Problem['status'])} className="px-3 py-2 rounded-lg border border-border bg-background text-sm">
                        <option value="new">New</option>
                        <option value="in_progress">In progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                      <button onClick={() => deleteProblem(problem.id)} className="px-3 py-2 rounded-lg border border-border text-sm">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedConversation && (
        <div className="fixed inset-0 z-[300] bg-black/70 p-3 sm:p-6 flex items-center justify-center" onMouseDown={(e) => { if (e.target === e.currentTarget) setSelectedConversation(null); }}>
          <div className="bg-card w-full max-w-3xl max-h-[90vh] rounded-lg border border-border shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-border flex items-center justify-between gap-3">
              <div><h2 className="font-bold">Conversation #{selectedConversation.conversation.id}</h2><p className="text-xs text-muted-foreground">{selectedConversation.conversation.language.toUpperCase()} · {formatDate(selectedConversation.conversation.created_at)}</p></div>
              <button onClick={() => setSelectedConversation(null)} className="w-9 h-9 rounded-full border border-border text-xl">×</button>
            </div>
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
              {selectedConversation.messages.map((message) => (
                <div key={message.id} className={`p-4 rounded-lg ${message.role === 'user' ? 'bg-primary text-primary-foreground ml-8' : 'bg-muted mr-8'}`}>
                  <p className="text-xs opacity-70 mb-1">{message.role === 'user' ? 'Visitor' : 'Assistant'} · {formatDate(message.created_at)}</p>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}