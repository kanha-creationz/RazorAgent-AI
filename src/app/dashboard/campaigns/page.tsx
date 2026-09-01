'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Bot, Plus, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Campaign } from '@/types';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState('');
  const [budget, setBudget] = useState('20000');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/campaigns')
      .then(res => res.json())
      .then(json => {
        if (json?.data) setCampaigns(json.data);
      });
  }, []);

  const createCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, goal, budget })
      });
      const data = await res.json();
      if (data.data) {
        setCampaigns(prev => [data.data, ...prev]);
        setModalOpen(false);
        setTitle('');
        setGoal('');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-3xl font-extrabold text-white">AI Campaign Orchestrator</h1>
          <p className="text-xs text-neutral-400 mt-1">Autonomous promotional strategy, cross-sell triggers, and audience targeting.</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-accent-amber text-black font-bold text-xs flex items-center space-x-2 hover:bg-accent-amber-light"
        >
          <Plus className="w-4 h-4" />
          <span>Generate AI Campaign</span>
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg glass-panel-glow rounded-3xl p-6 border border-accent-amber/40 space-y-4">
            <h3 className="text-base font-bold text-white">Orchestrate New AI Marketing Campaign</h3>
            <form onSubmit={createCampaign} className="space-y-4 text-xs">
              <div>
                <label className="text-neutral-400 block mb-1">Campaign Goal</label>
                <input
                  type="text"
                  placeholder="e.g. Drive ₹5,00,000 in student bundle sales"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  required
                  className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-accent-amber"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Campaign Name</label>
                <input
                  type="text"
                  placeholder="e.g. College Creator Setup Blast"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-accent-amber"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Budget (INR)</label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-accent-amber"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface border border-white/10 text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-accent-amber text-black font-bold"
                >
                  {loading ? 'AI Synthesizing...' : 'Synthesize & Launch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Campaign List */}
      <div className="space-y-4">
        {campaigns.map(camp => (
          <div key={camp.id} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent-teal/20 text-accent-teal font-bold">
                  {camp.status}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{camp.title}</h3>
                <p className="text-xs text-neutral-400">{camp.goal}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-neutral-500 font-mono">Budget</span>
                <p className="text-base font-bold text-white font-mono">₹{camp.budget.toLocaleString()}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface/80 border border-white/5 text-xs text-neutral-300 space-y-2">
              <span className="font-mono text-accent-amber font-bold">AI STRATEGY:</span>
              <p className="leading-relaxed">{camp.strategy}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
