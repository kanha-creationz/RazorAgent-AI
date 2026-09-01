'use client';
import React from 'react';
import { ShieldCheck, Lock, CheckCircle2, Key } from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-accent-teal mb-1">
          <ShieldCheck className="w-4 h-4" />
          <span>FINANCIAL SAFETY & COMPLIANCE</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Security & Explainable Money Gates</h1>
        <p className="text-xs text-neutral-400 mt-1">How RazorAgent protects merchants and buyers during autonomous AI commerce.</p>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white">Core Security Invariants</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-surface/60 border border-white/5 space-y-1">
              <span className="font-mono text-accent-amber font-bold">1. Zero Raw Credential Storage</span>
              <p className="text-neutral-400">We never collect or store card numbers, CVVs, or UPI PINs in application forms.</p>
            </div>
            <div className="p-4 rounded-2xl bg-surface/60 border border-white/5 space-y-1">
              <span className="font-mono text-accent-purple font-bold">2. Explainable Money Gates</span>
              <p className="text-neutral-400">AI can build carts and compute pricing, but CAN NEVER autonomously approve a debit.</p>
            </div>
            <div className="p-4 rounded-2xl bg-surface/60 border border-white/5 space-y-1">
              <span className="font-mono text-accent-teal font-bold">3. HMAC Webhook Signature Verification</span>
              <p className="text-neutral-400">All Razorpay webhooks are cryptographically validated using SHA-256 HMAC secrets.</p>
            </div>
            <div className="p-4 rounded-2xl bg-surface/60 border border-white/5 space-y-1">
              <span className="font-mono text-blue-400 font-bold">4. Immutable Audit Records</span>
              <p className="text-neutral-400">Every AI tool call, user approval, and financial transition writes a permanent audit record.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
