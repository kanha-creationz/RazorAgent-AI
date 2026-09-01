'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6 text-center">
        <h1 className="text-2xl font-bold text-white">Reset Password</h1>
        <p className="text-xs text-neutral-400">Enter your registered email to receive a password reset link.</p>
        {sent ? (
          <div className="p-4 rounded-xl bg-accent-teal/20 text-accent-teal text-xs font-mono">
            Password reset link sent! (Test Sandbox Mode)
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4 text-xs text-left">
            <div>
              <label className="text-neutral-400 block mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-accent-amber"
              />
            </div>
            <button type="submit" className="w-full py-3 rounded-xl bg-accent-amber text-black font-bold text-xs">
              Send Reset Link
            </button>
          </form>
        )}
        <Link href="/login" className="text-xs text-neutral-400 hover:text-white block pt-2">
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}
