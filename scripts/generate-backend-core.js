const fs = require('fs');
const path = require('path');

function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Created:', filePath);
}

// 1. src/lib/events/eventBus.ts
writeFile('src/lib/events/eventBus.ts', `
import { ServerEventLog } from '@/types';

type EventListener = (data: any) => void;

class GlobalEventBus {
  private listeners: Map<string, Set<EventListener>> = new Map();
  private recentLogs: ServerEventLog[] = [];
  private readonly MAX_LOGS = 100;

  constructor() {
    this.addLog({
      method: 'SYSTEM',
      endpoint: '/system/boot',
      statusCode: 200,
      responseTimeMs: 12,
      category: 'SYSTEM' as any,
      message: 'RazorAgent AI core engine initialized.'
    });
  }

  public subscribe(event: string, callback: EventListener): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
    return () => {
      this.listeners.get(event)?.delete(callback);
    };
  }

  public emit(event: string, data: any) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach((cb) => {
        try {
          cb(data);
        } catch (e) {
          console.error('Error in event listener', e);
        }
      });
    }
  }

  public addLog(log: Omit<ServerEventLog, 'id' | 'timestamp' | 'ipHash' | 'requestId'> & { ipHash?: string; requestId?: string }): ServerEventLog {
    const fullLog: ServerEventLog = {
      id: 'log_' + Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      ipHash: log.ipHash || 'ip_7f9a2b',
      requestId: log.requestId || 'req_' + Math.random().toString(36).substring(2, 8),
      ...log
    };

    this.recentLogs.unshift(fullLog);
    if (this.recentLogs.length > this.MAX_LOGS) {
      this.recentLogs.pop();
    }

    this.emit('server_log', fullLog);
    return fullLog;
  }

  public getRecentLogs(): ServerEventLog[] {
    return [...this.recentLogs];
  }
}

// Global singleton across hot reloads
const globalForEvents = global as unknown as { eventBus: GlobalEventBus };
export const eventBus = globalForEvents.eventBus || new GlobalEventBus();
if (process.env.NODE_ENV !== 'production') globalForEvents.eventBus = eventBus;
`);

// 2. src/lib/audit/auditLogger.ts
writeFile('src/lib/audit/auditLogger.ts', `
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
      message: \`Audit logged: \${record.action} | Status: \${record.status} | Amount: ₹\${record.amount || 0}\`
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
`);

// 3. src/lib/security/auth.ts
writeFile('src/lib/security/auth.ts', `
import jwt from 'jsonwebtoken';
import { User, Role } from '@/types';
import { SEED_USERS } from '@/lib/db/seedData';

const JWT_SECRET = process.env.JWT_SECRET || 'razoragent-jwt-super-secret-key-32chars-min-2026';

export interface TokenPayload {
  userId: string;
  email: string;
  role: Role;
  name: string;
}

export function signToken(payload: TokenPayload, expiresIn: string = '7d'): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as any);
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (err) {
    return null;
  }
}

export function getUserFromToken(token?: string): User | null {
  if (!token) return null;
  const decoded = verifyToken(token);
  if (!decoded) return null;

  const found = SEED_USERS.find(u => u.id === decoded.userId || u.email === decoded.email);
  if (found) {
    const { passwordHash, ...safeUser } = found;
    return safeUser;
  }
  return {
    id: decoded.userId,
    email: decoded.email,
    name: decoded.name,
    role: decoded.role,
    createdAt: new Date().toISOString()
  };
}
`);

// 4. src/lib/security/rateLimiter.ts
writeFile('src/lib/security/rateLimiter.ts', `
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

export function checkRateLimit(
  identifier: string,
  limit: number = 60,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetInSec: number } {
  const now = Date.now();
  const existing = rateLimitStore.get(identifier);

  if (!existing || now > existing.resetAt) {
    rateLimitStore.set(identifier, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetInSec: Math.ceil(windowMs / 1000) };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetInSec: Math.ceil((existing.resetAt - now) / 1000)
    };
  }

  existing.count++;
  return {
    allowed: true,
    remaining: limit - existing.count,
    resetInSec: Math.ceil((existing.resetAt - now) / 1000)
  };
}
`);

