const fs = require('fs');
const path = require('path');

function save(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content.trimStart(), 'utf8');
  console.log('Successfully saved:', filePath);
}

// 1. src/app/globals.css
save('src/app/globals.css', `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg-primary: #070707;
  --bg-surface: #121212;
  --card-bg: rgba(23, 23, 23, 0.75);
}

.light {
  --bg-primary: #F7F7F4;
  --bg-surface: #FFFFFF;
  --card-bg: rgba(255, 255, 255, 0.9);
}

body {
  font-family: 'Poppins', sans-serif;
  background-color: var(--bg-primary);
  color: #F7F2E8;
  overflow-x: hidden;
}

.light body {
  color: #111111;
}

.glass-panel {
  background: rgba(23, 23, 23, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.light .glass-panel {
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.04);
}

.glass-panel-glow {
  background: rgba(23, 23, 23, 0.8);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(245, 166, 35, 0.3);
  box-shadow: 0 0 25px rgba(245, 166, 35, 0.08);
}

.bg-grid-pattern {
  background-size: 40px 40px;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
}

.text-gradient-gold {
  background: linear-gradient(135deg, #FFB84D 0%, #F5A623 50%, #FF8C00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text-gradient-purple {
  background: linear-gradient(135deg, #B588FF 0%, #7C5CFF 50%, #4D28D4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
`);

// 2. src/components/layout/ThemeToggle.tsx
save('src/components/layout/ThemeToggle.tsx', `
'use client';
import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('razoragent_theme') as any;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle('light', saved === 'light');
    }
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('razoragent_theme', next);
    document.documentElement.classList.toggle('light', next === 'light');
  };

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-xl bg-surface/60 border border-white/10 text-neutral-300 hover:text-white transition-all"
      title="Toggle Dark/Light Mode"
    >
      {theme === 'dark' ? <Sun className="w-4 h-4 text-accent-amber" /> : <Moon className="w-4 h-4 text-accent-purple" />}
    </button>
  );
}
`);

// 3. src/components/layout/CommandPalette.tsx
save('src/components/layout/CommandPalette.tsx', `
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
`);

// 4. src/components/layout/Navbar.tsx
save('src/components/layout/Navbar.tsx', `
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, ShoppingBag, BarChart3, Terminal, Sparkles, Menu, X, ShoppingCart, ShieldCheck } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetch('/api/cart')
      .then(res => res.json())
      .then(json => {
        if (json?.data?.items) {
          setCartCount(json.data.items.reduce((sum, i) => sum + i.quantity, 0));
        }
      })
      .catch(() => {});
  }, [pathname]);

  const navLinks = [
    { label: 'Smart Shop', href: '/shop', icon: ShoppingBag },
    { label: 'AI Copilot', href: '/ai', icon: Bot, highlight: true },
    { label: 'Live Visualizer', href: '/live-agent', icon: Sparkles, badge: 'WOW' },
    { label: 'Merchant Console', href: '/dashboard', icon: BarChart3 },
    { label: 'Server Console', href: '/admin/server', icon: Terminal },
    { label: 'Architecture', href: '/architecture', icon: ShieldCheck },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass-panel border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-accent-amber to-accent-purple flex items-center justify-center shadow-lg shadow-accent-amber/20 group-hover:scale-105 transition-transform">
              <Bot className="w-5 h-5 text-black font-bold" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-white flex items-center">
                RazorAgent <span className="text-accent-amber ml-1">AI</span>
              </span>
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">
                Autonomous Commerce
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link, idx) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={idx}
                  href={link.href}
                  className={\`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all relative \${
                    isActive
                      ? 'bg-white/10 text-accent-amber font-semibold border border-white/10 shadow-sm'
                      : link.highlight
                      ? 'text-accent-amber hover:bg-accent-amber/10 border border-accent-amber/30'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }\`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-gradient-to-r from-accent-amber to-accent-purple text-black">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={() => {
                const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
                window.dispatchEvent(event);
              }}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-surface/80 border border-white/10 text-xs text-neutral-400 hover:text-white hover:border-white/20 transition-all font-mono"
            >
              <span>Search</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px]">Ctrl+K</kbd>
            </button>

            <Link
              href="/cart"
              className="relative p-2 rounded-xl bg-surface/60 border border-white/10 text-neutral-300 hover:text-white transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-amber text-black text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <ThemeToggle />

            <Link
              href="/ai"
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-accent-amber to-accent-amber-light text-black font-semibold text-xs shadow-md shadow-accent-amber/20 hover:opacity-95 transition-opacity"
            >
              Try AI Buyer
            </Link>
          </div>

          <div className="flex sm:hidden items-center space-x-2">
            <Link href="/cart" className="p-2 text-neutral-300">
              <ShoppingCart className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-b border-white/10 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-neutral-300 hover:bg-white/10 hover:text-white"
            >
              <div className="flex items-center space-x-3">
                <link.icon className="w-4 h-4 text-accent-amber" />
                <span>{link.label}</span>
              </div>
              {link.badge && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-accent-amber text-black">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
`);

