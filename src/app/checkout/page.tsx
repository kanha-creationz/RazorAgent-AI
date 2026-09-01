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
          router.push(`/orders/${order.id}`);
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
        router.push(`/orders/${order.id}`);
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
                  className={`px-3 py-1.5 rounded-xl font-mono text-[11px] transition-all ${
                    failureScenario === opt.id
                      ? 'bg-accent-purple text-white font-bold'
                      : 'bg-surface border border-white/10 text-neutral-400'
                  }`}
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
