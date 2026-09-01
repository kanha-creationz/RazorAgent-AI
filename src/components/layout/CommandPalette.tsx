'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Bot, ShoppingBag, BarChart3, ShieldCheck, Terminal, CreditCard, Sparkles, X } from 'lucide-react';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const commands = [
    { label: 'Open AI Commerce Copilot', icon: Bot, href: '/ai', category: 'Agent' },
    { label: 'Live Agent Realtime Visualizer', icon: Sparkles, href: '/live-agent', category: 'Visualizer' },
    { label: 'Browse Smart Catalog', icon: ShoppingBag, href: '/shop', category: 'Commerce' },
    { label: 'Merchant Growth Dashboard', icon: BarChart3, href: '/dashboard', category: 'Merchant' },
    { label: 'Razorpay Payment Gateway', icon: CreditCard, href: '/dashboard/payments', category: 'Fintech' },
    { label: 'Admin Server Console', icon: Terminal, href: '/admin/server', category: 'Developer' },
    { label: 'System Health & Telemetry', icon: ShieldCheck, href: '/admin/health', category: 'DevOps' },
    { label: 'Architecture & React Flow', icon: Sparkles, href: '/architecture', category: 'System' },
    { label: 'Security & Explainable Money Gates', icon: ShieldCheck, href: '/security', category: 'Security' },
  ];

  const filtered = commands.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  const navigate = (href: string) => {
    setIsOpen(false);
    setQuery('');
    router.push(href);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl glass-panel-glow rounded-2xl overflow-hidden shadow-2xl border border-accent-amber/30 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center px-4 py-3.5 border-b border-white/10">
          <Search className="w-5 h-5 text-accent-amber mr-3" />
          <input
            type="text"
            placeholder="Type a command or search (e.g. AI, payments, catalog)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
          />
          <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => navigate(item.href)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm text-neutral-300 hover:bg-white/10 hover:text-white transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 rounded-lg bg-surface border border-white/10 group-hover:border-accent-amber/40 text-accent-amber">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/5">
                  {item.category}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
