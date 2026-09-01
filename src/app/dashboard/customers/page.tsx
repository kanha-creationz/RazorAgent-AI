'use client';
import React from 'react';

export default function CustomerSegmentsPage() {
  const segments = [
    { name: 'Autonomous AI Buyer Agents', share: '62%', aov: '₹53,846', count: 1140 },
    { name: 'College & CS Students', share: '24%', aov: '₹49,999', count: 480 },
    { name: 'High-LTV AI Creators', share: '14%', aov: '₹1,89,999', count: 220 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Customer & AI Buyer Segments</h1>
        <p className="text-xs text-neutral-400 mt-1">Behavioral clustering of human shoppers vs autonomous AI buyer agents.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {segments.map((s, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
            <h3 className="font-bold text-sm text-white">{s.name}</h3>
            <p className="text-3xl font-black text-accent-amber">{s.share}</p>
            <div className="text-xs font-mono text-neutral-400 space-y-1 pt-2 border-t border-white/5">
              <div className="flex justify-between"><span>AOV:</span><span className="text-white">{s.aov}</span></div>
              <div className="flex justify-between"><span>Active:</span><span className="text-white">{s.count} buyers</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
