const fs = require('fs');
const path = require('path');

function save(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content.trimStart(), 'utf8');
  console.log('Successfully saved:', filePath);
}

// 1. src/app/page.tsx
save('src/app/page.tsx', `
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
    { time: '00:01:12', type: 'PAYMENT', title: 'Payment Captured (Razorpay Test)', desc: 'Order NEX-ORD-98210 settled via UPI. Amount: ₹53,846', badge: 'Verified', color: 'text-accent-teal' },
    { time: '00:01:05', type: 'AI', title: 'Autonomous Cart Prepared', desc: 'AI Copilot generated 3-item College Setup with STUDENT10 promo', badge: 'Explainable', color: 'text-accent-amber' },
    { time: '00:00:54', type: 'SECURITY', title: 'Explainable Money Gate Approved', desc: 'Buyer explicitly confirmed ₹53,846 sandbox checkout session', badge: 'Gated', color: 'text-accent-purple' },
    { time: '00:00:41', type: 'ORDER', title: 'Order Dispatched to Warehouse', desc: 'Order NEX-ORD-98195 tracking number initialized with courier API', badge: 'Auto-Sync', color: 'text-blue-400' },
    { time: '00:00:28', type: 'AI', title: 'Upsell Engine Activated', desc: 'Offered 32GB RAM upgrade to creator browsing QuantumBook Pro', badge: '18% CTR', color: 'text-accent-amber' },
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
        title: t === 'PAYMENT' ? 'Razorpay Sandbox Payment Authorized' : t === 'AI' ? 'AI Agent Queried Merchant Inventory' : t === 'SECURITY' ? 'HMAC Webhook Verified' : 'Catalog Synced to AI Index',
        desc: t === 'PAYMENT' ? '₹' + (Math.floor(Math.random() * 20) * 1000 + 2499) + ' captured safely via test UPI' : 'Stock checked across 15 active SKUs in real-time',
        badge: 'Live',
        color: t === 'PAYMENT' ? 'text-accent-teal' : t === 'AI' ? 'text-accent-amber' : 'text-accent-purple'
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
      a: 'RazorAgent enforces Explainable Money Gates. The AI agent can search, compare, check stock, and calculate cart totals, but CAN NEVER independently authorize a money transaction. Every checkout session requires explicit buyer review and approval before communicating with Razorpay Sandbox.'
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
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-surface/80 border border-accent-amber/30 text-xs font-mono text-accent-amber mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          <span>Hackathon Submission • Autonomous Agentic Commerce</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-tight">
          AI that doesn&apos;t just recommend.{' '}
          <span className="text-gradient-gold block mt-2">It sells.</span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
          An autonomous commerce agent that discovers products, understands buyers, grows merchant revenue, and safely completes transactions with explainable financial gates.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/ai"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-accent-amber to-accent-amber-light text-black font-bold text-sm shadow-xl shadow-accent-amber/25 hover:scale-105 transition-all flex items-center justify-center space-x-2.5"
          >
            <Bot className="w-5 h-5" />
            <span>Try AI Agent (Commerce Copilot)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-all flex items-center justify-center space-x-2"
          >
            <TrendingUp className="w-4 h-4 text-accent-purple" />
            <span>Explore Merchant Console</span>
          </Link>

          <Link
            href="/live-agent"
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-accent-purple/20 border border-accent-purple/40 text-purple-200 font-semibold text-sm hover:bg-accent-purple/30 transition-all flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-accent-amber" />
            <span>Live Agent Visualizer</span>
          </Link>
        </div>

        {/* 3D Visual Hero */}
        <div className="mt-14 max-w-5xl mx-auto">
          <HeroScene />
        </div>
      </section>

      {/* 2. LIVE TRANSACTION STREAM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-teal animate-ping" />
                <h2 className="text-xl font-bold text-white">Live Autonomous Transaction Stream</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent-teal/20 text-accent-teal border border-accent-teal/30">
                  REALTIME SSE
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Real-time feed of AI product discoveries, tool executions, explainable gates, and Razorpay sandbox payments.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-white/5 text-xs font-mono">
              {['ALL', 'AI', 'PAYMENT', 'ORDER', 'SECURITY'].map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={\`px-3 py-1 rounded-xl transition-all \${
                    activeFilter === f
                      ? 'bg-accent-amber text-black font-bold shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }\`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            {filteredEvents.map((ev, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-surface/60 border border-white/5 hover:border-white/15 transition-all text-xs"
              >
                <div className="flex items-center space-x-4">
                  <span className="font-mono text-neutral-500 text-[11px]">{ev.time}</span>
                  <span className={\`font-mono font-bold text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 \${ev.color}\`}>
                    {ev.type}
                  </span>
                  <div>
                    <p className="font-semibold text-white">{ev.title}</p>
                    <p className="text-neutral-400 text-[11px] mt-0.5">{ev.desc}</p>
                  </div>
                </div>
                <span className="hidden sm:inline-block font-mono text-[10px] px-2.5 py-1 rounded-full bg-surface border border-white/10 text-neutral-300">
                  {ev.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE ARCHITECTURAL PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-mono uppercase tracking-widest text-accent-amber mb-3">
            Why RazorAgent AI?
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Engineered for the Era of Autonomous AI Buyers
          </h3>
          <p className="mt-3 text-sm text-neutral-400">
            Merchants lose sales when AI agents cannot discover, bundle, price, and safely transact. RazorAgent solves the entire pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-accent-amber/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-accent-amber/10 border border-accent-amber/20 flex items-center justify-center text-accent-amber mb-5 group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Autonomous Discovery & Bundling</h4>
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              AI buyers understand budget constraints, compare 30+ specifications in milliseconds, and bundle compatible peripherals with instant price recalculation.
            </p>
            <ul className="space-y-1.5 text-xs text-neutral-300">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent-teal" />
                <span>Zero Hallucination Pricing Tools</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent-teal" />
                <span>Multi-product compatibility graph</span>
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-accent-purple/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center text-accent-purple mb-5 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Explainable Money Gates</h4>
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              No financial action is executed blindly. AI presents structured, bounded checkout summaries that demand buyer authorization before payment initiation.
            </p>
            <ul className="space-y-1.5 text-xs text-neutral-300">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent-teal" />
                <span>Explicit permission barrier</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent-teal" />
                <span>Immutable audit logs for every tool</span>
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-accent-teal/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-accent-teal/10 border border-accent-teal/20 flex items-center justify-center text-accent-teal mb-5 group-hover:scale-110 transition-transform">
              <CreditCard className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Razorpay Sandbox Orchestration</h4>
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              Native server-side order generation, sandbox popup verification, UPI QR codes, and HMAC-verified webhook listeners for automated order lifecycle.
            </p>
            <ul className="space-y-1.5 text-xs text-neutral-300">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent-teal" />
                <span>Zero raw card/PIN credential storage</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent-teal" />
                <span>Idempotent payment capture verification</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. DEMO INTERACTIVE SCENARIOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 border border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-white">Experience the End-to-End Demo Flows</h3>
            <p className="text-xs text-neutral-400 mt-1">
              Select a pre-configured scenario to test AI product discovery, stock checks, bundling, and checkout creation in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-surface/80 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-accent-amber font-bold">SCENARIO A</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent-amber/20 text-accent-amber">
                    Budget Constraint
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-1">
                  &ldquo;I need a productivity setup for college under ₹60,000.&rdquo;
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed mt-2">
                  AI searches lightweight laptops, bundles silent mice & ANC headphones, applies STUDENT10 discount, validates total (₹53,846), and prompts for permission.
                </p>
              </div>
              <Link
                href="/ai?q=I+need+a+productivity+setup+for+college+under+60000"
                className="mt-6 w-full py-3 rounded-xl bg-accent-amber text-black font-bold text-xs flex items-center justify-center space-x-2 hover:bg-accent-amber-light transition-colors"
              >
                <span>Run Scenario A in Copilot</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-surface/80 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-accent-purple font-bold">SCENARIO B</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent-purple/20 text-purple-300">
                    Category Filter
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-1">
                  &ldquo;I need noise-cancelling headphones under ₹3,000.&rdquo;
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed mt-2">
                  AI compares AcousticPure Flow ANC (-35dB, 55hr battery) with studio options, validates 90 units in stock, and offers 1-click cart insertion.
                </p>
              </div>
              <Link
                href="/ai?q=I+need+headphones+under+3000"
                className="mt-6 w-full py-3 rounded-xl bg-accent-purple text-white font-bold text-xs flex items-center justify-center space-x-2 hover:bg-opacity-90 transition-colors"
              >
                <span>Run Scenario B in Copilot</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-xs font-mono uppercase tracking-widest text-accent-amber mb-2">FAQ</h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                className="w-full px-5 py-4 flex items-center justify-between text-left text-sm font-semibold text-white hover:bg-white/5 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={\`w-4 h-4 text-neutral-400 transition-transform \${faqOpen === idx ? 'rotate-180 text-accent-amber' : ''}\`} />
              </button>
              {faqOpen === idx && (
                <div className="px-5 pb-4 text-xs text-neutral-400 leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6. BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-glow rounded-3xl p-10 sm:p-14 text-center border border-accent-amber/30 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Ready to deploy Autonomous AI Commerce?
            </h2>
            <p className="text-sm sm:text-base text-neutral-400">
              Discover products, verify payments in Razorpay Sandbox, track live audit logs, and scale merchant revenue today.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/ai"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-accent-amber to-accent-amber-light text-black font-bold text-sm shadow-xl shadow-accent-amber/30 hover:scale-105 transition-all"
              >
                Launch Commerce Copilot
              </Link>
              <Link
                href="/shop"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel text-white font-semibold text-sm hover:bg-white/10 transition-all"
              >
                Explore Smart Catalog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
`);

console.log('Landing page generated successfully');
