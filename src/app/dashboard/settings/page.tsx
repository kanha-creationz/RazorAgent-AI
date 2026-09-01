'use client';
import React, { useState } from 'react';

export default function MerchantSettingsPage() {
  const [razorpayKey, setRazorpayKey] = useState('rzp_test_mock_razoragent2026');
  const [aiProvider, setAiProvider] = useState('Gemini & Adaptive LLM');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="pb-6 border-b border-white/10">
        <h1 className="text-3xl font-extrabold text-white">Merchant & AI Settings</h1>
        <p className="text-xs text-neutral-400 mt-1">Configure Razorpay test keys, AI provider models, and webhook endpoints.</p>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 text-xs">
        <div>
          <label className="text-neutral-400 block mb-1">Razorpay Key ID (Test Mode)</label>
          <input
            type="text"
            value={razorpayKey}
            onChange={(e) => setRazorpayKey(e.target.value)}
            className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-white font-mono"
          />
        </div>
        <div>
          <label className="text-neutral-400 block mb-1">Active AI Provider Model</label>
          <input
            type="text"
            value={aiProvider}
            onChange={(e) => setAiProvider(e.target.value)}
            className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-white"
          />
        </div>
      </div>
    </div>
  );
}
