
import { NextRequest, NextResponse } from 'next/server';
import { auditService } from '@/lib/audit/auditLogger';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') || undefined;
  const action = searchParams.get('action') || undefined;
  const search = searchParams.get('search') || undefined;

  const logs = auditService.getLogs({ status, action, search });

  return NextResponse.json({
    success: true,
    requestId: 'req_audit_' + Date.now(),
    timestamp: new Date().toISOString(),
    data: {
      logs,
      total: logs.length
    },
    error: null
  });
}