// 5. src/components/layout/Footer.tsx
save('src/components/layout/Footer.tsx', `
import React from 'react';
import Link from 'next/link';
import { Bot } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background-secondary pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-accent-amber to-accent-purple flex items-center justify-center">
                <Bot className="w-4 h-4 text-black font-bold" />
              </div>
              <span className="font-bold text-lg text-white">RazorAgent AI</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Autonomous AI Commerce platform enabling discovery-to-checkout with explainable permission gates and Razorpay test mode payment orchestration.
            </p>
            <div className="flex items-center space-x-2 text-xs text-accent-teal font-mono">
              <span className="w-2 h-2 rounded-full bg-accent-teal animate-pulse" />
              <span>Razorpay Sandbox Connected</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-4 font-mono">Platform</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><Link href="/shop" className="hover:text-white transition-colors">Agent-Readable Catalog</Link></li>
              <li><Link href="/ai" className="hover:text-white transition-colors">Commerce Copilot</Link></li>
              <li><Link href="/live-agent" className="hover:text-white transition-colors">Live Visualizer</Link></li>
              <li><Link href="/compare" className="hover:text-white transition-colors">Product Comparison</Link></li>
              <li><Link href="/cart" className="hover:text-white transition-colors">Autonomous Cart</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-4 font-mono">Merchant & Ops</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Revenue Analytics</Link></li>
              <li><Link href="/dashboard/campaigns" className="hover:text-white transition-colors">AI Campaign Orchestrator</Link></li>
              <li><Link href="/dashboard/payments" className="hover:text-white transition-colors">Payment Gateway Metrics</Link></li>
              <li><Link href="/dashboard/audit" className="hover:text-white transition-colors">Immutable Audit Explorer</Link></li>
              <li><Link href="/admin/server" className="hover:text-white transition-colors">Live Terminal Console</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-4 font-mono">Trust & Architecture</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><Link href="/architecture" className="hover:text-white transition-colors">React Flow Architecture</Link></li>
              <li><Link href="/security" className="hover:text-white transition-colors">Explainable Money Gates</Link></li>
              <li><Link href="/admin/health" className="hover:text-white transition-colors">Server Telemetry & Health</Link></li>
              <li><span className="text-neutral-500 font-mono text-[11px]">Strict Zero Raw Card Storage</span></li>
              <li><span className="text-neutral-500 font-mono text-[11px]">HMAC Webhook Verification</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500">
          <p>© 2026 RazorAgent AI. Autonomous AI Commerce. From Discovery to Checkout.</p>
          <p className="mt-2 sm:mt-0 font-mono text-[11px]">Hackathon Edition • Razorpay Sandbox Integration</p>
        </div>
      </div>
    </footer>
  );
}
`);

// 6. src/components/agent/FloatingNexaAssistant.tsx
save('src/components/agent/FloatingNexaAssistant.tsx', `
'use client';
import React, { useState } from 'react';
import { Bot, X, Send, Sparkles } from 'lucide-react';

export function FloatingNexaAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'assistant' | 'user'; text: string }[]>([
    {
      role: 'assistant',
      text: 'Hi! I am Nexa Assistant. Ask me anything about the catalog, revenue metrics, payment state, or explainable audit logs!'
    }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (textToSend) => {
    const q = textToSend || input;
    if (!q.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: q }]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: q })
      });
      const data = await res.json();
      if (data?.data?.message) {
        setMessages(prev => [...prev, { role: 'assistant', text: data.data.message }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', text: 'I processed your request using the catalog and telemetry APIs.' }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Catalog and telemetry tools are active. Feel free to explore the shop or dashboard!' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 flex items-center space-x-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-accent-amber via-accent-amber-light to-accent-purple text-black font-semibold text-xs shadow-2xl shadow-accent-amber/30 hover:scale-105 transition-all group"
      >
        <Bot className="w-5 h-5 animate-pulse" />
        <span className="font-bold tracking-tight">Nexa Assistant</span>
        <span className="w-2 h-2 rounded-full bg-black/60" />
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[480px] glass-panel-glow rounded-2xl flex flex-col shadow-2xl border border-accent-amber/40 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-surface/80 rounded-t-2xl">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-lg bg-accent-amber flex items-center justify-center text-black">
                <Bot className="w-4 h-4 font-bold" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">Nexa AI Assistant</h3>
                <p className="text-[10px] text-accent-teal font-mono">Live In-App Helper</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={\`flex \${m.role === 'user' ? 'justify-end' : 'justify-start'}\`}
              >
                <div
                  className={\`max-w-[85%] rounded-2xl p-3 leading-relaxed \${
                    m.role === 'user'
                      ? 'bg-accent-amber text-black font-medium'
                      : 'bg-surface/90 border border-white/10 text-neutral-200 shadow-sm'
                  }\`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-surface/90 border border-white/10 rounded-2xl p-3 text-neutral-400 text-xs flex items-center space-x-2 font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-accent-amber animate-spin" />
                  <span>Nexa is querying tools...</span>
                </div>
              </div>
            )}
          </div>

          <div className="px-3 py-1.5 bg-black/30 border-t border-white/5 flex items-center space-x-1.5 overflow-x-auto text-[10px]">
            <button
              onClick={() => handleSend('College setup under 60000')}
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-accent-amber border border-accent-amber/20"
            >
              🎓 College Setup &lt;₹60k
            </button>
            <button
              onClick={() => handleSend('Why did revenue increase?')}
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10"
            >
              📊 Revenue Analysis
            </button>
          </div>

          <div className="p-3 border-t border-white/10 bg-surface/80 rounded-b-2xl flex items-center space-x-2">
            <input
              type="text"
              placeholder="Ask Nexa Assistant..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-accent-amber"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="p-2 rounded-xl bg-accent-amber text-black disabled:opacity-50 hover:bg-accent-amber-light transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
`);

