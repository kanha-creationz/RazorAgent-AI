'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Order } from '@/types';

export default function MerchantOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(json => {
        if (json?.data?.orders) setOrders(json.data.orders);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="pb-6 border-b border-white/10">
        <h1 className="text-3xl font-extrabold text-white">Merchant Order Stream</h1>
        <p className="text-xs text-neutral-400 mt-1">Live customer and AI buyer orders settled via Razorpay Sandbox.</p>
      </div>

      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="font-bold text-accent-amber">{order.orderNumber}</span>
                <span>•</span>
                <span className="text-neutral-400">{new Date(order.createdAt).toLocaleDateString()}</span>
                <span>•</span>
                <span className="text-accent-teal font-bold">{order.status}</span>
              </div>
              <h3 className="font-bold text-white text-sm mt-1">{order.userName} ({order.userEmail})</h3>
              <p className="text-xs text-neutral-400 mt-0.5">{order.items.length} item(s) • Total: ₹{order.total.toLocaleString()}</p>
            </div>

            <Link
              href={`/orders/${order.id}`}
              className="px-4 py-2 rounded-xl bg-surface border border-white/10 hover:border-accent-amber text-xs font-bold text-white"
            >
              Track Order
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
