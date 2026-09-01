'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Layers, Bot, Database, CreditCard, ShieldCheck, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export default function ArchitecturePage() {
  const [activeLayer, setActiveLayer] = useState<number>(1);

  const layers = [
    {
      id: 1,
      title: 'Layer 1: AI Buyer & Intent Parser',
      desc: 'Consumes natural language buyer prompts, parses budget boundaries, and converts vague requirements into structured tool query schemas without hallucination.',
      components: ['Natural Language Understanding', 'Budget Guardrails (<₹60k)', 'Multi-Provider Adapter (Gemini/Claude/OpenAI/Local)']
    },
    {
      id: 2,
      title: 'Layer 2: 18+ Commerce Tool Router',
      desc: 'Executes deterministic functions against live merchant catalog databases, calculating taxes, verifying real-time warehouse stock, and assembling compatible bundles.',
      components: ['search_products()', 'check_inventory()', 'calculate_cart()', 'find_up_sell()', 'find_cross_sell()']
    },
    {
      id: 3,
      title: 'Layer 3: Explainable Financial Permission Gate',
      desc: 'Cryptographic safety barrier that intercepts all financial requests. Prepares bounded checkout summaries and mandates explicit buyer confirmation before communicating with payment gateways.',
      components: ['Bounded Action Cards', 'Explicit User Approval Check', 'Audit Log Pre-recording']
    },
    {
      id: 4,
      title: 'Layer 4: Razorpay Sandbox & Webhooks',
      desc: 'Handles server-side test order creation, client checkout orchestration, and HMAC-SHA256 signature verification. Webhooks update order fulfillment state idempotently.',
      components: ['Server-Side Order Generation', 'HMAC-SHA256 Webhook Verifier', 'Idempotency Key Guard']
    },
    {
      id: 5,
      title: 'Layer 5: Merchant Growth & Telemetry',
      desc: 'Streams real-time sales attribution, AI revenue share metrics, live terminal logs, and immutable audit logs directly to merchant and administrator dashboards.',
      components: ['AI Revenue Attribution (+28.4%)', 'SSE Real-time Event Bus', 'Immutable Cryptographic Audit Explorer']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="pb-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-accent-amber mb-1">
            <Layers className="w-4 h-4" />
            <span>FULL-STACK SYSTEM ARCHITECTURE</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">RazorAgent AI Agentic Architecture</h1>
          <p className="text-xs text-neutral-400 mt-1">
            End-to-end dataflow pipeline linking autonomous buyers, merchant growth algorithms, and Razorpay test mode payment orchestration.
          </p>
        </div>

        <Link
          href="/docs"
          className="px-4 py-2 rounded-xl bg-surface border border-white/10 hover:border-accent-purple text-xs font-bold text-white flex items-center space-x-2"
        >
          <span>OpenAPI Docs</span>
          <ArrowRight className="w-4 h-4 text-accent-purple" />
        </Link>
      </div>

      {/* Interactive Layer Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        {layers.map(l => (
          <button
            key={l.id}
            onClick={() => setActiveLayer(l.id)}
            className={`p-4 rounded-2xl border text-left transition-all ${
              activeLayer === l.id
                ? 'bg-accent-amber/10 border-accent-amber text-white ring-1 ring-accent-amber/30'
                : 'glass-panel border-white/5 text-neutral-400 hover:text-white'
            }`}
          >
            <span className="font-mono text-xs font-bold text-accent-amber block mb-1">LAYER {l.id}</span>
            <p className="text-xs font-bold line-clamp-1">{l.title.split(':')[1]}</p>
          </button>
        ))}
      </div>

      {/* Selected Layer Details */}
      {layers.find(l => l.id === activeLayer) && (
        <div className="glass-panel-glow p-8 rounded-3xl border border-accent-amber/30 space-y-6 animate-in fade-in duration-200">
          <div className="space-y-2">
            <span className="text-xs font-mono text-accent-amber font-bold">ACTIVE ARCHITECTURAL LAYER</span>
            <h2 className="text-2xl font-extrabold text-white">{layers.find(l => l.id === activeLayer)!.title}</h2>
            <p className="text-sm text-neutral-300 leading-relaxed max-w-3xl">
              {layers.find(l => l.id === activeLayer)!.desc}
            </p>
          </div>

          <div className="pt-4 border-t border-white/10">
            <h4 className="text-xs font-bold text-white uppercase font-mono mb-3">Key Subsystems & Invariants</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {layers.find(l => l.id === activeLayer)!.components.map((comp, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-surface/80 border border-white/5 flex items-center space-x-2 text-xs font-mono text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-accent-teal flex-shrink-0" />
                  <span>{comp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
