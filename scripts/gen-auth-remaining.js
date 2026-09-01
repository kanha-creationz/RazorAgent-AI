const fs = require('fs');
const path = require('path');

function save(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content.trimStart(), 'utf8');
  console.log('Saved:', filePath);
}

// 1. src/app/signup/page.tsx
save('src/app/signup/page.tsx', `
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
`);

// 2. src/app/forgot-password/page.tsx
save('src/app/forgot-password/page.tsx', `
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
`);

// 3. src/app/dashboard/analytics/page.tsx
save('src/app/dashboard/analytics/page.tsx', `
'use client';
import React from 'react';
import Link from 'next/link';
import { Bot, ArrowRight, TrendingUp } from 'lucide-react';

export default function MerchantAnalyticsDeepPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Deep AI Analytics & Attribution</h1>
        <p className="text-xs text-neutral-400 mt-1">Granular breakdown of discovery conversion, upselling revenue, and cart recovery.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
          <span className="text-xs font-mono text-neutral-400">UPSELL REVENUE GENERATED</span>
          <p className="text-3xl font-black text-accent-amber">₹3,40,000</p>
          <p className="text-[11px] text-accent-teal font-mono">+42% from RAM & charger prompts</p>
        </div>
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
          <span className="text-xs font-mono text-neutral-400">CROSS-SELL BUNDLE GMV</span>
          <p className="text-3xl font-black text-accent-purple">₹2,80,000</p>
          <p className="text-[11px] text-accent-teal font-mono">Mouse & headphone combos</p>
        </div>
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
          <span className="text-xs font-mono text-neutral-400">CART RECOVERY RATE</span>
          <p className="text-3xl font-black text-accent-teal">42.5%</p>
          <p className="text-[11px] text-neutral-400 font-mono">Autonomous follow-up agents</p>
        </div>
      </div>
    </div>
  );
}
`);

// 4. src/app/dashboard/customers/page.tsx
save('src/app/dashboard/customers/page.tsx', `
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
`);

// 5. src/app/dashboard/agent/page.tsx
save('src/app/dashboard/agent/page.tsx', `
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
`);

console.log('All remaining auth and sub-dashboard pages saved');
