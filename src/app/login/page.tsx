'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Bot, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('customer@razoragent.ai');
  const [password, setPassword] = useState('Customer@1234');

  const fillDemo = (role: string) => {
    if (role === 'admin') {
      setEmail('admin@razoragent.ai');
      setPassword('Admin@1234');
    } else if (role === 'merchant') {
      setEmail('merchant@razoragent.ai');
      setPassword('Merchant@1234');
    } else {
      setEmail('customer@razoragent.ai');
      setPassword('Customer@1234');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="glass-panel-glow p-8 rounded-3xl border border-accent-amber/30 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-accent-amber flex items-center justify-center text-black mx-auto font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold text-white">Sign In to RazorAgent</h1>
          <p className="text-xs text-neutral-400">Select a pre-seeded account or enter credentials.</p>
        </div>

        {/* Demo Fast Fill Buttons */}
        <div className="flex gap-2 text-xs font-mono">
          <button onClick={() => fillDemo('customer')} className="flex-1 py-1.5 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-white">
            AI Buyer
          </button>
          <button onClick={() => fillDemo('merchant')} className="flex-1 py-1.5 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-white">
            Merchant
          </button>
          <button onClick={() => fillDemo('admin')} className="flex-1 py-1.5 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-white">
            Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-neutral-400 block mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-accent-amber"
            />
          </div>
          <div>
            <label className="text-neutral-400 block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-accent-amber"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-accent-amber text-black font-bold text-xs hover:bg-accent-amber-light transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
