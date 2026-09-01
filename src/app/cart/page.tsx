'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [coupon, setCoupon] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await fetch('/api/cart');
      const json = await res.json();
      if (json?.data) setCart(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity, action: 'UPDATE' })
    });
    const json = await res.json();
    if (json?.data) setCart(json.data);
  };

  const removeItem = async (productId) => {
    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, action: 'REMOVE' })
    });
    const json = await res.json();
    if (json?.data) setCart(json.data);
  };

  const applyCoupon = async () => {
    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ couponCode: coupon, action: 'UPDATE' })
    });
    const json = await res.json();
    if (json?.data) setCart(json.data);
  };

  if (loading) {
    return <div className="max-w-7xl mx-auto p-12 text-center text-neutral-400 font-mono">Loading cart...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Your Cart</h1>
        <p className="text-xs text-neutral-400 mt-1">Review your items and proceed to autonomous checkout.</p>
      </div>

      {!cart || cart.items.length === 0 ? (
        <div className="glass-panel p-16 rounded-3xl text-center space-y-4">
          <ShoppingBag className="w-12 h-12 text-neutral-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">Your cart is empty</h3>
          <div className="pt-2 flex justify-center space-x-3">
            <Link href="/shop" className="px-5 py-2.5 rounded-xl bg-accent-amber text-black font-bold text-xs">
              Browse Catalog
            </Link>
            <Link href="/ai" className="px-5 py-2.5 rounded-xl bg-surface border border-white/10 text-white font-bold text-xs">
              Ask AI Copilot
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map(item => (
              <div
                key={item.id}
                className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover bg-black/40"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-white line-clamp-1">{item.product.name}</h3>
                    <p className="text-xs font-mono text-accent-amber mt-0.5">₹{item.unitPrice.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 self-end sm:self-center">
                  <div className="flex items-center bg-surface border border-white/10 rounded-lg p-1 text-xs">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="px-2 py-0.5 text-neutral-400 hover:text-white"
                    >
                      -
                    </button>
                    <span className="px-3 font-mono text-white font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="px-2 py-0.5 text-neutral-400 hover:text-white"
                    >
                      +
                    </button>
                  </div>

                  <span className="font-extrabold text-sm text-white font-mono min-w-[80px] text-right">
                    ₹{item.totalPrice.toLocaleString()}
                  </span>

                  <button
                    onClick={() => removeItem(item.productId)}
                    className="p-1.5 text-neutral-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-panel-glow p-6 rounded-3xl border border-accent-amber/25 space-y-6 h-fit">
            <h3 className="text-base font-bold text-white">Order Calculation</h3>

            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Promo Code (e.g. STUDENT10)"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-1 bg-surface border border-white/10 rounded-xl px-3 py-2 text-xs text-white uppercase font-mono focus:outline-none focus:border-accent-amber"
              />
              <button
                onClick={applyCoupon}
                className="px-4 py-2 rounded-xl bg-surface border border-white/20 hover:border-accent-amber text-xs font-bold text-white"
              >
                Apply
              </button>
            </div>

            <div className="space-y-2 text-xs border-t border-white/10 pt-4 font-mono">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span>₹{cart.subtotal.toLocaleString()}</span>
              </div>
              {cart.discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Discount ({cart.couponCode})</span>
                  <span>-₹{cart.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-400">
                <span>GST Tax (8%)</span>
                <span>₹{cart.tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Express Shipping</span>
                <span>{cart.shipping === 0 ? 'FREE' : `₹${cart.shipping}`}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-white/10">
                <span>Verified Total</span>
                <span className="text-accent-amber">₹{cart.total.toLocaleString()}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-accent-amber to-accent-amber-light text-black font-extrabold text-xs flex items-center justify-center space-x-2 shadow-xl shadow-accent-amber/20 hover:opacity-95"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center space-x-2 text-[11px] text-neutral-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-accent-teal" />
              <span>Razorpay Sandbox Protected</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
