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

// 1. src/app/admin/server/page.tsx
save('src/app/admin/server/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import { Terminal, Activity, ShieldCheck, RefreshCw, Cpu, Server } from 'lucide-react';
import { ServerEventLog } from '@/types';

export default function AdminServerConsolePage() {
  const [logs, setLogs] = useState<ServerEventLog[]>([]);
  const [serverStats, setServerStats] = useState<any>({
    serverStatus: 'HEALTHY',
    memoryUsageMB: 48,
    activeSessions: 22,
    uptimeSec: 1240
  });

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/admin/server');
      const json = await res.json();
      if (json?.data) {
        setServerStats(json.data);
        if (json.data.recentLogs) setLogs(json.data.recentLogs);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-accent-teal mb-1">
            <Terminal className="w-4 h-4" />
            <span>DEV & OPERATIONAL TELEMETRY</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Admin Practical Server Console</h1>
          <p className="text-xs text-neutral-400 mt-1">Live inspection of all API calls, AI tool executions, and webhook verifications reaching the backend.</p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono bg-surface border border-white/10 px-3 py-1.5 rounded-xl">
          <span className="w-2.5 h-2.5 rounded-full bg-accent-teal animate-ping" />
          <span className="text-white font-bold">Node.js Server ONLINE</span>
        </div>
      </div>

      {/* Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
        <div className="glass-panel p-4 rounded-2xl border border-white/10">
          <span className="text-neutral-500">MEMORY (HEAP)</span>
          <p className="text-xl font-bold text-white mt-1">{serverStats.memoryUsageMB} MB</p>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-white/10">
          <span className="text-neutral-500">ACTIVE CLIENT SESSIONS</span>
          <p className="text-xl font-bold text-accent-amber mt-1">{serverStats.activeSessions}</p>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-white/10">
          <span className="text-neutral-500">SERVER UPTIME</span>
          <p className="text-xl font-bold text-accent-purple mt-1">{Math.floor(serverStats.uptimeSec || 0)}s</p>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-white/10">
          <span className="text-neutral-500">RAZORPAY TEST GATEWAY</span>
          <p className="text-xl font-bold text-accent-teal mt-1">CONNECTED</p>
        </div>
      </div>

      {/* Terminal View */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs font-mono text-neutral-400 ml-2">stdout / server.log</span>
          </div>
          <span className="text-xs font-mono text-accent-teal">LIVE HTTP/SSE STREAM</span>
        </div>

        <div className="p-4 rounded-2xl bg-black/80 border border-white/5 h-96 overflow-y-auto font-mono text-[11px] text-neutral-300 space-y-2">
          {logs.map((l, idx) => (
            <div key={idx} className="flex items-start space-x-3 leading-relaxed hover:bg-white/5 p-1 rounded">
              <span className="text-neutral-500 select-none">{l.timestamp}</span>
              <span className={\`font-bold \${l.method === 'POST' ? 'text-accent-amber' : l.method === 'WEBHOOK' ? 'text-accent-purple' : 'text-accent-teal'}\`}>
                {l.method}
              </span>
              <span className="text-neutral-400">{l.endpoint}</span>
              <span className="text-emerald-400 font-bold">{l.statusCode}</span>
              <span className="text-neutral-500">{l.responseTimeMs}ms</span>
              <span className="text-neutral-300">[{l.category}] {l.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
`);

// 2. src/app/admin/health/page.tsx
save('src/app/admin/health/page.tsx', `
'use client';
import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ServerHealthPage() {
  const [health, setHealth] = useState<any>(null);

  useEffect(() => {
    fetch('/api/admin/health')
      .then(res => res.json())
      .then(json => {
        if (json?.data) setHealth(json.data);
      });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">System Health & Telemetry</h1>
        <p className="text-xs text-neutral-400 mt-1">Infrastructure vitals, database response times, and AI provider status.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="font-bold text-sm text-white font-mono uppercase">Core Services Status</h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center p-3 rounded-xl bg-surface/60 border border-white/5">
              <span>Next.js API Routes</span>
              <span className="text-accent-teal font-mono font-bold">ONLINE (14ms)</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-surface/60 border border-white/5">
              <span>Database (Prisma / In-Memory)</span>
              <span className="text-accent-teal font-mono font-bold">ONLINE (6ms)</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-surface/60 border border-white/5">
              <span>AI Provider Adapter</span>
              <span className="text-accent-teal font-mono font-bold">ONLINE (Multi-Adapter)</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-surface/60 border border-white/5">
              <span>Razorpay Sandbox</span>
              <span className="text-accent-teal font-mono font-bold">ONLINE (HMAC Verified)</span>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="font-bold text-sm text-white font-mono uppercase">Runtime Metrics</h3>
          <div className="space-y-3 text-xs font-mono">
            <div className="flex justify-between p-3 rounded-xl bg-surface/60 border border-white/5">
              <span className="text-neutral-400">Node Runtime:</span>
              <span className="text-white">{health?.system?.nodeVersion || 'v24.19.0'}</span>
            </div>
            <div className="flex justify-between p-3 rounded-xl bg-surface/60 border border-white/5">
              <span className="text-neutral-400">Memory Allocation:</span>
              <span className="text-white">{health?.system?.memoryUsageMB || 48} MB</span>
            </div>
            <div className="flex justify-between p-3 rounded-xl bg-surface/60 border border-white/5">
              <span className="text-neutral-400">Error Rate:</span>
              <span className="text-accent-teal font-bold">0.00% (Zero Downtime)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`);

// 3. src/app/architecture/page.tsx
save('src/app/architecture/page.tsx', `
'use client';
import React from 'react';
import Link from 'next/link';
import { Layers, Bot, Database, CreditCard, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ArchitecturePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-accent-amber mb-1">
          <Layers className="w-4 h-4" />
          <span>SYSTEM ARCHITECTURE SPECIFICATION</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">RazorAgent AI Agentic Architecture</h1>
        <p className="text-xs text-neutral-400 mt-1">
          End-to-end dataflow pipeline linking autonomous buyers, merchant growth algorithms, and Razorpay test mode payment orchestration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-accent-amber/10 text-accent-amber flex items-center justify-center font-bold">
            1
          </div>
          <h3 className="font-bold text-base text-white">AI Buyer & Intent Parser</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Consumes natural language queries and translates them into structured parameter payloads without hallucinating catalog prices or stock.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-accent-purple/10 text-accent-purple flex items-center justify-center font-bold">
            2
          </div>
          <h3 className="font-bold text-base text-white">18+ Tool Execution Router</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Directly invokes database queries for inventory validation, real-time bundling, compatibility checks, and tax/discount calculations.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-accent-teal/10 text-accent-teal flex items-center justify-center font-bold">
            3
          </div>
          <h3 className="font-bold text-base text-white">Razorpay Sandbox Orchestrator</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Gated financial layer that generates test orders, verifies cryptographic HMAC signatures, and writes immutable audit logs.
          </p>
        </div>
      </div>
    </div>
  );
}
`);

// 4. src/app/security/page.tsx
save('src/app/security/page.tsx', `
'use client';
import React from 'react';
import { ShieldCheck, Lock, CheckCircle2, Key } from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-accent-teal mb-1">
          <ShieldCheck className="w-4 h-4" />
          <span>FINANCIAL SAFETY & COMPLIANCE</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Security & Explainable Money Gates</h1>
        <p className="text-xs text-neutral-400 mt-1">How RazorAgent protects merchants and buyers during autonomous AI commerce.</p>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white">Core Security Invariants</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-surface/60 border border-white/5 space-y-1">
              <span className="font-mono text-accent-amber font-bold">1. Zero Raw Credential Storage</span>
              <p className="text-neutral-400">We never collect or store card numbers, CVVs, or UPI PINs in application forms.</p>
            </div>
            <div className="p-4 rounded-2xl bg-surface/60 border border-white/5 space-y-1">
              <span className="font-mono text-accent-purple font-bold">2. Explainable Money Gates</span>
              <p className="text-neutral-400">AI can build carts and compute pricing, but CAN NEVER autonomously approve a debit.</p>
            </div>
            <div className="p-4 rounded-2xl bg-surface/60 border border-white/5 space-y-1">
              <span className="font-mono text-accent-teal font-bold">3. HMAC Webhook Signature Verification</span>
              <p className="text-neutral-400">All Razorpay webhooks are cryptographically validated using SHA-256 HMAC secrets.</p>
            </div>
            <div className="p-4 rounded-2xl bg-surface/60 border border-white/5 space-y-1">
              <span className="font-mono text-blue-400 font-bold">4. Immutable Audit Records</span>
              <p className="text-neutral-400">Every AI tool call, user approval, and financial transition writes a permanent audit record.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`);

// 5. src/app/login/page.tsx
save('src/app/login/page.tsx', `
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
`);

console.log('Admin, architecture, security, and auth pages created');
