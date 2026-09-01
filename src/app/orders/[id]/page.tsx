'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function OrderDetailPage() {
  const params = useParams();
  const id = params?.id;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/orders?id=${id}`)
      .then(res => res.json())
      .then(json => {
        if (json?.data) setOrder(json.data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="max-w-4xl mx-auto p-12 text-center text-neutral-400 font-mono">Loading order tracking...</div>;
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Order not found</h2>
        <Link href="/shop" className="px-4 py-2 rounded-xl bg-accent-amber text-black font-bold text-xs">
          Return to Shop
        </Link>
      </div>
    );
  }

  const steps = [
    { label: 'AI Order Created' },
    { label: 'Razorpay Payment Captured' },
    { label: 'Warehouse Pick & Pack' },
    { label: 'In Transit' },
    { label: 'Delivered' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="glass-panel-glow p-8 rounded-3xl border border-accent-teal/40 space-y-3">
        <div className="flex items-center space-x-2 text-accent-teal font-mono text-xs font-bold">
          <CheckCircle2 className="w-5 h-5" />
          <span>ORDER CONFIRMED & PAID</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Order {order.orderNumber}</h1>
        <p className="text-xs text-neutral-400 font-mono">
          Settled via Razorpay Sandbox ({order.paymentMethod || 'UPI'}) • Total: ₹{order.total.toLocaleString()}
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Fulfillment Status</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          {steps.map((step, idx) => (
            <div key={idx} className="p-3 rounded-2xl bg-surface/60 border border-white/5 space-y-2">
              <div className="w-8 h-8 rounded-full bg-accent-teal/20 text-accent-teal flex items-center justify-center mx-auto text-xs font-bold">
                ✓
              </div>
              <p className="text-[11px] font-bold text-white">{step.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Purchased Bundled Items</h3>
        <div className="space-y-3">
          {order.items.map(item => (
            <div key={item.id} className="flex items-center justify-between p-3 rounded-2xl bg-surface/40 border border-white/5 text-xs">
              <div>
                <p className="font-bold text-white">{item.productName}</p>
                <p className="text-neutral-400 font-mono text-[11px]">Qty: {item.quantity} × ₹{item.unitPrice.toLocaleString()}</p>
              </div>
              <span className="font-mono font-bold text-white">₹{item.totalPrice.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center pt-4">
        <Link href="/shop" className="px-5 py-2.5 rounded-xl bg-surface border border-white/10 text-xs font-bold text-white hover:border-white/20">
          Continue Shopping
        </Link>
        <Link href="/dashboard/orders" className="px-5 py-2.5 rounded-xl bg-accent-amber text-black font-bold text-xs">
          View in Merchant Console
        </Link>
      </div>
    </div>
  );
}
