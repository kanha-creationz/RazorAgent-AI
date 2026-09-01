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

// 1. src/app/compare/page.tsx
save('src/app/compare/page.tsx', `
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ComparePage() {
  const [allProducts, setAllProducts] = useState([]);
  const [selectedIds, setSelectedIds] = useState(['prod_01', 'prod_03']);

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
            className={\`px-3 py-1.5 rounded-xl text-xs font-mono transition-all \${
              selectedIds.includes(p.id)
                ? 'bg-accent-amber text-black font-bold'
                : 'bg-surface border border-white/10 text-neutral-400 hover:text-white'
            }\`}
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
                    <span className="text-white font-mono text-right max-w-[60%]">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href={\`/product/\${p.slug}\`}
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
`);

// 2. src/app/cart/page.tsx
save('src/app/cart/page.tsx', `
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
                <span>{cart.shipping === 0 ? 'FREE' : \`₹\${cart.shipping}\`}</span>
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
`);

// 3. src/app/checkout/page.tsx
save('src/app/checkout/page.tsx', `
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, CreditCard, RefreshCw, Lock } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [approvedGate, setApprovedGate] = useState(false);
  const [failureScenario, setFailureScenario] = useState('NONE');
  const [failureMessage, setFailureMessage] = useState(null);

  const [fullName, setFullName] = useState('Elena Rostova');
  const [address, setAddress] = useState('Tech Residency, Tower B, 4th Floor');
  const [city, setCity] = useState('Bengaluru');

  useEffect(() => {
    fetch('/api/cart')
      .then(res => res.json())
      .then(json => {
        if (json?.data) setCart(json.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const initiatePayment = async () => {
    if (!cart || cart.items.length === 0) return;
    setProcessing(true);
    setFailureMessage(null);

    try {
      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shippingAddress: { fullName, addressLine1: address, city, state: 'Karnataka', postalCode: '560100', country: 'India', phone: '+91 98765 43210' },
          paymentMethod: 'UPI',
          isAiAssisted: true
        })
      });
      const orderData = await orderRes.json();
      const order = orderData.data;

      if (failureScenario === 'INVENTORY_DROP') {
        setFailureMessage('Graceful Recovery: Inventory changed before checkout. AI recommends swapping with identical stock alternative.');
        setProcessing(false);
        return;
      }

      if (failureScenario === 'TIMEOUT') {
        setFailureMessage('Payment Timeout Detected. Idempotency safeguard prevented double charge. Polling order status safely...');
        setTimeout(() => {
          setFailureMessage('Safely verified transaction status via webhook. Transitioning order...');
          router.push(\`/orders/\${order.id}\`);
        }, 3000);
        return;
      }

      const payOrderRes = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: order.total, orderId: order.id, userEmail: 'customer@razoragent.ai' })
      });
      const payOrderData = await payOrderRes.json();

      const verifyRes = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          razorpayOrderId: payOrderData.data.razorpayOrderId,
          razorpayPaymentId: 'pay_test_succ_' + Math.random().toString(36).substring(2, 8),
          razorpaySignature: 'sig_mock_verified_hmac_2026',
          method: 'UPI'
        })
      });
      const verifyData = await verifyRes.json();

      if (verifyData.success) {
        router.push(\`/orders/\${order.id}\`);
      }
    } catch (e) {
      setFailureMessage(e.message || 'Payment initiation failed.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return <div className="max-w-4xl mx-auto p-12 text-center text-neutral-400 font-mono">Loading checkout...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Autonomous Checkout</h1>
        <p className="text-xs text-neutral-400 mt-1">Explainable permission gated payment orchestration via Razorpay Test Sandbox.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Delivery Coordinates</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-neutral-400 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-accent-amber"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-accent-amber"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-neutral-400 block mb-1">Address Line</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-accent-amber"
                />
              </div>
            </div>
          </div>

          <div className="glass-panel-glow p-6 rounded-3xl border border-accent-amber/40 space-y-4">
            <div className="flex items-center space-x-2 text-accent-amber text-xs font-bold font-mono">
              <Lock className="w-4 h-4" />
              <span>EXPLAINABLE FINANCIAL PERMISSION GATE</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              AI prepared a bounded transaction of <strong className="text-white">₹{cart?.total?.toLocaleString()}</strong> containing {cart?.items?.length} verified item(s).
              No funds can be deducted without your explicit authorization.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <input
                type="checkbox"
                id="gate-check"
                checked={approvedGate}
                onChange={(e) => setApprovedGate(e.target.checked)}
                className="w-4 h-4 accent-accent-amber rounded cursor-pointer"
              />
              <label htmlFor="gate-check" className="text-xs font-semibold text-white cursor-pointer select-none">
                I approve this transaction in Razorpay Test Mode
              </label>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-neutral-300">Hackathon Failure Recovery Simulator</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-neutral-400">CONTROLS</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { id: 'NONE', label: 'Normal Flow (Success)' },
                { id: 'TIMEOUT', label: 'Simulate Timeout' },
                { id: 'INVENTORY_DROP', label: 'Simulate Stock Shift' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setFailureScenario(opt.id)}
                  className={\`px-3 py-1.5 rounded-xl font-mono text-[11px] transition-all \${
                    failureScenario === opt.id
                      ? 'bg-accent-purple text-white font-bold'
                      : 'bg-surface border border-white/10 text-neutral-400'
                  }\`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {failureMessage && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 font-mono">
              {failureMessage}
            </div>
          )}
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6 h-fit">
          <h3 className="text-base font-bold text-white">Summary ({cart?.items?.length} items)</h3>
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cart?.items?.map(i => (
              <div key={i.id} className="flex justify-between text-xs">
                <span className="text-neutral-300 line-clamp-1">{i.quantity}x {i.product.name}</span>
                <span className="text-white font-mono font-bold">₹{i.totalPrice.toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-4 space-y-2 text-xs font-mono">
            <div className="flex justify-between text-neutral-400">
              <span>Subtotal</span>
              <span>₹{cart?.subtotal?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>GST Tax</span>
              <span>₹{cart?.tax?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/10">
              <span>Total Payable</span>
              <span className="text-accent-amber">₹{cart?.total?.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={initiatePayment}
            disabled={!approvedGate || processing}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-accent-amber to-accent-amber-light text-black font-extrabold text-xs shadow-xl shadow-accent-amber/25 disabled:opacity-40 hover:opacity-95 transition-all flex items-center justify-center space-x-2"
          >
            {processing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
            <span>{processing ? 'Processing Sandbox Payment...' : 'Authorize & Pay (Test Mode)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
`);

// 4. src/app/orders/[id]/page.tsx
save('src/app/orders/[id]/page.tsx', `
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
    fetch(\`/api/orders?id=\${id}\`)
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
`);

console.log('Commerce pages batch saved');