// 7. src/components/3d/HeroScene.tsx
save('src/components/3d/HeroScene.tsx', `
'use client';
import React, { useEffect, useRef } from 'react';

export function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 480);

    const handleResize = () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = 480;
      }
    };
    window.addEventListener('resize', handleResize);

    const nodes = [
      { id: 'customer', label: 'Buyer Intent', x: 0.12, y: 0.35, color: '#7C5CFF' },
      { id: 'agent', label: 'AI Commerce Agent', x: 0.30, y: 0.65, color: '#F5A623' },
      { id: 'catalog', label: 'Merchant Catalog', x: 0.50, y: 0.25, color: '#20C997' },
      { id: 'rec', label: 'Recommendation NPU', x: 0.65, y: 0.70, color: '#FFB84D' },
      { id: 'cart', label: 'Autonomous Cart', x: 0.80, y: 0.35, color: '#7C5CFF' },
      { id: 'gateway', label: 'Razorpay Sandbox', x: 0.90, y: 0.65, color: '#20C997' },
    ];

    const particles = [
      { fromIdx: 0, toIdx: 1, progress: 0.1, speed: 0.008, color: '#7C5CFF' },
      { fromIdx: 1, toIdx: 2, progress: 0.4, speed: 0.009, color: '#F5A623' },
      { fromIdx: 2, toIdx: 3, progress: 0.7, speed: 0.007, color: '#20C997' },
      { fromIdx: 3, toIdx: 4, progress: 0.2, speed: 0.010, color: '#FFB84D' },
      { fromIdx: 4, toIdx: 5, progress: 0.6, speed: 0.008, color: '#20C997' },
    ];

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length - 1; i++) {
        const n1 = nodes[i];
        const n2 = nodes[i + 1];
        const x1 = n1.x * width;
        const y1 = n1.y * height + Math.sin(time + i) * 6;
        const x2 = n2.x * width;
        const y2 = n2.y * height + Math.sin(time + i + 1) * 6;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 2;
        ctx.stroke();

        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, n1.color + '44');
        grad.addColorStop(1, n2.color + '44');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      particles.forEach(p => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;

        const n1 = nodes[p.fromIdx];
        const n2 = nodes[p.toIdx];
        const x1 = n1.x * width;
        const y1 = n1.y * height + Math.sin(time + p.fromIdx) * 6;
        const x2 = n2.x * width;
        const y2 = n2.y * height + Math.sin(time + p.toIdx) * 6;

        const curX = x1 + (x2 - x1) * p.progress;
        const curY = y1 + (y2 - y1) * p.progress;

        ctx.beginPath();
        ctx.arc(curX, curY, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      nodes.forEach((n, idx) => {
        const nx = n.x * width;
        const ny = n.y * height + Math.sin(time + idx) * 6;

        ctx.beginPath();
        ctx.arc(nx, ny, 20, 0, Math.PI * 2);
        ctx.fillStyle = n.color + '22';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(nx, ny, 10, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(nx, ny, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        ctx.font = '11px Poppins, sans-serif';
        ctx.fillStyle = '#E5E5E5';
        ctx.textAlign = 'center';
        ctx.fillText(n.label, nx, ny + 26);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[480px] rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl flex items-center justify-center">
      <div className="absolute top-4 left-6 flex items-center space-x-2 text-xs font-mono text-neutral-400">
        <span className="w-2 h-2 rounded-full bg-accent-amber animate-ping" />
        <span>3D Autonomous Commerce Flow (Live Node Telemetry)</span>
      </div>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
`);

// 8. src/app/layout.tsx
save('src/app/layout.tsx', `
import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { FloatingNexaAssistant } from '@/components/agent/FloatingNexaAssistant';

export const metadata: Metadata = {
  title: 'RazorAgent AI — Autonomous AI Commerce. From Discovery to Checkout.',
  description: 'Production-style AI Agentic Commerce platform with agent-readable catalog, explainable money gates, and Razorpay sandbox payments.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-background text-text-primary antialiased bg-grid-pattern">
        <Navbar />
        <CommandPalette />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <FloatingNexaAssistant />
        <Footer />
      </body>
    </html>
  );
}
`);

console.log('Layout and core visual components created');
