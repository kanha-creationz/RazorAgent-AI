import React from 'react';
import Link from 'next/link';
import { Bot, Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-blue-500/20 bg-background-secondary pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-md shadow-blue-500/30">
                <Zap className="w-4 h-4 text-white font-bold" />
              </div>
              <span className="font-extrabold text-lg text-white">RazorAgent AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Outgrow Ordinary. Autonomous AI Agentic Commerce platform powered by Razorpay with explainable permission gates and sandbox payment orchestration.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Razorpay Sandbox Connected</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4 font-mono">Platform</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/shop" className="hover:text-white transition-colors">Agent-Readable Catalog</Link></li>
              <li><Link href="/ai" className="hover:text-white transition-colors">RazorAgent AI Copilot</Link></li>
              <li><Link href="/live-agent" className="hover:text-white transition-colors">Live WOW Visualizer</Link></li>
              <li><Link href="/compare" className="hover:text-white transition-colors">Product Comparison</Link></li>
              <li><Link href="/cart" className="hover:text-white transition-colors">Autonomous Cart</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4 font-mono">Merchant & Ops</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Revenue Analytics</Link></li>
              <li><Link href="/dashboard/campaigns" className="hover:text-white transition-colors">AI Campaign Orchestrator</Link></li>
              <li><Link href="/dashboard/payments" className="hover:text-white transition-colors">Razorpay Settlements</Link></li>
              <li><Link href="/dashboard/audit" className="hover:text-white transition-colors">Immutable Audit Explorer</Link></li>
              <li><Link href="/admin/server" className="hover:text-white transition-colors">Live Terminal Console</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4 font-mono">Trust & Architecture</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/architecture" className="hover:text-white transition-colors">System Architecture</Link></li>
              <li><Link href="/security" className="hover:text-white transition-colors">Explainable Money Gates</Link></li>
              <li><Link href="/docs" className="hover:text-white transition-colors">OpenAPI Documentation</Link></li>
              <li><span className="text-slate-500 font-mono text-[11px]">Strict Zero Raw Card Storage</span></li>
              <li><span className="text-slate-500 font-mono text-[11px]">HMAC-SHA256 Webhook Proofs</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 RazorAgent AI. Built for Razorpay AI Hackathon.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0 font-mono">
            <span>Razorpay Sandbox Mode</span>
            <span>Zero Unbounded Debits</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
