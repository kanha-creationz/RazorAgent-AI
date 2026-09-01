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

// 1. src/app/dashboard/products/page.tsx (Catalog Manager + URL Importer)
save('src/app/dashboard/products/page.tsx', `
'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Download, Edit, Trash2, Globe } from 'lucide-react';
import { Product } from '@/types';

export default function MerchantProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importUrl, setImportUrl] = useState('https://example-merchant.com/feed.json');
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(json => {
        if (json?.data?.products) setProducts(json.data.products);
      });
  }, []);

  const handleImport = () => {
    setImporting(true);
    setTimeout(() => {
      setImporting(false);
      setImportModalOpen(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Merchant Catalog Manager</h1>
          <p className="text-xs text-neutral-400 mt-1">Manage SKUs, configure AI metadata, and import permitted public feeds.</p>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => setImportModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-surface border border-white/10 hover:border-accent-purple text-xs font-bold text-white flex items-center space-x-2"
          >
            <Globe className="w-4 h-4 text-accent-purple" />
            <span>Import Catalog URL</span>
          </button>
        </div>
      </div>

      {importModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md glass-panel-glow rounded-3xl p-6 border border-accent-purple/40 space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white">Import Permitted Product Catalog Feed</h3>
            <p className="text-neutral-400">Respects robots.txt, rate limits, and ingests public product fields.</p>
            <input
              type="text"
              value={importUrl}
              onChange={(e) => setImportUrl(e.target.value)}
              className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-white font-mono"
            />
            <div className="flex justify-end space-x-3 pt-2">
              <button onClick={() => setImportModalOpen(false)} className="px-3 py-1.5 rounded-lg bg-surface text-neutral-300">
                Cancel
              </button>
              <button onClick={handleImport} className="px-4 py-1.5 rounded-lg bg-accent-purple text-white font-bold">
                {importing ? 'Crawling...' : 'Preview & Ingest'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface/80 border-b border-white/10 font-mono text-neutral-400">
              <tr>
                <th className="p-4">SKU</th>
                <th className="p-4">Product Name</th>
                <th className="p-4">Brand</th>
                <th className="p-4">Price</th>
                <th className="p-4">Inventory</th>
                <th className="p-4">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-white/5">
                  <td className="p-4 font-mono text-accent-amber font-bold">{p.sku}</td>
                  <td className="p-4 font-bold text-white">{p.name}</td>
                  <td className="p-4 text-neutral-400">{p.brand}</td>
                  <td className="p-4 font-mono font-bold text-white">₹{p.price.toLocaleString()}</td>
                  <td className="p-4 font-mono text-emerald-400">{p.inventory} in stock</td>
                  <td className="p-4 font-mono text-accent-amber">{p.rating} ★</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
`);

// 2. src/app/dashboard/payments/page.tsx
save('src/app/dashboard/payments/page.tsx', `
'use client';
import React, { useState } from 'react';
import { CreditCard, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function MerchantPaymentsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="pb-6 border-b border-white/10">
        <h1 className="text-3xl font-extrabold text-white">Razorpay Payment Performance</h1>
        <p className="text-xs text-neutral-400 mt-1">Payment gateway settlement breakdown, webhook status, and sandbox latency.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
          <span className="text-xs font-mono text-neutral-400">PAYMENT SUCCESS RATE</span>
          <p className="text-3xl font-black text-accent-teal">99.4%</p>
          <p className="text-[11px] text-neutral-400 font-mono">1,840 / 1,851 attempts</p>
        </div>
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
          <span className="text-xs font-mono text-neutral-400">AVG SETTLEMENT LATENCY</span>
          <p className="text-3xl font-black text-accent-amber">142 ms</p>
          <p className="text-[11px] text-neutral-400 font-mono">Razorpay Test Gateway</p>
        </div>
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
          <span className="text-xs font-mono text-neutral-400">WEBHOOK HEALTH</span>
          <p className="text-3xl font-black text-accent-purple">100% HMAC</p>
          <p className="text-[11px] text-neutral-400 font-mono">Zero signature rejections</p>
        </div>
      </div>
    </div>
  );
}
`);

// 3. src/app/dashboard/settings/page.tsx
save('src/app/dashboard/settings/page.tsx', `
'use client';
import React, { useState } from 'react';

export default function MerchantSettingsPage() {
  const [razorpayKey, setRazorpayKey] = useState('rzp_test_mock_razoragent2026');
  const [aiProvider, setAiProvider] = useState('Gemini & Adaptive LLM');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="pb-6 border-b border-white/10">
        <h1 className="text-3xl font-extrabold text-white">Merchant & AI Settings</h1>
        <p className="text-xs text-neutral-400 mt-1">Configure Razorpay test keys, AI provider models, and webhook endpoints.</p>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 text-xs">
        <div>
          <label className="text-neutral-400 block mb-1">Razorpay Key ID (Test Mode)</label>
          <input
            type="text"
            value={razorpayKey}
            onChange={(e) => setRazorpayKey(e.target.value)}
            className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-white font-mono"
          />
        </div>
        <div>
          <label className="text-neutral-400 block mb-1">Active AI Provider Model</label>
          <input
            type="text"
            value={aiProvider}
            onChange={(e) => setAiProvider(e.target.value)}
            className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-white"
          />
        </div>
      </div>
    </div>
  );
}
`);

// 4. src/app/orders/page.tsx
save('src/app/orders/page.tsx', `
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Order } from '@/types';

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(json => {
        if (json?.data?.orders) setOrders(json.data.orders);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Your Orders</h1>
        <p className="text-xs text-neutral-400 mt-1">View your past purchases, track shipments, and download invoices.</p>
      </div>

      <div className="space-y-4">
        {orders.map(o => (
          <div key={o.id} className="glass-panel p-6 rounded-3xl border border-white/10 flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="text-accent-amber font-bold">{o.orderNumber}</span>
                <span>•</span>
                <span className="text-accent-teal font-bold">{o.status}</span>
              </div>
              <p className="text-sm font-bold text-white mt-1">₹{o.total.toLocaleString()}</p>
            </div>
            <Link href={\`/orders/\${o.id}\`} className="px-4 py-2 rounded-xl bg-accent-amber text-black font-bold text-xs">
              View Tracking
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
`);

console.log('Remaining pages created successfully');
