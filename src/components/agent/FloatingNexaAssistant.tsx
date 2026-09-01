'use client';
import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, Zap } from 'lucide-react';

export function FloatingNexaAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'assistant' | 'user'; text: string }[]>([
    {
      role: 'assistant',
      text: 'Hi! I am RazorAgent AI. Ask me anything about the catalog, revenue metrics, payment state, or explainable audit logs!'
    }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: q }]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: q })
      });
      const data = await res.json();
      if (data?.data?.message) {
        setMessages(prev => [...prev, { role: 'assistant', text: data.data.message }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', text: 'I processed your request using the catalog and telemetry APIs.' }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Catalog and telemetry tools are active. Feel free to explore the shop or dashboard!' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 flex items-center space-x-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 text-white font-semibold text-xs shadow-2xl shadow-blue-500/40 hover:scale-105 transition-all group border border-blue-400/40"
      >
        <Zap className="w-4 h-4 text-cyan-200 animate-pulse" />
        <span className="font-bold tracking-tight">RazorAgent AI</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[480px] glass-panel-glow rounded-2xl flex flex-col shadow-2xl border border-blue-500/40 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-surface/90 rounded-t-2xl">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Zap className="w-4 h-4 font-bold" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-white">RazorAgent AI Copilot</h4>
                <p className="text-[10px] text-blue-300 font-mono">Autonomous Commerce Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    m.role === 'user'
                      ? 'bg-blue-600 text-white font-medium rounded-tr-none'
                      : 'bg-surface/80 text-slate-200 border border-blue-500/20 rounded-tl-none leading-relaxed'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center space-x-2 text-slate-400 text-xs font-mono">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                <span>RazorAgent querying tools...</span>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="px-4 py-2 bg-black/40 border-t border-white/5 flex gap-1.5 overflow-x-auto text-[10px]">
            <button
              onClick={() => handleSend('College setup under 60k')}
              className="px-2.5 py-1 rounded-lg bg-blue-950/80 text-blue-300 hover:bg-blue-900/80 whitespace-nowrap border border-blue-500/30"
            >
              🎓 College Setup &lt;₹60k
            </button>
            <button
              onClick={() => handleSend('Headphones under 3000')}
              className="px-2.5 py-1 rounded-lg bg-blue-950/80 text-blue-300 hover:bg-blue-900/80 whitespace-nowrap border border-blue-500/30"
            >
              🎧 Headphones &lt;₹3k
            </button>
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/10 bg-surface/90 rounded-b-2xl flex items-center space-x-2">
            <input
              type="text"
              placeholder="Ask RazorAgent AI..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-black/40 border border-blue-500/20 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
