'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, ShoppingBag, BarChart3, Terminal, Sparkles, Menu, X, ShoppingCart, ShieldCheck, Zap } from 'lucide-react';
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
          setCartCount(json.data.items.reduce((sum: number, i: any) => sum + i.quantity, 0));
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
    { label: 'API Docs', href: '/docs', icon: Terminal },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass-panel border-b border-blue-500/20 shadow-lg shadow-blue-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* RazorAgent AI Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 text-white font-bold" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-white flex items-center">
                Razor<span className="text-blue-400 ml-0.5">Agent</span> <span className="ml-1 text-xs font-mono px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">AI</span>
              </span>
              <span className="text-[9px] text-blue-300/80 uppercase tracking-widest font-mono">
                Powered by Razorpay
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link, idx) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={idx}
                  href={link.href}
                  className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all relative ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-300 font-semibold border border-blue-500/40 shadow-sm'
                      : link.highlight
                      ? 'text-blue-400 hover:bg-blue-500/10 border border-blue-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="ml-1 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-gradient-to-r from-blue-500 to-cyan-400 text-black">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3">
            <Link
              href="/cart"
              className="relative p-2 rounded-xl bg-surface/60 border border-blue-500/20 text-slate-300 hover:text-white hover:border-blue-500/40 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              href="/ai"
              className="hidden sm:inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 hover:scale-105 hover:shadow-blue-500/50 transition-all border border-blue-400/30"
            >
              <Bot className="w-4 h-4" />
              <span>Try RazorAgent</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-surface border border-white/10 text-neutral-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-blue-500/20 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link, idx) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium ${
                  isActive ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4 text-blue-400" />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-500 text-white">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
