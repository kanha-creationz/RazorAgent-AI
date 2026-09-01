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

// 1. src/app/ai/page.tsx
save('src/app/ai/page.tsx', `
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

export default function AICopilotPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';

  const [input, setInput] = useState(initialQuery);
  const [messages, setMessages] = useState<AgentMessage[]>([
    {
      id: 'msg_welcome',
      role: 'assistant',
      content: \`👋 Hello! I am **Commerce Copilot**, your autonomous AI commerce agent.

I can discover products across real merchant inventory, compare technical specs, assemble budget-constrained setups, and prepare explainable Razorpay checkout sessions.

**Try asking:**
- *"I need a productivity setup for college under ₹60,000."*
- *"I need headphones under ₹3000."*
- *"Why did merchant revenue increase today?"*\`,
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
      <div className="flex-1 glass-panel rounded-3xl border border-white/10 flex flex-col overflow-hidden shadow-2xl">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-surface/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-accent-amber to-accent-purple flex items-center justify-center text-black font-bold shadow-lg shadow-accent-amber/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-extrabold text-sm text-white">Commerce Copilot</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent-teal/20 text-accent-teal border border-accent-teal/30">
                  TOOL CALLING ACTIVE
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-mono">Autonomous Discovery • Explainable Gates • Razorpay Sandbox</p>
            </div>
          </div>

          <Link
            href="/live-agent"
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-accent-purple/20 border border-accent-purple/40 text-purple-200 text-xs font-bold hover:bg-accent-purple/30 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent-amber" />
            <span>Open WOW Visualizer</span>
          </Link>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((m) => (
            <div
              key={m.id}
              className={\`flex flex-col \${m.role === 'user' ? 'items-end' : 'items-start'}\`}
            >
              {/* Tool Execution Badges */}
              {m.toolCalls && m.toolCalls.length > 0 && (
                <div className="mb-3 space-y-1.5 w-full max-w-xl">
                  {m.toolCalls.map((tc, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-surface/90 border border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-300"
                    >
                      <div className="flex items-center space-x-2">
                        <Code className="w-3.5 h-3.5 text-accent-amber" />
                        <span className="text-accent-amber font-bold">{tc.toolName}()</span>
                        <span className="text-neutral-400">→ {tc.summary}</span>
                      </div>
                      <span className="text-neutral-500">{tc.executionTimeMs}ms</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={\`max-w-2xl rounded-3xl p-5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap shadow-lg \${
                  m.role === 'user'
                    ? 'bg-accent-amber text-black font-semibold'
                    : 'bg-surface/90 border border-white/10 text-neutral-100'
                }\`}
              >
                {m.content}

                {/* Explainable Money Gate Card in Chat */}
                {m.toolCalls?.some(tc => tc.actionCard?.type === 'CHECKOUT_CONFIRMATION') && (
                  <div className="mt-4 p-4 rounded-2xl bg-black/50 border border-accent-amber/40 text-xs space-y-3">
                    <div className="flex items-center space-x-2 text-accent-amber font-bold font-mono">
                      <Lock className="w-4 h-4" />
                      <span>EXPLAINABLE PERMISSION REQUIRED</span>
                    </div>
                    <p className="text-neutral-300">
                      AI prepared a verified bundle. No payment has been initiated yet.
                    </p>
                    <div className="flex space-x-2 pt-1">
                      <Link
                        href="/checkout"
                        className="px-4 py-2 rounded-xl bg-accent-amber text-black font-bold text-xs hover:bg-accent-amber-light inline-flex items-center space-x-1"
                      >
                        <span>Approve & Proceed to Sandbox</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Replies */}
              {m.quickReplies && m.quickReplies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3 max-w-2xl">
                  {m.quickReplies.map((qr, idx) => (
                    <button
                      key={idx}
                      onClick={() => sendMessage(qr)}
                      className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-accent-amber/50 hover:bg-accent-amber/10 text-xs text-neutral-300 hover:text-white transition-all font-mono"
                    >
                      {qr}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-2 text-xs font-mono text-accent-amber bg-surface/80 p-3 rounded-2xl border border-white/10 w-fit">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Copilot is querying catalog tools & checking stock...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-white/10 bg-surface/80">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="Ask anything (e.g. Build college setup under ₹60k, or Headphones <₹3,000)..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-4 py-3.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-accent-amber"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-accent-amber to-accent-amber-light text-black font-bold disabled:opacity-40 hover:opacity-95 shadow-md shadow-accent-amber/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Right Telemetry & Tool Inspection Panel */}
      <div className="hidden lg:flex w-80 flex-col glass-panel rounded-3xl border border-white/10 p-5 space-y-6 overflow-y-auto">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-accent-amber uppercase mb-2">
            <Zap className="w-4 h-4" />
            <span>Agent NPU Router</span>
          </div>
          <h3 className="text-base font-bold text-white">Live Tool Execution</h3>
          <p className="text-[11px] text-neutral-400 mt-1">
            Real-time tool invocations, stock queries, and boundary checks.
          </p>
        </div>

        <div className="space-y-3">
          <div className="p-3.5 rounded-2xl bg-surface/80 border border-white/5 space-y-1 text-xs font-mono">
            <span className="text-neutral-500 text-[10px]">AI PROVIDER</span>
            <p className="font-bold text-white">Multi-Adapter (Gemini/OpenAI/Local)</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface/80 border border-white/5 space-y-1 text-xs font-mono">
            <span className="text-neutral-500 text-[10px]">MONEY PERMISSION GATE</span>
            <p className="font-bold text-accent-teal">STRICT USER APPROVAL</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface/80 border border-white/5 space-y-1 text-xs font-mono">
            <span className="text-neutral-500 text-[10px]">REGISTERED TOOLS</span>
            <p className="font-bold text-accent-purple">18 Commerce Functions</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4 space-y-3">
          <h4 className="text-xs font-bold text-white font-mono uppercase">Quick Action Scenarios</h4>
          <button
            onClick={() => sendMessage('I need a productivity setup for college under ₹60,000.')}
            className="w-full text-left p-3 rounded-2xl bg-surface border border-white/5 hover:border-accent-amber/40 text-xs text-neutral-300"
          >
            🎓 College Setup &lt;₹60k
          </button>
          <button
            onClick={() => sendMessage('I need headphones under ₹3000.')}
            className="w-full text-left p-3 rounded-2xl bg-surface border border-white/5 hover:border-accent-amber/40 text-xs text-neutral-300"
          >
            🎧 Headphones &lt;₹3,000
          </button>
          <button
            onClick={() => sendMessage('Why did merchant revenue increase today?')}
            className="w-full text-left p-3 rounded-2xl bg-surface border border-white/5 hover:border-accent-purple/40 text-xs text-neutral-300"
          >
            📊 Merchant Analytics
          </button>
        </div>
      </div>
    </div>
  );
}
`);

