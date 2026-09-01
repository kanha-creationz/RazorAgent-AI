const fs = require('fs');
const path = require('path');

function save(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content.trimStart(), 'utf8');
  console.log('Saved:', filePath);
}

// 1. src/app/dashboard/page.tsx
save('src/app/dashboard/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Users,
  Bot,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Play,
  Pause
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function DashboardOverviewPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [demoSimActive, setDemoSimActive] = useState(true);

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(json => {
        if (json?.data) setData(json.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const COLORS = ['#F5A623', '#7C5CFF', '#20C997', '#FF5D5D'];

  if (loading) {
    return <div className="max-w-7xl mx-auto p-12 text-center text-neutral-400 font-mono">Loading merchant analytics...</div>;
  }

  const metrics = data?.metrics || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-xs font-mono text-purple-300 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-accent-amber" />
            <span>Autonomous Merchant Revenue Hub</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Merchant Growth Center</h1>
          <p className="text-xs text-neutral-400 mt-1">Real-time revenue attribution, AI shopping metrics, and Razorpay settlements.</p>
        </div>

        {/* Demo Simulation Switch */}
        <div className="flex items-center space-x-3 bg-surface/80 border border-white/10 p-2 rounded-2xl">
          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className={\`w-2 h-2 rounded-full \${demoSimActive ? 'bg-accent-teal animate-ping' : 'bg-neutral-500'}\`} />
            <span className="text-neutral-300">Demo Simulation</span>
          </div>
          <button
            onClick={() => setDemoSimActive(!demoSimActive)}
            className={\`px-3 py-1 rounded-xl text-xs font-bold transition-all \${
              demoSimActive ? 'bg-accent-teal text-black' : 'bg-white/10 text-white'
            }\`}
          >
            {demoSimActive ? 'ACTIVE' : 'PAUSED'}
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span className="font-mono font-bold uppercase">Total Revenue</span>
            <DollarSign className="w-4 h-4 text-accent-amber" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white">₹{(metrics.totalRevenue || 55397).toLocaleString()}</p>
          <p className="text-[11px] text-accent-teal font-mono">+28.4% vs last week</p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span className="font-mono font-bold uppercase">AI Revenue Share</span>
            <Bot className="w-4 h-4 text-accent-purple" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-accent-purple">{metrics.aiRevenueSharePercentage || 85}%</p>
          <p className="text-[11px] text-neutral-400 font-mono">₹{(metrics.aiRevenueAttribution || 53846).toLocaleString()} AI-driven</p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span className="font-mono font-bold uppercase">AI Conversion Rate</span>
            <TrendingUp className="w-4 h-4 text-accent-teal" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-accent-teal">{metrics.conversionRate || 12.9}%</p>
          <p className="text-[11px] text-neutral-400 font-mono">Industry average: 2.3%</p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span className="font-mono font-bold uppercase">Average Order Value</span>
            <ShoppingBag className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white">₹{(metrics.averageOrderValue || 26900).toLocaleString()}</p>
          <p className="text-[11px] text-accent-teal font-mono">+₹4,200 from upsell bundles</p>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Over Time Chart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Revenue & AI Attribution Curve</h3>
              <p className="text-xs text-neutral-400">Total GMV vs AI Copilot Assisted Volume (Today)</p>
            </div>
            <span className="text-xs font-mono px-2 py-1 rounded bg-white/5 text-neutral-300">LIVE FEED</span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.revenueOverTime || []}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F5A623" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#F5A623" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAI" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C5CFF" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#7C5CFF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#666" fontSize={11} />
                <YAxis stroke="#666" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#171717', borderColor: '#333', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="revenue" stroke="#F5A623" fillOpacity={1} fill="url(#colorRev)" name="Total Revenue" />
                <Area type="monotone" dataKey="aiAssisted" stroke="#7C5CFF" fillOpacity={1} fill="url(#colorAI)" name="AI Assisted" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Methods Breakdown */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-base font-bold text-white">Razorpay Settlement Mix</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data?.paymentMethodsBreakdown || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="percentage"
                >
                  {(data?.paymentMethodsBreakdown || []).map((entry: any, index: number) => (
                    <Cell key={\`cell-\${index}\`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#171717', borderColor: '#333', borderRadius: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 text-xs font-mono pt-2">
            {(data?.paymentMethodsBreakdown || []).map((m: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center text-neutral-300">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  <span>{m.name}</span>
                </div>
                <span className="font-bold text-white">{m.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/dashboard/campaigns"
          className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-accent-amber/40 transition-all flex items-center justify-between group"
        >
          <div>
            <h4 className="font-bold text-sm text-white">AI Campaigns</h4>
            <p className="text-[11px] text-neutral-400">Launch autonomous promotions</p>
          </div>
          <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-accent-amber group-hover:translate-x-1 transition-all" />
        </Link>

        <Link
          href="/dashboard/audit"
          className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-accent-purple/40 transition-all flex items-center justify-between group"
        >
          <div>
            <h4 className="font-bold text-sm text-white">Audit Explorer</h4>
            <p className="text-[11px] text-neutral-400">Immutable transaction proofs</p>
          </div>
          <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-accent-purple group-hover:translate-x-1 transition-all" />
        </Link>

        <Link
          href="/dashboard/orders"
          className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-accent-teal/40 transition-all flex items-center justify-between group"
        >
          <div>
            <h4 className="font-bold text-sm text-white">Live Orders</h4>
            <p className="text-[11px] text-neutral-400">Manage fulfillment queue</p>
          </div>
          <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-accent-teal group-hover:translate-x-1 transition-all" />
        </Link>

        <Link
          href="/admin/server"
          className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-blue-400/40 transition-all flex items-center justify-between group"
        >
          <div>
            <h4 className="font-bold text-sm text-white">Server Terminal</h4>
            <p className="text-[11px] text-neutral-400">Real-time developer console</p>
          </div>
          <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
        </Link>
      </div>
    </div>
  );
}
`);

// 2. src/app/dashboard/campaigns/page.tsx
save('src/app/dashboard/campaigns/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Bot, Plus, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Campaign } from '@/types';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState('');
  const [budget, setBudget] = useState('20000');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/campaigns')
      .then(res => res.json())
      .then(json => {
        if (json?.data) setCampaigns(json.data);
      });
  }, []);

  const createCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, goal, budget })
      });
      const data = await res.json();
      if (data.data) {
        setCampaigns(prev => [data.data, ...prev]);
        setModalOpen(false);
        setTitle('');
        setGoal('');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-3xl font-extrabold text-white">AI Campaign Orchestrator</h1>
          <p className="text-xs text-neutral-400 mt-1">Autonomous promotional strategy, cross-sell triggers, and audience targeting.</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-accent-amber text-black font-bold text-xs flex items-center space-x-2 hover:bg-accent-amber-light"
        >
          <Plus className="w-4 h-4" />
          <span>Generate AI Campaign</span>
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg glass-panel-glow rounded-3xl p-6 border border-accent-amber/40 space-y-4">
            <h3 className="text-base font-bold text-white">Orchestrate New AI Marketing Campaign</h3>
            <form onSubmit={createCampaign} className="space-y-4 text-xs">
              <div>
                <label className="text-neutral-400 block mb-1">Campaign Goal</label>
                <input
                  type="text"
                  placeholder="e.g. Drive ₹5,00,000 in student bundle sales"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  required
                  className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-accent-amber"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Campaign Name</label>
                <input
                  type="text"
                  placeholder="e.g. College Creator Setup Blast"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-accent-amber"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Budget (INR)</label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-accent-amber"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface border border-white/10 text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-accent-amber text-black font-bold"
                >
                  {loading ? 'AI Synthesizing...' : 'Synthesize & Launch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Campaign List */}
      <div className="space-y-4">
        {campaigns.map(camp => (
          <div key={camp.id} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent-teal/20 text-accent-teal font-bold">
                  {camp.status}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{camp.title}</h3>
                <p className="text-xs text-neutral-400">{camp.goal}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-neutral-500 font-mono">Budget</span>
                <p className="text-base font-bold text-white font-mono">₹{camp.budget.toLocaleString()}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface/80 border border-white/5 text-xs text-neutral-300 space-y-2">
              <span className="font-mono text-accent-amber font-bold">AI STRATEGY:</span>
              <p className="leading-relaxed">{camp.strategy}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`);

// 3. src/app/dashboard/audit/page.tsx
save('src/app/dashboard/audit/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Search, Filter, Lock } from 'lucide-react';
import { AuditLog } from '@/types';

export default function AuditExplorerPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  useEffect(() => {
    fetchAuditLogs();
  }, [search, filterStatus]);

  const fetchAuditLogs = async () => {
    const url = \`/api/audit?search=\${encodeURIComponent(search)}&status=\${filterStatus}\`;
    const res = await fetch(url);
    const json = await res.json();
    if (json?.data?.logs) setLogs(json.data.logs);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="pb-6 border-b border-white/10">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-accent-amber mb-1">
          <ShieldCheck className="w-4 h-4" />
          <span>CRYPTOGRAPHIC AUDIT LOGS</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Immutable Audit Explorer</h1>
        <p className="text-xs text-neutral-400 mt-1">
          Every critical transaction, AI tool execution, and permission gate is immutably logged with hashed metadata.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by action, ID, user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-accent-amber"
          />
        </div>

        <div className="flex gap-2 text-xs font-mono">
          {['ALL', 'SUCCESS', 'REQUIRES_APPROVAL', 'FAILED'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={\`px-3 py-1.5 rounded-xl transition-all \${
                filterStatus === st
                  ? 'bg-accent-amber text-black font-bold'
                  : 'bg-surface border border-white/10 text-neutral-400 hover:text-white'
              }\`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface/80 border-b border-white/10 font-mono text-neutral-400">
              <tr>
                <th className="p-4">Audit ID</th>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Action</th>
                <th className="p-4">Status</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Gate Status</th>
                <th className="p-4">Summary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-mono text-accent-amber font-bold">{log.auditId}</td>
                  <td className="p-4 font-mono text-neutral-400 text-[11px]">{new Date(log.timestamp).toLocaleTimeString()}</td>
                  <td className="p-4 font-mono text-white font-bold">{log.action}</td>
                  <td className="p-4">
                    <span className={\`font-mono text-[10px] px-2 py-0.5 rounded-full font-bold \${
                      log.status === 'SUCCESS' ? 'bg-accent-teal/20 text-accent-teal' : log.status === 'REQUIRES_APPROVAL' ? 'bg-amber-500/20 text-amber-300' : 'bg-rose-500/20 text-rose-400'
                    }\`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-white">{log.amount ? \`₹\${log.amount.toLocaleString()}\` : '-'}</td>
                  <td className="p-4 font-mono text-neutral-300">{log.approvalStatus || 'AUTO'}</td>
                  <td className="p-4 text-neutral-300 max-w-xs truncate">{log.outputSummary || log.inputSummary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
`);

// 4. src/app/dashboard/orders/page.tsx
save('src/app/dashboard/orders/page.tsx', `
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Order } from '@/types';

export default function MerchantOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(json => {
        if (json?.data?.orders) setOrders(json.data.orders);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="pb-6 border-b border-white/10">
        <h1 className="text-3xl font-extrabold text-white">Merchant Order Stream</h1>
        <p className="text-xs text-neutral-400 mt-1">Live customer and AI buyer orders settled via Razorpay Sandbox.</p>
      </div>

      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="font-bold text-accent-amber">{order.orderNumber}</span>
                <span>•</span>
                <span className="text-neutral-400">{new Date(order.createdAt).toLocaleDateString()}</span>
                <span>•</span>
                <span className="text-accent-teal font-bold">{order.status}</span>
              </div>
              <h3 className="font-bold text-white text-sm mt-1">{order.userName} ({order.userEmail})</h3>
              <p className="text-xs text-neutral-400 mt-0.5">{order.items.length} item(s) • Total: ₹{order.total.toLocaleString()}</p>
            </div>

            <Link
              href={\`/orders/\${order.id}\`}
              className="px-4 py-2 rounded-xl bg-surface border border-white/10 hover:border-accent-amber text-xs font-bold text-white"
            >
              Track Order
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
`);

console.log('Merchant dashboard pages generated successfully');
