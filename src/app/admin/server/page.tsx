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
              <span className={`font-bold ${l.method === 'POST' ? 'text-accent-amber' : l.method === 'WEBHOOK' ? 'text-accent-purple' : 'text-accent-teal'}`}>
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
