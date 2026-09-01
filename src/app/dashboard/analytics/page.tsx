'use client';
import React from 'react';
import Link from 'next/link';
import { Bot, ArrowRight, TrendingUp } from 'lucide-react';

export default function MerchantAnalyticsDeepPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Deep AI Analytics & Attribution</h1>
        <p className="text-xs text-neutral-400 mt-1">Granular breakdown of discovery conversion, upselling revenue, and cart recovery.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
          <span className="text-xs font-mono text-neutral-400">UPSELL REVENUE GENERATED</span>
          <p className="text-3xl font-black text-accent-amber">₹3,40,000</p>
          <p className="text-[11px] text-accent-teal font-mono">+42% from RAM & charger prompts</p>
        </div>
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
          <span className="text-xs font-mono text-neutral-400">CROSS-SELL BUNDLE GMV</span>
          <p className="text-3xl font-black text-accent-purple">₹2,80,000</p>
          <p className="text-[11px] text-accent-teal font-mono">Mouse & headphone combos</p>
        </div>
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
          <span className="text-xs font-mono text-neutral-400">CART RECOVERY RATE</span>
          <p className="text-3xl font-black text-accent-teal">42.5%</p>
          <p className="text-[11px] text-neutral-400 font-mono">Autonomous follow-up agents</p>
        </div>
      </div>
    </div>
  );
}
