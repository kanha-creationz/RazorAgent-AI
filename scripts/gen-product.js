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

save('src/app/product/[slug]/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Star, ShoppingCart, Bot, ArrowRight, Check, ArrowLeft } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;

  const [product, setProduct] = useState(null);
  const [upsellProduct, setUpsellProduct] = useState(null);
  const [crossSellItems, setCrossSellItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch('/api/products')
      .then(res => res.json())
      .then(json => {
        if (json?.data?.products) {
          const found = json.data.products.find(p => p.slug === slug || p.id === slug);
          if (found) {
            setProduct(found);
            setSelectedImage(found.images[0]);
            if (found.upSellProducts?.length) {
              const up = json.data.products.find(p => found.upSellProducts.includes(p.id));
              if (up) setUpsellProduct(up);
            }
            if (found.crossSellProducts?.length) {
              const cross = json.data.products.filter(p => found.crossSellProducts.includes(p.id));
              setCrossSellItems(cross);
            }
          }
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const handleAddToCart = async (id) => {
    const targetId = id || product?.id;
    if (!targetId) return;

    await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: targetId, quantity: 1, action: 'ADD' })
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return <div className="max-w-7xl mx-auto p-12 text-center text-neutral-400 font-mono">Loading product details...</div>;
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Product Not Found</h2>
        <Link href="/shop" className="px-4 py-2 rounded-xl bg-accent-amber text-black font-bold text-xs inline-block">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Link href="/shop" className="inline-flex items-center space-x-2 text-xs font-mono text-neutral-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to catalog</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          <div className="aspect-video w-full rounded-3xl overflow-hidden glass-panel border border-white/10 bg-black/40">
            <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={\`w-24 h-16 rounded-xl overflow-hidden border transition-all \${
                  selectedImage === img ? 'border-accent-amber ring-2 ring-accent-amber/20' : 'border-white/10 opacity-70 hover:opacity-100'
                }\`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-3 text-xs text-neutral-400 mb-2">
              <span className="font-mono font-bold text-accent-amber">{product.brand}</span>
              <span>•</span>
              <span className="font-mono text-neutral-500">SKU: {product.sku}</span>
              <span>•</span>
              <div className="flex items-center space-x-1 text-accent-amber">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-neutral-500">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {product.name}
            </h1>

            <p className="mt-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-white/10 flex items-center justify-between">
            <div>
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-black text-white">₹{product.price.toLocaleString()}</span>
                {product.compareAtPrice && (
                  <span className="text-sm text-neutral-500 line-through">₹{product.compareAtPrice.toLocaleString()}</span>
                )}
              </div>
              <p className="text-[11px] text-accent-teal font-mono mt-1">
                ✓ Inclusive of all taxes • In Stock ({product.inventory} units)
              </p>
            </div>

            <button
              onClick={() => handleAddToCart()}
              className="px-6 py-3.5 rounded-xl bg-accent-amber hover:bg-accent-amber-light text-black font-extrabold text-xs shadow-lg shadow-accent-amber/25 transition-all flex items-center space-x-2"
            >
              {added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
              <span>{added ? 'Added!' : 'Add to Cart'}</span>
            </button>
          </div>

          {upsellProduct && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-accent-purple/10 to-accent-amber/10 border border-accent-purple/30 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-accent-purple">⚡ AI SMART UPGRADE</span>
                <span className="text-neutral-400 font-mono text-[11px]">
                  +₹{(upsellProduct.price - product.price).toLocaleString()}
                </span>
              </div>
              <h4 className="text-xs font-bold text-white">{upsellProduct.name}</h4>
              <button
                onClick={() => router.push(\`/product/\${upsellProduct.slug}\`)}
                className="text-xs font-bold text-accent-amber hover:underline flex items-center space-x-1 pt-1"
              >
                <span>View Higher Spec Configuration</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}

          <Link
            href={\`/ai?q=Tell+me+about+\${encodeURIComponent(product.name)}\`}
            className="w-full py-3 rounded-xl bg-surface border border-white/10 hover:border-accent-amber/40 text-neutral-300 hover:text-white text-xs font-bold flex items-center justify-center space-x-2 transition-all"
          >
            <Bot className="w-4 h-4 text-accent-amber" />
            <span>Ask Commerce Copilot about this SKU</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Key Highlights</h3>
          <ul className="space-y-2 text-xs text-neutral-300">
            {product.features.map((f, i) => (
              <li key={i} className="flex items-center space-x-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-amber" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Technical Specifications</h3>
          <div className="space-y-2 text-xs">
            {Object.entries(product.specifications).map(([key, val], idx) => (
              <div key={idx} className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-neutral-400">{key}</span>
                <span className="font-medium text-white font-mono">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
`);
console.log('Product page saved');
