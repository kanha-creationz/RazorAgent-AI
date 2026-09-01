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

save('src/app/shop/page.tsx', `
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Bot, Sliders, Code, Star, ShoppingCart } from 'lucide-react';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(250000);
  const [loading, setLoading] = useState(true);
  const [agentJsonView, setAgentJsonView] = useState(false);
  const [agentJsonData, setAgentJsonData] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchQuery, maxPrice]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url = \`/api/products?category=\${selectedCategory}&q=\${encodeURIComponent(searchQuery)}&maxPrice=\${maxPrice}\`;
      const res = await fetch(url);
      const json = await res.json();
      if (json?.data) {
        setProducts(json.data.products || []);
        setCategories(json.data.categories || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchAgentJson = async () => {
    try {
      const res = await fetch('/api/products?agent=true');
      const json = await res.json();
      setAgentJsonData(json);
      setAgentJsonView(true);
    } catch (e) {
      console.error(e);
    }
  };

  const addToCart = async (productId) => {
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity: 1, action: 'ADD' })
      });
      const data = await res.json();
      if (data.success) {
        setToastMessage('Added to cart!');
        setTimeout(() => setToastMessage(null), 2500);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent-amber/10 border border-accent-amber/20 text-xs font-mono text-accent-amber mb-2">
            <Bot className="w-3.5 h-3.5" />
            <span>Agent-Readable Verified Catalog</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Smart Product Catalog</h1>
          <p className="text-xs text-neutral-400 mt-1">Browse live merchant hardware and AI developer setups.</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchAgentJson}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-surface border border-white/10 text-xs font-mono text-neutral-300 hover:text-white"
          >
            <Code className="w-4 h-4 text-accent-purple" />
            <span>Agent JSON Feed</span>
          </button>
          <Link
            href="/compare"
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-surface border border-white/10 text-xs font-semibold text-neutral-300 hover:text-white"
          >
            <Sliders className="w-4 h-4 text-accent-amber" />
            <span>Compare Models</span>
          </Link>
        </div>
      </div>

      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 px-4 py-2.5 rounded-xl bg-accent-teal text-black font-bold text-xs shadow-lg">
          {toastMessage}
        </div>
      )}

      {agentJsonView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-3xl max-h-[80vh] glass-panel-glow rounded-3xl p-6 flex flex-col border border-accent-purple/40">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="font-bold text-sm text-white">Agent Catalog Schema Endpoint (/api/products?agent=true)</h3>
              <button onClick={() => setAgentJsonView(false)} className="text-neutral-400 hover:text-white text-xs font-mono">
                Close [ESC]
              </button>
            </div>
            <pre className="flex-1 overflow-auto p-4 bg-black/60 rounded-2xl text-[11px] font-mono text-emerald-400 mt-4">
              {JSON.stringify(agentJsonData, null, 2)}
            </pre>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-6 glass-panel p-5 rounded-2xl border border-white/10 h-fit">
          <div>
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 block mb-3">Search</label>
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Keywords or specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-accent-amber"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 block mb-3">Categories</label>
            <div className="space-y-1.5 text-xs">
              <button
                onClick={() => setSelectedCategory('all')}
                className={\`w-full text-left px-3 py-2 rounded-xl \${selectedCategory === 'all' ? 'bg-accent-amber text-black font-bold' : 'text-neutral-400 hover:bg-white/5'}\`}
              >
                All Categories
              </button>
              {categories.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={\`w-full text-left px-3 py-2 rounded-xl \${selectedCategory === c.id ? 'bg-accent-amber text-black font-bold' : 'text-neutral-400 hover:bg-white/5'}\`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-mono font-bold text-neutral-300">Max Budget</span>
              <span className="font-mono text-accent-amber font-bold">₹{maxPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="2000"
              max="250000"
              step="5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-accent-amber"
            />
          </div>
        </div>

        <div className="md:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(n => (
                <div key={n} className="glass-panel rounded-2xl h-80 animate-pulse bg-white/5" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <div
                  key={product.id}
                  className="glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-accent-amber/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <Link href={\`/product/\${product.slug}\`} className="block relative aspect-video overflow-hidden bg-black/40">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </Link>

                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-neutral-400">
                        <span className="font-mono">{product.brand}</span>
                        <div className="flex items-center space-x-1 text-accent-amber">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{product.rating}</span>
                        </div>
                      </div>

                      <Link href={\`/product/\${product.slug}\`} className="block">
                        <h3 className="font-bold text-sm text-white group-hover:text-accent-amber line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-neutral-400 line-clamp-2">{product.shortDescription}</p>
                    </div>
                  </div>

                  <div className="p-4 pt-0 border-t border-white/5 flex items-center justify-between mt-3">
                    <div>
                      <p className="text-base font-extrabold text-white">₹{product.price.toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="p-2.5 rounded-xl bg-accent-amber text-black hover:bg-accent-amber-light font-bold text-xs flex items-center space-x-1"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
`);
console.log('Shop page saved');