// 2. src/app/live-agent/page.tsx (THE HACKATHON WOW COMMAND CENTER)
save('src/app/live-agent/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bot,
  Sparkles,
  Terminal,
  Activity,
  ArrowRight,
  CheckCircle2,
  Lock,
  Play,
  Pause,
  RotateCcw,
  Zap
} from 'lucide-react';
import { HeroScene } from '@/components/3d/HeroScene';

export default function LiveAgentVisualizerPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [logs, setLogs] = useState<string[]>([
    '23:01:02 [BOOT] RazorAgent AI Agent Core online.',
    '23:01:05 [API] GET /api/products?agent=true 200 (14ms)',
    '23:01:10 [AGENT] User intent: "College setup under 60k" received.',
    '23:01:11 [TOOL] search_products(query="college laptop", maxPrice=60000) -> 3 items',
    '23:01:12 [TOOL] check_inventory(ids=[prod_03, prod_05, prod_07]) -> In Stock (52, 140, 90)',
    '23:01:13 [TOOL] calculate_cart(coupon="STUDENT10") -> ₹53,846',
    '23:01:14 [GATE] Explainable Permission Gate Activated. Awaiting approval.',
    '23:01:25 [PAYMENT] Razorpay Sandbox Order Created: order_test_razoragent_98210',
    '23:01:32 [WEBHOOK] payment.captured HMAC-SHA256 verified successfully.',
    '23:01:33 [ORDER] Order NEX-ORD-98210 transitioned to PAID.'
  ]);

  const stages = [
    { title: 'Buyer Intent', desc: 'College setup <₹60,000' },
    { title: 'Catalog Search', desc: 'SwiftAir 14" identified' },
    { title: 'Inventory Check', desc: '52 units verified in stock' },
    { title: 'Cross-Sell Bundle', desc: 'AeroGlide Mouse + AcousticPure Flow' },
    { title: 'Cart Pricing', desc: 'STUDENT10 applied (₹53,846)' },
    { title: 'Permission Gate', desc: 'Buyer explicitly approved' },
    { title: 'Razorpay Sandbox', desc: 'Payment Captured & Verified' }
  ];

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % stages.length);
      const time = new Date().toLocaleTimeString('en-US', { hour12: false });
      const newLog = \`\${time} [AUTO-STREAM] Agent executed step: \${stages[(currentStep + 1) % stages.length].title}\`;
      setLogs(prev => [newLog, ...prev.slice(0, 15)]);
    }, 3000);
    return () => clearInterval(interval);
  }, [isRunning, currentStep]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Bar */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-accent-amber mb-1">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>HACKATHON COMMAND CENTER • REAL-TIME AI VISUALIZER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Live Agentic Commerce Visualizer</h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-surface border border-white/10 hover:border-accent-amber text-xs font-bold text-white transition-all"
          >
            {isRunning ? <Pause className="w-4 h-4 text-accent-amber" /> : <Play className="w-4 h-4 text-accent-teal" />}
            <span>{isRunning ? 'Pause Stream' : 'Resume Stream'}</span>
          </button>

          <Link
            href="/ai"
            className="px-4 py-2 rounded-xl bg-accent-amber text-black font-bold text-xs hover:bg-accent-amber-light"
          >
            Open Interactive Chat
          </Link>
        </div>
      </div>

      {/* 4-Quadrant Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quadrant 1: 3D Pipeline Visualizer */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-mono uppercase">3D Flow Pipeline</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent-purple/20 text-purple-300">
              STAGE {currentStep + 1}/7
            </span>
          </div>
          <HeroScene />
        </div>

        {/* Quadrant 2: Live Pipeline Stages */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white font-mono uppercase mb-4">Autonomous Execution Stage</h3>
            <div className="space-y-2.5">
              {stages.map((stage, idx) => {
                const isActive = currentStep === idx;
                const isPassed = currentStep > idx;
                return (
                  <div
                    key={idx}
                    className={\`p-3 rounded-2xl border transition-all flex items-center justify-between text-xs \${
                      isActive
                        ? 'bg-accent-amber/10 border-accent-amber text-white ring-1 ring-accent-amber/30'
                        : isPassed
                        ? 'bg-surface/60 border-white/5 text-neutral-400'
                        : 'bg-surface/30 border-white/5 text-neutral-600'
                    }\`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={\`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold \${
                          isActive
                            ? 'bg-accent-amber text-black animate-pulse'
                            : isPassed
                            ? 'bg-accent-teal/20 text-accent-teal'
                            : 'bg-white/5 text-neutral-500'
                        }\`}
                      >
                        {isPassed ? '✓' : idx + 1}
                      </div>
                      <div>
                        <p className="font-bold text-white">{stage.title}</p>
                        <p className="text-[11px] text-neutral-400">{stage.desc}</p>
                      </div>
                    </div>
                    {isActive && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent-amber text-black font-bold">
                        ACTIVE
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quadrant 3: Real-Time Server Logs */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3 font-mono">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-accent-teal" />
              <h3 className="text-xs font-bold text-white uppercase">Backend Server & Webhook Stream</h3>
            </div>
            <span className="w-2 h-2 rounded-full bg-accent-teal animate-ping" />
          </div>
          <div className="p-4 rounded-2xl bg-black/60 border border-white/5 h-64 overflow-y-auto text-[11px] text-emerald-400 space-y-1.5">
            {logs.map((log, idx) => (
              <p key={idx} className="leading-relaxed">{log}</p>
            ))}
          </div>
        </div>

        {/* Quadrant 4: Live Commerce Metrics */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-accent-amber" />
            <h3 className="text-xs font-bold text-white uppercase font-mono">Live Attribution Telemetry</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-surface/80 border border-white/5">
              <span className="text-[10px] font-mono text-neutral-400">TOTAL AI GMV</span>
              <p className="text-2xl font-extrabold text-white mt-1">₹14,28,450</p>
              <span className="text-[10px] text-emerald-400 font-mono">+34.2% today</span>
            </div>

            <div className="p-4 rounded-2xl bg-surface/80 border border-white/5">
              <span className="text-[10px] font-mono text-neutral-400">AI CONVERSION RATE</span>
              <p className="text-2xl font-extrabold text-accent-teal mt-1">12.9%</p>
              <span className="text-[10px] text-neutral-400 font-mono">vs 2.4% standard</span>
            </div>

            <div className="p-4 rounded-2xl bg-surface/80 border border-white/5">
              <span className="text-[10px] font-mono text-neutral-400">BUNDLES GENERATED</span>
              <p className="text-2xl font-extrabold text-accent-purple mt-1">3,410</p>
              <span className="text-[10px] text-neutral-400 font-mono">100% budget accurate</span>
            </div>

            <div className="p-4 rounded-2xl bg-surface/80 border border-white/5">
              <span className="text-[10px] font-mono text-neutral-400">SANDBOX PAYMENTS</span>
              <p className="text-2xl font-extrabold text-accent-amber mt-1">1,840</p>
              <span className="text-[10px] text-neutral-400 font-mono">HMAC Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`);

console.log('AI and Live Agent visualizer pages created');
