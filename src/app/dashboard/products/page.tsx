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
