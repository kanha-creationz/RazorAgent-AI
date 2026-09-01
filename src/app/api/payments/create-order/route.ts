
import { NextRequest, NextResponse } from 'next/server';
import { PaymentGatewayService } from '@/lib/payments/razorpay';
import { checkRateLimit } from '@/lib/security/rateLimiter';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
  const rate = checkRateLimit(`pay_order_${ip}`, 20, 60000);
  if (!rate.allowed) {
    return NextResponse.json({
      success: false,
      requestId: 'req_rl_' + Date.now(),
      timestamp: new Date().toISOString(),
      data: null,
      error: { code: 'RATE_LIMITED', message: 'Payment rate limit exceeded.' }
    }, { status: 429 });
  }

  try {
    const body = await req.json();
    const { amount, orderId, userId, userEmail, idempotencyKey } = body;

    if (!amount || !orderId) {
      return NextResponse.json({
        success: false,
        requestId: 'req_err_' + Date.now(),
        timestamp: new Date().toISOString(),
        data: null,
        error: { code: 'INVALID_PARAMS', message: 'Amount and orderId are required.' }
      }, { status: 400 });
    }

    const result = await PaymentGatewayService.createRazorpayOrder({
      amount: Number(amount),
      orderId,
      userId,
      userEmail,
      idempotencyKey
    });

    return NextResponse.json({
      success: true,
      requestId: 'req_pay_' + Date.now(),
      timestamp: new Date().toISOString(),
      data: result,
      error: null
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      requestId: 'req_err_' + Date.now(),
      timestamp: new Date().toISOString(),
      data: null,
      error: { code: 'PAYMENT_CREATION_FAILED', message: err.message }
    }, { status: 500 });
  }
}
