'use client';
import React from 'react';

export default function AgentPerformancePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">AI Agent Performance Dashboard</h1>
        <p className="text-xs text-neutral-400 mt-1">Tool execution speed, recommendation acceptance rates, and NPU latency.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
        <div className="glass-panel p-5 rounded-2xl border border-white/10">
          <span className="text-neutral-400">AVG TOOL LATENCY</span>
          <p className="text-2xl font-bold text-white mt-1">18 ms</p>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-white/10">
          <span className="text-neutral-400">ACCEPTANCE RATE</span>
          <p className="text-2xl font-bold text-accent-teal mt-1">78.4%</p>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-white/10">
          <span className="text-neutral-400">BOUNDED ACCURACY</span>
          <p className="text-2xl font-bold text-accent-amber mt-1">100%</p>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-white/10">
          <span className="text-neutral-400">PERMISSION ENFORCED</span>
          <p className="text-2xl font-bold text-accent-purple mt-1">100%</p>
        </div>
      </div>
    </div>
  );
}
