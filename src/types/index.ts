export type Role = 'CUSTOMER' | 'MERCHANT' | 'ADMIN';

export type OrderStatus =
  | 'CREATED'
  | 'PENDING_PAYMENT'
  | 'PAID'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED'
  | 'FAILED';

export type PaymentStatus =
  | 'CREATED'
  | 'AUTHORIZED'
  | 'CAPTURED'
  | 'FAILED'
  | 'REFUNDED';

export type PaymentMethod = 'UPI' | 'CARD' | 'NETBANKING' | 'WALLET' | 'QR_PAY';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  companyName?: string;
  avatar?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  brand: string;
  categoryId: string;
  category?: Category;
  subcategory?: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  inventory: number;
  availability: boolean;
  rating: number;
  reviewCount: number;
  images: string[];
  features: string[];
  specifications: Record<string, string>;
  tags: string[];
  aiMetadata?: {
    intentKeywords?: string[];
    compatibleWith?: string[];
    idealFor?: string[];
    bundleType?: string;
  };
  relatedProducts?: string[];
  crossSellProducts?: string[];
  upSellProducts?: string[];
  merchantId?: string;
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Cart {
  id: string;
  userId?: string;
  sessionId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  couponCode?: string;
  status: 'ACTIVE' | 'ORDERED' | 'ABANDONED';
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  image?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  userEmail?: string;
  userName?: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  status: OrderStatus;
  paymentMethod?: PaymentMethod;
  idempotencyKey?: string;
  shippingAddress?: {
    fullName: string;
    addressLine1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  timeline: {
    status: OrderStatus;
    timestamp: string;
    message: string;
  }[];
  isAiAssisted?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentRecord {
  id: string;
  orderId: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method?: PaymentMethod;
  failureReason?: string;
  qrPayload?: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  auditId: string;
  timestamp: string;
  userId?: string;
  userName?: string;
  agentId?: string;
  sessionId?: string;
  orderId?: string;
  action: string;
  tool?: string;
  inputSummary?: string;
  outputSummary?: string;
  status: 'SUCCESS' | 'FAILED' | 'REJECTED' | 'REQUIRES_APPROVAL';
  amount?: number;
  approvalRequired: boolean;
  approvalStatus?: 'APPROVED' | 'REJECTED' | 'PENDING';
  failureReason?: string;
  ipHash?: string;
}

export interface Campaign {
  id: string;
  merchantId: string;
  title: string;
  goal: string;
  targetAudience: string;
  budget: number;
  status: 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED';
  strategy: string;
  schedule?: string;
  metrics?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ToolCallExecution {
  id: string;
  toolName: string;
  inputParams: any;
  outputResult: any;
  summary: string;
  executionTimeMs: number;
  status: 'SUCCESS' | 'FAILED' | 'REQUIRES_APPROVAL';
  approvalRequired?: boolean;
  actionCard?: {
    type: 'CHECKOUT_CONFIRMATION' | 'BUNDLE_APPROVAL' | 'ALTERNATIVE_CHOICE';
    title: string;
    description: string;
    amount?: number;
    items?: { name: string; price: number; quantity: number }[];
    actions: { label: string; action: string; primary?: boolean }[];
  };
}

export interface AgentMessage {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  timestamp: string;
  toolCalls?: ToolCallExecution[];
  quickReplies?: string[];
  isAiThinking?: boolean;
}

export interface ServerEventLog {
  id: string;
  timestamp: string;
  method: string;
  endpoint: string;
  statusCode: number;
  responseTimeMs: number;
  userEmail?: string;
  ipHash: string;
  requestId: string;
  category: 'API' | 'AGENT' | 'PAYMENT' | 'WEBHOOK' | 'SECURITY' | 'DATABASE';
  message: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  requestId: string;
  timestamp: string;
  data: T | null;
  error: {
    code: string;
    message: string;
    details?: any;
  } | null;
}
