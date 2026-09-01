'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Bot,
  Send,
  Sparkles,
  ShieldCheck,
  Zap,
  ShoppingBag,
  ArrowRight,
  RefreshCw,
  Sliders,
  Lock,
  Code,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { AgentMessage, ToolCallExecution } from '@/types';

function AICopilotInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';

  const [input, setInput] = useState(initialQuery);
  const [messages, setMessages] = useState<AgentMessage[]>([
    {
      id: 'msg_welcome',
      role: 'assistant',
      content: `👋 Hello! I am **RazorAgent AI**, your autonomous commerce agent powered by Razorpay.

I discover products across live merchant inventory, verify technical compatibility, calculate coupon discounts and 8% GST, and prepare explainable Razorpay checkout sessions.

**Try asking:**
- *"I need a productivity setup for college under ₹60,000."*
- *"I need headphones under ₹3000."*
- *"Why did merchant revenue increase today?"*`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      quickReplies: [
        'I need a productivity setup for college under ₹60,000.',
        'I need headphones under ₹3000.',
        'Why did merchant revenue increase today?'
      ]
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [activeTools, setActiveTools] = useState<ToolCallExecution[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (initialQuery) {
      sendMessage(initialQuery);
    }
  }, []);

  const sendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const userMsg: AgentMessage = {
      id: 'msg_usr_' + Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text })
      });
      const data = await res.json();

      if (data?.data) {
        const assistantMsg: AgentMessage = {
          id: 'msg_asst_' + Date.now(),
          role: 'assistant',
          content: data.data.message,
          timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
          toolCalls: data.data.toolCalls || [],
          quickReplies: data.data.quickReplies || []
        };
        setMessages(prev => [...prev, assistantMsg]);
        if (data.data.toolCalls) {
          setActiveTools(data.data.toolCalls);
        }
      }
    } catch (e: any) {
      setMessages(prev => [
        ...prev,
        {
          id: 'msg_err_' + Date.now(),
          role: 'assistant',
          content: 'Error communicating with AI Provider. Telemetry fallback active.',
          timestamp: new Date().toLocaleTimeString('en-US', { hour12: false })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-[calc(100vh-5rem)] flex flex-col lg:flex-row gap-6">
      {/* Left Chat Window */}
      <div className="flex-1 glass-panel rounded-3xl border border-blue-500/20 flex flex-col overflow-hidden shadow-2xl">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-surface/90 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-extrabold text-sm text-white">RazorAgent AI Copilot</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  18 TOOLS ACTIVE
                </span>
              </div>
              <p className="text-[11px] text-blue-300/80 font-mono">Autonomous Discovery • Explainable Gates • Razorpay Sandbox</p>
            </div>
          </div>

          <Link
            href="/live-agent"
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-blue-950/80 border border-blue-500/40 text-blue-200 text-xs font-bold hover:bg-blue-900/80 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Open WOW Visualizer</span>
          </Link>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              {/* Tool Execution Badges */}
              {m.toolCalls && m.toolCalls.length > 0 && (
                <div className="mb-3 space-y-1.5 w-full max-w-xl">
                  {m.toolCalls.map((tc, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-surface/90 border border-blue-500/20 flex items-center justify-between text-[11px] font-mono text-slate-300"
                    >
                      <div className="flex items-center space-x-2">
                        <Code className="w-3.5 h-3.5 text-blue-400" />
                        <span className="text-blue-300 font-bold">{tc.toolName}()</span>
                        <span className="text-slate-400">→ {tc.summary}</span>
                      </div>
                      <span className="text-slate-500">{tc.executionTimeMs}ms</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`max-w-2xl rounded-3xl p-5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap shadow-lg ${
                  m.role === 'user'
                    ? 'bg-blue-600 text-white font-medium'
                    : 'bg-surface/90 border border-blue-500/20 text-slate-100'
                }`}
              >
                {m.content}

                {/* Bounded Approval Action Card */}
                {m.content.includes('Explainable Action Gate') && (
                  <div className="mt-4 p-4 rounded-2xl bg-blue-950/80 border border-blue-500/40 text-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-blue-300 font-bold font-mono">
                        <Lock className="w-4 h-4 text-cyan-400" />
                        <span>EXPLAINABLE PERMISSION GATE</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                        APPROVAL REQUIRED
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px]">
                      RazorAgent AI has bounded your cart at <strong>₹53,846</strong>. Click approve to proceed to Razorpay Sandbox test checkout.
                    </p>
                    <button
                      onClick={() => router.push('/checkout')}
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve & Proceed to Checkout</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Quick Replies */}
              {m.quickReplies && m.quickReplies.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {m.quickReplies.map((reply, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(reply)}
                      className="px-3.5 py-1.5 rounded-xl bg-surface border border-blue-500/20 hover:border-blue-500 text-slate-300 hover:text-white text-xs transition-all flex items-center space-x-1.5"
                    >
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      <span>{reply}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
              <span>RazorAgent AI is executing multi-tool catalog search...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-white/10 bg-surface/90">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex items-center space-x-3"
          >
            <input
              type="text"
              placeholder="Ask RazorAgent AI (e.g. 'I need a college productivity setup under ₹60,000')..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-black/40 border border-blue-500/20 rounded-2xl px-5 py-3.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold transition-all shadow-md shadow-blue-600/30"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Right Tool Telemetry Drawer */}
      <div className="hidden lg:flex w-80 flex-col glass-panel rounded-3xl border border-blue-500/20 p-5 space-y-4 text-xs font-mono">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <span className="font-bold text-white uppercase text-xs">Tool Call Telemetry</span>
          <span className="text-[10px] text-emerald-400 font-bold">18 TOOLS</span>
        </div>

        <div className="space-y-2 flex-1 overflow-y-auto">
          {activeTools.length === 0 ? (
            <div className="text-slate-500 text-center py-8">
              No active tool calls. Send a prompt to observe live tool execution.
            </div>
          ) : (
            activeTools.map((tc, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-surface/60 border border-blue-500/10 space-y-1">
                <div className="flex justify-between text-blue-300 font-bold">
                  <span>{tc.toolName}</span>
                  <span className="text-slate-500 text-[10px]">{tc.executionTimeMs}ms</span>
                </div>
                <p className="text-slate-400 text-[10px] line-clamp-2">{tc.summary}</p>
              </div>
            ))
          )}
        </div>

        <div className="pt-3 border-t border-white/10 space-y-2">
          <span className="text-slate-400 text-[11px] block">Demo Scenarios:</span>
          <button
            onClick={() => sendMessage('I need a productivity setup for college under ₹60,000')}
            className="w-full text-left p-2.5 rounded-xl bg-surface hover:bg-blue-950/80 text-slate-300 text-[11px] transition-all border border-blue-500/10"
          >
            🎓 College Setup &lt;₹60,000
          </button>
          <button
            onClick={() => sendMessage('I need headphones under ₹3000')}
            className="w-full text-left p-2.5 rounded-xl bg-surface hover:bg-blue-950/80 text-slate-300 text-[11px] transition-all border border-blue-500/10"
          >
            🎧 Headphones &lt;₹3,000
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AICopilotPage() {
  return (
    <React.Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center text-slate-400 font-mono">Loading RazorAgent AI Copilot...</div>}>
      <AICopilotInner />
    </React.Suspense>
  );
}
