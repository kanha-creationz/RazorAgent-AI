
import { AuditLog } from '@/types';
import { eventBus } from '@/lib/events/eventBus';

class AuditService {
  private auditRecords: AuditLog[] = [
    {
      id: 'aud_init_01',
      auditId: 'AUD-2026-908123',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      userId: 'usr_customer_01',
      userName: 'Elena Rostova (AI Buyer)',
      agentId: 'agent_copilot_v2',
      sessionId: 'sess_init_01',
      action: 'AI_SEARCH_DISCOVERY',
      tool: 'search_products',
      inputSummary: 'Query: "college setup under 60000"',
      outputSummary: 'Found 3 matching bundles (SwiftAir 14, AeroGlide Mouse, AcousticPure Flow)',
      status: 'SUCCESS',
      amount: 55397,
      approvalRequired: false,
      approvalStatus: 'APPROVED',
      ipHash: 'hash_9a8b1c'
    },
    {
      id: 'aud_init_02',
      auditId: 'AUD-2026-908124',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      userId: 'usr_customer_01',
      userName: 'Elena Rostova (AI Buyer)',
      agentId: 'agent_copilot_v2',
      sessionId: 'sess_init_01',
      action: 'CART_CREATION_BOUNDED',
      tool: 'calculate_cart',
      inputSummary: 'Calculated 3 items with STUDENT10 coupon',
      outputSummary: 'Subtotal ₹55,397 - ₹5,539 (Discount) + ₹3,988 (Tax) = ₹53,846',
      status: 'REQUIRES_APPROVAL',
      amount: 53846,
      approvalRequired: true,
      approvalStatus: 'APPROVED',
      ipHash: 'hash_9a8b1c'
    }
  ];

  public log(entry: Omit<AuditLog, 'id' | 'auditId' | 'timestamp'> & { auditId?: string }): AuditLog {
    const record: AuditLog = {
      id: 'aud_' + Math.random().toString(36).substring(2, 9),
      auditId: entry.auditId || 'AUD-2026-' + Math.floor(100000 + Math.random() * 900000),
      timestamp: new Date().toISOString(),
      ...entry,
    };

    this.auditRecords.unshift(record);

    // Emit live server log
    eventBus.addLog({
      method: 'AUDIT',
      endpoint: '/api/audit/' + record.action,
      statusCode: record.status === 'SUCCESS' ? 200 : record.status === 'REQUIRES_APPROVAL' ? 202 : 400,
      responseTimeMs: 8,
      category: 'SECURITY',
      message: `Audit logged: ${record.action} | Status: ${record.status} | Amount: ₹${record.amount || 0}`
    });

    return record;
  }

  public getLogs(filter?: { userId?: string; action?: string; status?: string; search?: string }): AuditLog[] {
    let logs = [...this.auditRecords];
    if (filter?.userId) {
      logs = logs.filter(l => l.userId === filter.userId);
    }
    if (filter?.status && filter.status !== 'ALL') {
      logs = logs.filter(l => l.status === filter.status);
    }
    if (filter?.action && filter.action !== 'ALL') {
      logs = logs.filter(l => l.action.toLowerCase().includes(filter.action!.toLowerCase()));
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      logs = logs.filter(l =>
        l.auditId.toLowerCase().includes(q) ||
        l.action.toLowerCase().includes(q) ||
        (l.inputSummary && l.inputSummary.toLowerCase().includes(q)) ||
        (l.userName && l.userName.toLowerCase().includes(q))
      );
    }
    return logs;
  }
}

const globalForAudit = global as unknown as { auditService: AuditService };
export const auditService = globalForAudit.auditService || new AuditService();
if (process.env.NODE_ENV !== 'production') globalForAudit.auditService = auditService;
