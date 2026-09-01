'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Search, Filter, Lock } from 'lucide-react';
import { AuditLog } from '@/types';

export default function AuditExplorerPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  useEffect(() => {
    fetchAuditLogs();
  }, [search, filterStatus]);

  const fetchAuditLogs = async () => {
    const url = `/api/audit?search=${encodeURIComponent(search)}&status=${filterStatus}`;
    const res = await fetch(url);
    const json = await res.json();
    if (json?.data?.logs) setLogs(json.data.logs);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="pb-6 border-b border-white/10">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-accent-amber mb-1">
          <ShieldCheck className="w-4 h-4" />
          <span>CRYPTOGRAPHIC AUDIT LOGS</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Immutable Audit Explorer</h1>
        <p className="text-xs text-neutral-400 mt-1">
          Every critical transaction, AI tool execution, and permission gate is immutably logged with hashed metadata.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by action, ID, user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-accent-amber"
          />
        </div>

        <div className="flex gap-2 text-xs font-mono">
          {['ALL', 'SUCCESS', 'REQUIRES_APPROVAL', 'FAILED'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                filterStatus === st
                  ? 'bg-accent-amber text-black font-bold'
                  : 'bg-surface border border-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface/80 border-b border-white/10 font-mono text-neutral-400">
              <tr>
                <th className="p-4">Audit ID</th>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Action</th>
                <th className="p-4">Status</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Gate Status</th>
                <th className="p-4">Summary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-mono text-accent-amber font-bold">{log.auditId}</td>
                  <td className="p-4 font-mono text-neutral-400 text-[11px]">{new Date(log.timestamp).toLocaleTimeString()}</td>
                  <td className="p-4 font-mono text-white font-bold">{log.action}</td>
                  <td className="p-4">
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      log.status === 'SUCCESS' ? 'bg-accent-teal/20 text-accent-teal' : log.status === 'REQUIRES_APPROVAL' ? 'bg-amber-500/20 text-amber-300' : 'bg-rose-500/20 text-rose-400'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-white">{log.amount ? `₹${log.amount.toLocaleString()}` : '-'}</td>
                  <td className="p-4 font-mono text-neutral-300">{log.approvalStatus || 'AUTO'}</td>
                  <td className="p-4 text-neutral-300 max-w-xs truncate">{log.outputSummary || log.inputSummary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
