'use client';

import React, { useState } from 'react';
import { Terminal, Code, Copy, Check, ShieldCheck, Zap } from 'lucide-react';

export default function ApiDocsPage() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const endpoints = [
    {
      method: 'POST',
      path: '/api/agent/chat',
      desc: 'Conversational AI agent endpoint with autonomous tool routing and explainability.',
      req: {
        prompt: "I need a productivity setup for college under ₹60,000.",
        sessionId: "sess_demo_01",
        userId: "usr_customer_01"
      },
      res: {
        success: true,
        requestId: "req_ai_89210",
        data: {
          message: "I've built the Optimal College Productivity Setup under ₹60,000...",
          toolCalls: [
            { toolName: "search_products", summary: "Found 3 matching products" },
            { toolName: "check_inventory", summary: "Stock verified: 52, 140, 90" },
            { toolName: "calculate_cart", summary: "Subtotal ₹55,397 with STUDENT10 promo" },
            { toolName: "create_checkout_session", summary: "Explainable permission gate activated" }
          ]
        }
      }
    },
    {
      method: 'GET',
      path: '/api/products?agent=true',
      desc: 'Machine-readable structured catalog feed for external AI buyer agents.',
      req: null,
      res: {
        success: true,
        schema: "RazorAgent-Agent-Catalog-v1",
        totalItems: 15,
        items: [
          {
            sku: "NEX-LAP-003",
            title: "RazorAgent SwiftAir 14 College Edition",
            priceINR: 49999,
            inStock: true,
            stockCount: 52,
            aiRecommendationTriggers: ["college laptop under 60000", "productivity setup under 60k"],
            compatibleAddons: ["prod_05", "prod_07"]
          }
        ]
      }
    },
    {
      method: 'POST',
      path: '/api/payments/create-order',
      desc: 'Generates a secure server-side Razorpay test mode payment order with idempotency.',
      req: {
        amount: 53846,
        orderId: "ord_init_01",
        idempotencyKey: "idem_98210_token"
      },
      res: {
        success: true,
        data: {
          razorpayOrderId: "order_test_razoragent_98210",
          amount: 5384600,
          currency: "INR",
          keyId: "rzp_test_mock_razoragent2026",
          qrPayload: "upi://pay?pa=razoragent.merchant@razorpay&am=53846..."
        }
      }
    },
    {
      method: 'POST',
      path: '/api/payments/verify',
      desc: 'Validates cryptographic Razorpay HMAC-SHA256 signatures before updating order state.',
      req: {
        orderId: "ord_init_01",
        razorpayOrderId: "order_test_razoragent_98210",
        razorpayPaymentId: "pay_test_succ_110",
        razorpaySignature: "sig_mock_verified_hmac_2026"
      },
      res: {
        success: true,
        data: {
          verified: true,
          order: { status: "PAID", orderNumber: "NEX-ORD-98210" }
        }
      }
    }
  ];

  const copyCode = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="pb-6 border-b border-white/10">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-accent-purple mb-1">
          <Code className="w-4 h-4 text-accent-amber" />
          <span>OPENAPI / REST ENDPOINTS SPECIFICATION</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">API Documentation & Schemas</h1>
        <p className="text-xs text-neutral-400 mt-1">
          Machine-readable endpoints, idempotency keys, HMAC signatures, and AI tool routing definitions.
        </p>
      </div>

      <div className="space-y-6">
        {endpoints.map((ep, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className={`px-2.5 py-1 rounded-lg font-mono text-xs font-bold ${
                  ep.method === 'POST' ? 'bg-accent-amber text-black' : 'bg-accent-purple text-white'
                }`}>
                  {ep.method}
                </span>
                <span className="font-mono text-sm font-bold text-white">{ep.path}</span>
              </div>
              <button
                onClick={() => copyCode(ep.path, idx)}
                className="p-2 rounded-lg bg-surface border border-white/10 text-neutral-400 hover:text-white"
                title="Copy Path"
              >
                {copiedIdx === idx ? <Check className="w-4 h-4 text-accent-teal" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <p className="text-xs text-neutral-400">{ep.desc}</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs font-mono">
              {ep.req && (
                <div className="space-y-1.5">
                  <span className="text-neutral-500 text-[10px]">REQUEST BODY</span>
                  <pre className="p-3.5 rounded-2xl bg-black/60 border border-white/5 text-amber-200 overflow-x-auto">
                    {JSON.stringify(ep.req, null, 2)}
                  </pre>
                </div>
              )}
              <div className={`space-y-1.5 ${!ep.req ? 'lg:col-span-2' : ''}`}>
                <span className="text-neutral-500 text-[10px]">RESPONSE (200 OK)</span>
                <pre className="p-3.5 rounded-2xl bg-black/60 border border-white/5 text-emerald-400 overflow-x-auto">
                  {JSON.stringify(ep.res, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
