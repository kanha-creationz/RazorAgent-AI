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
            <Link href={`/orders/${o.id}`} className="px-4 py-2 rounded-xl bg-accent-amber text-black font-bold text-xs">
              View Tracking
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
