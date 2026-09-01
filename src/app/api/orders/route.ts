
import { NextRequest, NextResponse } from 'next/server';
import { mockDb } from '@/lib/db/mockDb';
import { auditService } from '@/lib/audit/auditLogger';
import { eventBus } from '@/lib/events/eventBus';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (id) {
    const order = mockDb.orders.find(o => o.id === id || o.orderNumber === id);
    if (!order) {
      return NextResponse.json({ success: false, error: { code: 'ORDER_NOT_FOUND', message: 'Order not found' } }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: order });
  }

  return NextResponse.json({
    success: true,
    requestId: 'req_orders_' + Date.now(),
    timestamp: new Date().toISOString(),
    data: {
      orders: mockDb.orders,
      total: mockDb.orders.length
    },
    error: null
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId = 'default_sess', shippingAddress, paymentMethod = 'UPI', isAiAssisted = false } = body;
    const cart = mockDb.getOrCreateCart(sessionId);

    if (cart.items.length === 0) {
      return NextResponse.json({ success: false, error: { code: 'EMPTY_CART', message: 'Cart is empty' } }, { status: 400 });
    }

    const orderNumber = 'NEX-ORD-' + Math.floor(10000 + Math.random() * 90000);
    const newOrder = {
      id: 'ord_' + Math.random().toString(36).substring(2, 9),
      orderNumber,
      userId: cart.userId || 'usr_customer_01',
      userEmail: 'customer@razoragent.ai',
      userName: shippingAddress?.fullName || 'Elena Rostova (AI Buyer)',
      subtotal: cart.subtotal,
      discount: cart.discount,
      tax: cart.tax,
      shipping: cart.shipping,
      total: cart.total,
      currency: 'INR',
      status: 'PENDING_PAYMENT' as any,
      paymentMethod: paymentMethod as any,
      isAiAssisted,
      items: cart.items.map(i => ({
        id: 'item_' + Math.random().toString(36).substring(2, 8),
        productId: i.productId,
        productName: i.product.name,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
        totalPrice: i.totalPrice,
        image: i.product.images[0]
      })),
      shippingAddress: shippingAddress || {
        fullName: 'Elena Rostova',
        addressLine1: 'Tech Hub Boulevard, Suite 402',
        city: 'Bengaluru',
        state: 'Karnataka',
        postalCode: '560100',
        country: 'India',
        phone: '+91 98765 43210'
      },
      timeline: [
        { status: 'CREATED' as any, timestamp: new Date().toISOString(), message: 'Order generated successfully.' },
        { status: 'PENDING_PAYMENT' as any, timestamp: new Date().toISOString(), message: 'Awaiting Razorpay sandbox test authorization.' }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mockDb.orders.unshift(newOrder);

    // Clear active cart items
    cart.items = [];
    mockDb.recalculateCart(cart);

    auditService.log({
      userId: newOrder.userId,
      orderId: newOrder.id,
      action: 'ORDER_CREATED_PENDING_PAYMENT',
      tool: 'create_order',
      inputSummary: `Order ${orderNumber} with ${newOrder.items.length} items`,
      outputSummary: `Total: ₹${newOrder.total}. Awaiting payment.`,
      status: 'SUCCESS',
      amount: newOrder.total,
      approvalRequired: false
    });

    eventBus.addLog({
      method: 'POST',
      endpoint: '/api/orders',
      statusCode: 201,
      responseTimeMs: 110,
      category: 'API',
      message: `Order created: ${orderNumber} for ₹${newOrder.total}`
    });

    return NextResponse.json({
      success: true,
      requestId: 'req_ord_' + Date.now(),
      timestamp: new Date().toISOString(),
      data: newOrder,
      error: null
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: { code: 'ORDER_CREATION_FAILED', message: err.message } }, { status: 500 });
  }
}
