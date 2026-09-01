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
            <span className={`w-2 h-2 rounded-full ${demoSimActive ? 'bg-accent-teal animate-ping' : 'bg-neutral-500'}`} />
            <span className="text-neutral-300">Demo Simulation</span>
          </div>
          <button
            onClick={() => setDemoSimActive(!demoSimActive)}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              demoSimActive ? 'bg-accent-teal text-black' : 'bg-white/10 text-white'
            }`}
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
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
