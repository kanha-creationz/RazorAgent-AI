'use client';
import React, { useState } from 'react';
import { CreditCard, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function MerchantPaymentsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="pb-6 border-b border-white/10">
        <h1 className="text-3xl font-extrabold text-white">Razorpay Payment Performance</h1>
        <p className="text-xs text-neutral-400 mt-1">Payment gateway settlement breakdown, webhook status, and sandbox latency.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
          <span className="text-xs font-mono text-neutral-400">PAYMENT SUCCESS RATE</span>
          <p className="text-3xl font-black text-accent-teal">99.4%</p>
          <p className="text-[11px] text-neutral-400 font-mono">1,840 / 1,851 attempts</p>
        </div>
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
          <span className="text-xs font-mono text-neutral-400">AVG SETTLEMENT LATENCY</span>
          <p className="text-3xl font-black text-accent-amber">142 ms</p>
          <p className="text-[11px] text-neutral-400 font-mono">Razorpay Test Gateway</p>
        </div>
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
          <span className="text-xs font-mono text-neutral-400">WEBHOOK HEALTH</span>
          <p className="text-3xl font-black text-accent-purple">100% HMAC</p>
          <p className="text-[11px] text-neutral-400 font-mono">Zero signature rejections</p>
        </div>
      </div>
    </div>
  );
}