// 5. src/lib/db/mockDb.ts
writeFile('src/lib/db/mockDb.ts', `
import { Product, Category, Cart, Order, User, PaymentRecord, Campaign } from '@/types';
import { SEED_PRODUCTS, SEED_CATEGORIES, SEED_USERS } from './seedData';
import { auditService } from '@/lib/audit/auditLogger';
import { eventBus } from '@/lib/events/eventBus';

class MockDatabase {
  public products: Product[] = [...SEED_PRODUCTS];
  public categories: Category[] = [...SEED_CATEGORIES];
  public users: (User & { passwordHash: string })[] = [...SEED_USERS];
  public carts: Map<string, Cart> = new Map();
  public orders: Order[] = [
    {
      id: 'ord_init_01',
      orderNumber: 'NEX-ORD-98210',
      userId: 'usr_customer_01',
      userEmail: 'customer@razoragent.ai',
      userName: 'Elena Rostova (AI Buyer)',
      subtotal: 55397,
      discount: 5539,
      tax: 3988,
      shipping: 0,
      total: 53846,
      currency: 'INR',
      status: 'PAID',
      paymentMethod: 'UPI',
      isAiAssisted: true,
      items: [
        {
          id: 'item_01',
          productId: 'prod_03',
          productName: 'RazorAgent SwiftAir 14" Slim College Edition',
          quantity: 1,
          unitPrice: 49999,
          totalPrice: 49999,
          image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&auto=format&fit=crop&q=80'
        },
        {
          id: 'item_02',
          productId: 'prod_05',
          productName: 'AeroGlide Pro Wireless Ergonomic Mouse',
          quantity: 1,
          unitPrice: 2499,
          totalPrice: 2499,
          image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&auto=format&fit=crop&q=80'
        },
        {
          id: 'item_03',
          productId: 'prod_07',
          productName: 'AcousticPure Flow ANC Wireless Headphones',
          quantity: 1,
          unitPrice: 2899,
          totalPrice: 2899,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80'
        }
      ],
      shippingAddress: {
        fullName: 'Elena Rostova',
        addressLine1: 'Tech Residency, Tower B, 4th Floor',
        city: 'Bengaluru',
        state: 'Karnataka',
        postalCode: '560100',
        country: 'India',
        phone: '+91 98765 43210'
      },
      timeline: [
        { status: 'CREATED', timestamp: '2026-08-30T10:00:00.000Z', message: 'Order generated by AI agent bundle recommendation.' },
        { status: 'PENDING_PAYMENT', timestamp: '2026-08-30T10:00:05.000Z', message: 'Razorpay sandbox checkout session prepared.' },
        { status: 'PAID', timestamp: '2026-08-30T10:01:12.000Z', message: 'Payment of ₹53,846 verified via Razorpay sandbox webhook.' },
        { status: 'PROCESSING', timestamp: '2026-08-30T10:15:00.000Z', message: 'Sent to automated warehouse fulfillment.' }
      ],
      createdAt: '2026-08-30T10:00:00.000Z',
      updatedAt: '2026-08-30T10:15:00.000Z'
    }
  ];
  public payments: PaymentRecord[] = [
    {
      id: 'pay_init_01',
      orderId: 'ord_init_01',
      razorpayOrderId: 'order_test_razoragent_98210',
      razorpayPaymentId: 'pay_test_razoragent_succ_110',
      razorpaySignature: 'sig_mock_verified_hmac_2026',
      amount: 53846,
      currency: 'INR',
      status: 'CAPTURED',
      method: 'UPI',
      createdAt: '2026-08-30T10:01:12.000Z'
    }
  ];
  public campaigns: Campaign[] = [
    {
      id: 'camp_01',
      merchantId: 'merch_01',
      title: 'College AI Creator Setup Blast',
      goal: 'Drive ₹5,00,000 in student bundle GMV',
      targetAudience: 'Engineering & CS college students with interest in lightweight laptops & ANC headphones',
      budget: 25000,
      status: 'ACTIVE',
      strategy: JSON.stringify({
        primaryOffer: '10% OFF bundled accessories with SwiftAir 14',
        upsellTrigger: 'Suggest 32GB RAM version for heavy Docker users (+₹10,000)',
        channels: ['AI Chat In-Stream Recommendation', 'Smart Shop Highlight']
      }),
      schedule: JSON.stringify({ startDate: '2026-08-25', endDate: '2026-09-15' }),
      metrics: JSON.stringify({ impressions: 14200, conversions: 38, revenueGenerated: 2045000 }),
      createdAt: '2026-08-25T00:00:00.000Z',
      updatedAt: '2026-08-30T00:00:00.000Z'
    }
  ];

  // Helper Methods
  public getOrCreateCart(sessionId: string, userId?: string): Cart {
    let cart = this.carts.get(sessionId);
    if (!cart) {
      cart = {
        id: 'cart_' + Math.random().toString(36).substring(2, 9),
        userId,
        sessionId,
        items: [],
        subtotal: 0,
        discount: 0,
        tax: 0,
        shipping: 0,
        total: 0,
        status: 'ACTIVE',
        updatedAt: new Date().toISOString()
      };
      this.carts.set(sessionId, cart);
    }
    return cart;
  }

  public recalculateCart(cart: Cart, couponCode?: string): Cart {
    let subtotal = 0;
    cart.items.forEach(item => {
      item.totalPrice = item.unitPrice * item.quantity;
      subtotal += item.totalPrice;
    });

    cart.subtotal = subtotal;
    let discount = 0;
    if (couponCode) {
      const code = couponCode.toUpperCase();
      if (code === 'STUDENT10' || code === 'NEXORA10') {
        discount = Math.round(subtotal * 0.1);
        cart.couponCode = code;
      } else if (code === 'SAVE2000' && subtotal > 10000) {
        discount = 2000;
        cart.couponCode = code;
      }
    }
    cart.discount = discount;
    const taxableAmount = Math.max(0, subtotal - discount);
    cart.tax = Math.round(taxableAmount * 0.08); // 8% GST/Tax
    cart.shipping = subtotal > 2000 || subtotal === 0 ? 0 : 150;
    cart.total = taxableAmount + cart.tax + cart.shipping;
    cart.updatedAt = new Date().toISOString();

    return cart;
  }
}

const globalForMockDb = global as unknown as { mockDb: MockDatabase };
export const mockDb = globalForMockDb.mockDb || new MockDatabase();
if (process.env.NODE_ENV !== 'production') globalForMockDb.mockDb = mockDb;
`);

console.log('Backend core db and helpers generated');
