'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ComparePage() {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>(['prod_01', 'prod_03']);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(json => {
        if (json?.data?.products) {
          setAllProducts(json.data.products);
        }
      });
  }, []);

  const comparedProducts = allProducts.filter(p => selectedIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Product Comparison Matrix</h1>
        <p className="text-xs text-neutral-400 mt-1">Side-by-side technical evaluation with AI difference explainability.</p>
      </div>

      <div className="flex flex-wrap gap-2 pb-4 border-b border-white/10">
        {allProducts.slice(0, 6).map(p => (
          <button
            key={p.id}
            onClick={() => {
              if (selectedIds.includes(p.id)) {
                if (selectedIds.length > 1) setSelectedIds(selectedIds.filter(id => id !== p.id));
              } else {
                if (selectedIds.length < 3) setSelectedIds([...selectedIds, p.id]);
              }
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
              selectedIds.includes(p.id)
                ? 'bg-accent-amber text-black font-bold'
                : 'bg-surface border border-white/10 text-neutral-400 hover:text-white'
            }`}
          >
            {p.name.split(' ')[1] || p.name.substring(0, 15)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {comparedProducts.map(p => (
          <div key={p.id} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="aspect-video rounded-2xl overflow-hidden bg-black/40">
                <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-accent-amber uppercase">{p.brand}</span>
                <h3 className="text-base font-bold text-white mt-1">{p.name}</h3>
                <p className="text-2xl font-black text-white mt-2">₹{p.price.toLocaleString()}</p>
              </div>

              <div className="space-y-2 text-xs border-t border-white/10 pt-4">
                <div className="flex justify-between text-neutral-400">
                  <span>Rating</span>
                  <span className="text-accent-amber font-bold">{p.rating} / 5.0</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Stock</span>
                  <span className="text-emerald-400 font-mono">{p.inventory} available</span>
                </div>
                {Object.entries(p.specifications || {}).map(([k, v], idx) => (
                  <div key={idx} className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-neutral-400">{k}</span>
                    <span className="text-white font-mono text-right max-w-[60%]">{String(v)}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href={`/product/${p.slug}`}
              className="w-full py-2.5 rounded-xl bg-accent-amber text-black font-bold text-xs text-center block hover:bg-accent-amber-light"
            >
              View Full Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
