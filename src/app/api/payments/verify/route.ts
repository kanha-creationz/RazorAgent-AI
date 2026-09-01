
import { NextRequest, NextResponse } from 'next/server';
import { PaymentGatewayService } from '@/lib/payments/razorpay';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature, method = 'UPI' } = body;

    const isValid = PaymentGatewayService.verifyPaymentSignature(
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    );

    if (!isValid) {
      return NextResponse.json({
        success: false,
        requestId: 'req_ver_err_' + Date.now(),
        timestamp: new Date().toISOString(),
        data: null,
        error: { code: 'INVALID_SIGNATURE', message: 'Razorpay HMAC signature verification failed.' }
      }, { status: 400 });
    }

    const updatedOrder = await PaymentGatewayService.processPaymentSuccess(
      orderId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      method
    );

    return NextResponse.json({
      success: true,
      requestId: 'req_ver_' + Date.now(),
      timestamp: new Date().toISOString(),
      data: { verified: true, order: updatedOrder },
      error: null
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      requestId: 'req_err_' + Date.now(),
      timestamp: new Date().toISOString(),
      data: null,
      error: { code: 'VERIFY_ERROR', message: err.message }
    }, { status: 500 });
  }
}
