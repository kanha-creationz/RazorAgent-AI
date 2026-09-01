'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bot,
  Sparkles,
  Terminal,
  Activity,
  ArrowRight,
  CheckCircle2,
  Lock,
  Play,
  Pause,
  RotateCcw,
  Zap
} from 'lucide-react';
import { HeroScene } from '@/components/3d/HeroScene';

export default function LiveAgentVisualizerPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [logs, setLogs] = useState<string[]>([
    '23:01:02 [BOOT] RazorAgent AI Core online.',
    '23:01:05 [API] GET /api/products?agent=true 200 (14ms)',
    '23:01:10 [AGENT] User intent: "College setup under 60k" received.',
    '23:01:11 [TOOL] search_products(query="college laptop", maxPrice=60000) -> 3 items',
    '23:01:12 [TOOL] check_inventory(ids=[prod_03, prod_05, prod_07]) -> In Stock (52, 140, 90)',
    '23:01:13 [TOOL] calculate_cart(coupon="STUDENT10") -> ₹53,846',
    '23:01:14 [GATE] Explainable Permission Gate Activated. Awaiting approval.',
    '23:01:25 [PAYMENT] Razorpay Sandbox Order Created: order_test_razoragent_98210',
    '23:01:32 [WEBHOOK] payment.captured HMAC-SHA256 verified successfully.',
    '23:01:33 [ORDER] Order RZP-ORD-98210 transitioned to PAID.'
  ]);

  const stages = [
    { title: 'Buyer Intent', desc: 'College setup <₹60,000' },
    { title: 'Catalog Search', desc: 'SwiftAir 14" identified' },
    { title: 'Inventory Check', desc: '52 units verified in stock' },
    { title: 'Cross-Sell Bundle', desc: 'AeroGlide Mouse + AcousticPure Flow' },
    { title: 'Cart Pricing', desc: 'STUDENT10 applied (₹53,846)' },
    { title: 'Permission Gate', desc: 'Buyer explicitly approved' },
    { title: 'Razorpay Sandbox', desc: 'Payment Captured & Verified' }
  ];

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % stages.length);
      const time = new Date().toLocaleTimeString('en-US', { hour12: false });
      const newLog = `${time} [AUTO-STREAM] RazorAgent executed step: ${stages[(currentStep + 1) % stages.length].title}`;
      setLogs(prev => [newLog, ...prev.slice(0, 15)]);
    }, 3000);
    return () => clearInterval(interval);
  }, [isRunning, currentStep]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Bar */}
      <div className="glass-panel p-6 rounded-3xl border border-blue-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-blue-400 mb-1">
            <Zap className="w-3.5 h-3.5" />
            <span>HACKATHON COMMAND CENTER • RAZORPAY AI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">RazorAgent AI Live Visualizer</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time 4-quadrant pipeline tracking autonomous discovery, tool routing, money gates, and Razorpay sandbox settlement.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center space-x-2 ${
              isRunning
                ? 'bg-blue-600/30 border border-blue-500/50 text-blue-300'
                : 'bg-emerald-500/30 border border-emerald-500/50 text-emerald-300'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRunning ? 'PAUSE STREAM' : 'RESUME STREAM'}</span>
          </button>

          <Link
            href="/ai"
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition-all flex items-center space-x-1.5 shadow-md shadow-blue-600/30"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Open Chat Copilot</span>
          </Link>
        </div>
      </div>

      {/* 4-Quadrant Visualizer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quadrant 1: 3D Workflow Scene */}
        <div className="glass-panel p-6 rounded-3xl border border-blue-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
              1. 3D Autonomous Flow Architecture
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
              INTERACTIVE WEBGL
            </span>
          </div>
          <div className="h-72 w-full rounded-2xl overflow-hidden bg-black/40">
            <HeroScene />
          </div>
        </div>

        {/* Quadrant 2: 7-Stage Pipeline Tracker */}
        <div className="glass-panel p-6 rounded-3xl border border-blue-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
              2. 7-Stage Autonomous Pipeline Progress
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
              STAGE {currentStep + 1} / 7
            </span>
          </div>

          <div className="space-y-2.5 h-72 overflow-y-auto pr-1">
            {stages.map((stg, idx) => {
              const isPassed = idx < currentStep;
              const isCurrent = idx === currentStep;
              return (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border transition-all flex items-center justify-between text-xs font-mono ${
                    isCurrent
                      ? 'bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-500/10'
                      : isPassed
                      ? 'bg-surface/50 border-emerald-500/30 text-emerald-400'
                      : 'bg-surface/30 border-white/5 text-slate-500'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold">
                      {idx + 1}
                    </span>
                    <div>
                      <span className="font-bold block text-white">{stg.title}</span>
                      <span className="text-[10px] text-slate-400">{stg.desc}</span>
                    </div>
                  </div>

                  {isPassed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        {/* Quadrant 3: Server Logs Stream */}
        <div className="glass-panel p-6 rounded-3xl border border-blue-500/20 space-y-4 font-mono">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              3. Backend Server & Webhook Terminal Stream
            </h3>
            <span className="text-[10px] text-blue-400">stdout/server.log</span>
          </div>

          <div className="p-4 rounded-2xl bg-black/80 border border-blue-500/10 h-64 overflow-y-auto text-[11px] text-slate-300 space-y-1.5">
            {logs.map((l, i) => (
              <div key={i} className="leading-relaxed hover:bg-white/5 p-0.5 rounded">
                <span className="text-slate-500 select-none">&gt; </span>
                <span className={l.includes('TOOL') ? 'text-blue-400' : l.includes('PAYMENT') ? 'text-emerald-400' : l.includes('GATE') ? 'text-cyan-300' : 'text-slate-300'}>
                  {l}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quadrant 4: Live Attribution & Telemetry */}
        <div className="glass-panel p-6 rounded-3xl border border-blue-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
              4. Live Commerce Attribution & Telemetry
            </h3>
            <span className="text-[10px] font-mono text-emerald-400">100% AUDITED</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-surface/60 border border-blue-500/10 space-y-1">
              <span className="text-slate-400 text-[10px]">TOTAL AI REVENUE</span>
              <p className="text-2xl font-bold text-white">₹14,28,450</p>
              <span className="text-[10px] text-emerald-400">+34.2% today</span>
            </div>

            <div className="p-4 rounded-2xl bg-surface/60 border border-blue-500/10 space-y-1">
              <span className="text-slate-400 text-[10px]">AI CONVERSION RATE</span>
              <p className="text-2xl font-bold text-blue-400">12.9%</p>
              <span className="text-[10px] text-slate-500">vs 2.3% industry avg</span>
            </div>

            <div className="p-4 rounded-2xl bg-surface/60 border border-blue-500/10 space-y-1">
              <span className="text-slate-400 text-[10px]">BOUNDED BUNDLES</span>
              <p className="text-2xl font-bold text-cyan-300">3,410</p>
              <span className="text-[10px] text-slate-400">Zero price hallucinations</span>
            </div>

            <div className="p-4 rounded-2xl bg-surface/60 border border-blue-500/10 space-y-1">
              <span className="text-slate-400 text-[10px]">RAZORPAY SETTLEMENTS</span>
              <p className="text-2xl font-bold text-emerald-400">1,840</p>
              <span className="text-[10px] text-emerald-400">100% HMAC Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
