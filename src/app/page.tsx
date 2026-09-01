'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bot,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  CreditCard,
  Lock,
  Layers,
  Sparkles,
  Terminal,
  Activity,
  CheckCircle2,
  AlertTriangle,
  RefreshCcw,
  Sliders,
  ChevronDown
} from 'lucide-react';
import { HeroScene } from '@/components/3d/HeroScene';

export default function LandingPage() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [liveStreamEvents, setLiveStreamEvents] = useState([
    { time: '00:01:12', type: 'PAYMENT', title: 'Payment Captured (Razorpay Sandbox)', desc: 'Order RZP-ORD-98210 settled via UPI. Amount: ₹53,846', badge: 'Verified', color: 'text-emerald-400' },
    { time: '00:01:05', type: 'AI', title: 'Autonomous Cart Prepared', desc: 'RazorAgent AI generated 3-item College Setup with STUDENT10 promo', badge: 'Explainable', color: 'text-blue-400' },
    { time: '00:00:54', type: 'SECURITY', title: 'Explainable Money Gate Approved', desc: 'Buyer explicitly confirmed ₹53,846 sandbox checkout session', badge: 'Gated', color: 'text-cyan-300' },
    { time: '00:00:41', type: 'ORDER', title: 'Order Dispatched to Warehouse', desc: 'Order RZP-ORD-98195 tracking number initialized with logistics API', badge: 'Auto-Sync', color: 'text-blue-300' },
    { time: '00:00:28', type: 'AI', title: 'Upsell Engine Activated', desc: 'Offered 32GB RAM upgrade to creator browsing QuantumBook Pro', badge: '18% CTR', color: 'text-blue-400' },
  ]);

  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  // Live transaction simulation tick
  useEffect(() => {
    const timer = setInterval(() => {
      const types = ['AI', 'PAYMENT', 'ORDER', 'SECURITY'] as const;
      const t = types[Math.floor(Math.random() * types.length)];
      const nowStr = new Date().toLocaleTimeString('en-US', { hour12: false });
      let newEv = {
        time: nowStr,
        type: t,
        title: t === 'PAYMENT' ? 'Razorpay Sandbox Payment Authorized' : t === 'AI' ? 'RazorAgent AI Queried Inventory' : t === 'SECURITY' ? 'HMAC Webhook Verified' : 'Catalog Synced to Agent Index',
        desc: t === 'PAYMENT' ? '₹' + (Math.floor(Math.random() * 20) * 1000 + 2499) + ' captured safely via test UPI' : 'Stock checked across 15 active SKUs in real-time',
        badge: 'Live',
        color: t === 'PAYMENT' ? 'text-emerald-400' : t === 'AI' ? 'text-blue-400' : 'text-cyan-300'
      };

      setLiveStreamEvents(prev => [newEv, ...prev.slice(0, 7)]);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const filteredEvents = activeFilter === 'ALL'
    ? liveStreamEvents
    : liveStreamEvents.filter(e => e.type === activeFilter);

  const faqs = [
    {
      q: 'How does RazorAgent AI protect buyers from unauthorized payments?',
      a: 'RazorAgent AI enforces Explainable Money Gates. The AI agent can search, compare, check stock, and calculate cart totals, but CAN NEVER independently authorize a money transaction. Every checkout session requires explicit buyer review and approval before communicating with Razorpay Sandbox.'
    },
    {
      q: 'What makes the merchant catalog "Agent-Readable"?',
      a: 'The catalog exposes structured machine-readable JSON schemas (/api/products?agent=true) including AI trigger keywords, compatibility graphs, up-sell targets, and real-time inventory counts so external AI agents can execute purchases without scraping HTML.'
    },
    {
      q: 'How are Razorpay Sandbox payments handled?',
      a: 'Payments use server-side order generation, client-side test checkout modals, and server-side HMAC-SHA256 signature verification. Webhooks update order states idempotently with complete cryptographic audit trails.'
    },
    {
      q: 'What happens if a product stock drops during AI checkout?',
      a: 'RazorAgent AI includes Graceful Failure Recovery. If stock changes before checkout, the agent intercepts the failure, logs the incident, searches for identical alternatives in the catalog, and suggests a drop-in replacement.'
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-xs font-mono text-blue-300 mb-8 shadow-sm">
          <Zap className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
          <span>Outgrow Ordinary • Powered by Razorpay AI</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-tight">
          Outgrow Ordinary.{' '}
          <span className="text-gradient-blue block mt-2">Autonomous AI Commerce.</span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          The intelligent commerce engine where AI buyers discover products, build verified bundles, execute Explainable Permission Gates, and pay safely via Razorpay Sandbox.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/ai"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 hover:scale-105 transition-all flex items-center justify-center space-x-2.5 border border-blue-400/30"
          >
            <Bot className="w-5 h-5" />
            <span>Launch RazorAgent AI</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/live-agent"
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-blue-950/60 border border-blue-500/40 text-blue-200 font-semibold text-sm hover:bg-blue-900/60 transition-all flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Live WOW Visualizer</span>
          </Link>

          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel border border-blue-500/20 text-white font-semibold text-sm hover:bg-white/10 transition-all flex items-center justify-center space-x-2"
          >
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span>Merchant Growth Hub</span>
          </Link>
        </div>

        {/* 3D Visual Hero */}
        <div className="mt-14 max-w-5xl mx-auto">
          <HeroScene />
        </div>
      </section>

      {/* 2. LIVE TRANSACTION STREAM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-blue-500/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <h2 className="text-xl font-bold text-white">Live Autonomous Transaction Stream</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  REALTIME SSE
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Real-time feed of AI product discoveries, tool executions, explainable gates, and Razorpay sandbox payments.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {['ALL', 'AI', 'PAYMENT', 'SECURITY', 'ORDER'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                    activeFilter === filter
                      ? 'bg-blue-600 text-white font-bold shadow-sm'
                      : 'bg-surface/60 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredEvents.map((ev, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 rounded-2xl bg-surface/50 border border-blue-500/10 hover:border-blue-500/30 transition-all text-xs"
              >
                <div className="flex items-center space-x-4">
                  <span className="font-mono text-slate-500 text-[11px]">{ev.time}</span>
                  <div>
                    <h4 className="font-semibold text-white">{ev.title}</h4>
                    <p className="text-slate-400 text-[11px] mt-0.5">{ev.desc}</p>
                  </div>
                </div>
                <span className={`font-mono text-[10px] px-2 py-1 rounded-lg bg-white/5 font-bold ${ev.color}`}>
                  {ev.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE ARCHITECTURAL PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-blue-400">
            <Layers className="w-4 h-4" />
            <span>HOW WE BUILD WITH AI</span>
          </div>
          <h3 className="text-3xl font-extrabold text-white">The Three Pillars of RazorAgent AI</h3>
          <p className="text-xs text-slate-400">
            Architected specifically for autonomous agent transactions without human friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-3xl border border-blue-500/20 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
              <Bot className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Autonomous Bundling</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Synthesizes complex user constraints (e.g. &ldquo;College setup under ₹60,000&rdquo;), verifies stock across warehouses in parallel, and calculates coupon rules.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-blue-500/20 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Explainable Money Gates</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Guarantees zero unauthorized debits. The agent structures the transaction, computes taxes and discounts, and mandates human sign-off before payment.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-blue-500/20 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold">
              <CreditCard className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Razorpay Sandbox</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Native server-side order generation, simulated test QR payment, HMAC-SHA256 signature verification, and idempotent webhook reconciliation.
            </p>
          </div>
        </div>
      </section>

      {/* 4. FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2 mb-8">
          <h3 className="text-2xl font-extrabold text-white">Frequently Asked Questions</h3>
          <p className="text-xs text-slate-400">Everything you need to know about autonomous commerce safety.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl border border-blue-500/15 overflow-hidden transition-all"
            >
              <button
                onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                className="w-full p-5 text-left text-sm font-semibold text-white flex justify-between items-center"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-blue-400 transition-transform ${
                    faqOpen === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {faqOpen === idx && (
                <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
