
import { NextRequest, NextResponse } from 'next/server';
import { mockDb } from '@/lib/db/mockDb';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('sessionId') || 'default_sess';
  const cart = mockDb.getOrCreateCart(sessionId);
  return NextResponse.json({
    success: true,
    requestId: 'req_cart_' + Date.now(),
    timestamp: new Date().toISOString(),
    data: cart,
    error: null
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId = 'default_sess', productId, quantity = 1, couponCode, action = 'ADD' } = body;
    const cart = mockDb.getOrCreateCart(sessionId);

    if (action === 'ADD' && productId) {
      const product = mockDb.products.find(p => p.id === productId);
      if (!product) {
        return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Product not found' } }, { status: 404 });
      }
      const existing = cart.items.find(i => i.productId === productId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.items.push({
          id: 'ci_' + Math.random().toString(36).substring(2, 8),
          productId: product.id,
          product,
          quantity,
          unitPrice: product.price,
          totalPrice: product.price * quantity
        });
      }
    } else if (action === 'UPDATE' && productId) {
      const existing = cart.items.find(i => i.productId === productId);
      if (existing) {
        existing.quantity = Math.max(1, quantity);
      }
    } else if (action === 'REMOVE' && productId) {
      cart.items = cart.items.filter(i => i.productId !== productId);
    } else if (action === 'CLEAR') {
      cart.items = [];
    }

    const updated = mockDb.recalculateCart(cart, couponCode);
    return NextResponse.json({
      success: true,
      requestId: 'req_cart_upd_' + Date.now(),
      timestamp: new Date().toISOString(),
      data: updated,
      error: null
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: { code: 'CART_ERROR', message: err.message } }, { status: 500 });
  }
}
