'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Bot } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="glass-panel-glow p-8 rounded-3xl border border-accent-amber/30 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-accent-purple flex items-center justify-center text-white mx-auto font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold text-white">Create RazorAgent Account</h1>
          <p className="text-xs text-neutral-400">Join as an AI Buyer or Merchant Store Owner.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-neutral-400 block mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-accent-amber"
            />
          </div>
          <div>
            <label className="text-neutral-400 block mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-accent-amber"
            />
          </div>
          <div>
            <label className="text-neutral-400 block mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-accent-amber"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-accent-amber text-black font-bold text-xs hover:bg-accent-amber-light transition-colors"
          >
            Create Account
          </button>
        </form>

        <div className="text-center text-xs text-neutral-400">
          Already have an account? <Link href="/login" className="text-accent-amber hover:underline font-bold">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
