
import { NextRequest, NextResponse } from 'next/server';
import { mockDb } from '@/lib/db/mockDb';

export async function GET(req: NextRequest) {
  const totalRevenue = mockDb.orders.reduce((sum, o) => sum + (o.status === 'PAID' ? o.total : 0), 0);
  const aiRevenue = mockDb.orders.filter(o => o.isAiAssisted && o.status === 'PAID').reduce((sum, o) => sum + o.total, 0);

  const revenueOverTime = [
    { time: '10:00', revenue: 14500, aiAssisted: 12000, orders: 3 },
    { time: '11:00', revenue: 32000, aiAssisted: 28000, orders: 6 },
    { time: '12:00', revenue: 58000, aiAssisted: 48000, orders: 11 },
    { time: '13:00', revenue: 84000, aiAssisted: 72000, orders: 15 },
    { time: '14:00', revenue: 112000, aiAssisted: 96000, orders: 21 },
    { time: '15:00', revenue: 148000, aiAssisted: 125000, orders: 28 },
    { time: '16:00', revenue: totalRevenue + 12000, aiAssisted: aiRevenue + 8000, orders: mockDb.orders.length + 4 }
  ];

  const conversionFunnel = [
    { stage: 'Catalog Visitors', count: 14200, percentage: 100 },
    { stage: 'AI Shopping Queries', count: 8640, percentage: 60.8 },
    { stage: 'Product Recommendations', count: 6820, percentage: 48.0 },
    { stage: 'AI Cart Generation', count: 3410, percentage: 24.0 },
    { stage: 'Checkout Initiated', count: 2180, percentage: 15.3 },
    { stage: 'Paid Orders (Razorpay)', count: 1840, percentage: 12.9 }
  ];

  const paymentMethodsBreakdown = [
    { name: 'UPI (GPay / PhonePe / QR)', percentage: 64, amount: Math.round(totalRevenue * 0.64) },
    { name: 'Cards (Credit & Debit)', percentage: 24, amount: Math.round(totalRevenue * 0.24) },
    { name: 'Net Banking', percentage: 8, amount: Math.round(totalRevenue * 0.08) },
    { name: 'Wallets & PayLater', percentage: 4, amount: Math.round(totalRevenue * 0.04) }
  ];

  return NextResponse.json({
    success: true,
    requestId: 'req_analytics_' + Date.now(),
    timestamp: new Date().toISOString(),
    data: {
      metrics: {
        totalRevenue,
        totalOrders: mockDb.orders.length,
        averageOrderValue: mockDb.orders.length > 0 ? Math.round(totalRevenue / mockDb.orders.length) : 0,
        conversionRate: 12.9,
        aiAssistedOrders: mockDb.orders.filter(o => o.isAiAssisted).length,
        aiRevenueAttribution: aiRevenue,
        aiRevenueSharePercentage: totalRevenue > 0 ? Math.round((aiRevenue / totalRevenue) * 100) : 85,
        cartRecoveryRate: 42.5,
        crossSellRevenue: Math.round(totalRevenue * 0.28),
        upsellRevenue: Math.round(totalRevenue * 0.34)
      },
      revenueOverTime,
      conversionFunnel,
      paymentMethodsBreakdown,
      topProducts: mockDb.products.slice(0, 4)
    },
    error: null
  });
}
