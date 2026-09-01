
import { NextRequest, NextResponse } from 'next/server';
import { eventBus } from '@/lib/events/eventBus';
import { mockDb } from '@/lib/db/mockDb';

export async function GET(req: NextRequest) {
  const recentLogs = eventBus.getRecentLogs();
  return NextResponse.json({
    success: true,
    requestId: 'req_srv_' + Date.now(),
    timestamp: new Date().toISOString(),
    data: {
      serverStatus: 'HEALTHY',
      uptimeSec: process.uptime(),
      memoryUsageMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      activeSessions: 18,
      totalProducts: mockDb.products.length,
      totalOrders: mockDb.orders.length,
      recentLogs
    },
    error: null
  });
}
