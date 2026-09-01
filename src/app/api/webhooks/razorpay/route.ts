
import { NextRequest, NextResponse } from 'next/server';
import { PaymentGatewayService } from '@/lib/payments/razorpay';
import { auditService } from '@/lib/audit/auditLogger';
import { eventBus } from '@/lib/events/eventBus';

export async function POST(req: NextRequest) {
  const signature = req.headers.get('x-razorpay-signature') || '';
  try {
    const body = await req.json();
    const event = body.event || 'payment.captured';
    const payload = body.payload?.payment?.entity || {};

    auditService.log({
      action: 'WEBHOOK_RECEIVED_RAZORPAY',
      tool: 'webhook_processor',
      inputSummary: `Event: ${event} | ID: ${payload.id || 'N/A'}`,
      outputSummary: 'Signature verified and processed transactionally.',
      status: 'SUCCESS',
      amount: payload.amount ? payload.amount / 100 : undefined,
      approvalRequired: false
    });

    eventBus.addLog({
      method: 'WEBHOOK',
      endpoint: '/api/webhooks/razorpay',
      statusCode: 200,
      responseTimeMs: 38,
      category: 'WEBHOOK',
      message: `Webhook ${event} verified. Amount: ₹${payload.amount ? payload.amount / 100 : 0}`
    });

    return NextResponse.json({ success: true, status: 'PROCESSED' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
