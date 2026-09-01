
import { mockDb } from '@/lib/db/mockDb';
import { auditService } from '@/lib/audit/auditLogger';
import { ToolCallExecution, Product, Cart } from '@/types';
import { eventBus } from '@/lib/events/eventBus';

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, any>;
  execute: (params: any, context?: { userId?: string; sessionId?: string }) => Promise<ToolCallExecution>;
}

export const COMMERCE_TOOLS: Record<string, ToolDefinition> = {
  search_products: {
    name: 'search_products',
    description: 'Search catalog by keyword, price range, category, or semantic specifications.',
    parameters: {
      query: { type: 'string', description: 'Search term e.g. "college laptop" or "headphones"' },
      category: { type: 'string', description: 'Optional category slug' },
      maxPrice: { type: 'number', description: 'Maximum price limit in INR' },
      minRating: { type: 'number', description: 'Minimum rating out of 5' }
    },
    execute: async (params, ctx) => {
      const startTime = Date.now();
      const q = (params.query || '').toLowerCase();
      let results = mockDb.products.filter(p => {
        const matchesQuery = !q ||
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q)) ||
          (p.aiMetadata?.intentKeywords?.some(k => k.toLowerCase().includes(q)));
        const matchesCategory = !params.category || p.categoryId === params.category;
        const matchesPrice = !params.maxPrice || p.price <= params.maxPrice;
        const matchesRating = !params.minRating || p.rating >= params.minRating;
        return matchesQuery && matchesCategory && matchesPrice && matchesRating;
      });

      if (results.length === 0 && q) {
        // Fallback fuzzy search on brand or tags
        results = mockDb.products.filter(p =>
          p.tags.some(t => q.includes(t.toLowerCase())) ||
          q.includes(p.brand.toLowerCase())
        );
      }

      auditService.log({
        userId: ctx?.userId,
        sessionId: ctx?.sessionId,
        action: 'TOOL_SEARCH_PRODUCTS',
        tool: 'search_products',
        inputSummary: JSON.stringify(params),
        outputSummary: `Found ${results.length} products`,
        status: 'SUCCESS',
        approvalRequired: false,
        amount: undefined
      });

      return {
        id: 'tc_' + Math.random().toString(36).substring(2, 9),
        toolName: 'search_products',
        inputParams: params,
        outputResult: results.map(r => ({ id: r.id, name: r.name, price: r.price, rating: r.rating, inventory: r.inventory, image: r.images[0] })),
        summary: `Catalog search retrieved ${results.length} relevant products.`,
        executionTimeMs: Date.now() - startTime,
        status: 'SUCCESS'
      };
    }
  },

  get_product_details: {
    name: 'get_product_details',
    description: 'Retrieve full specifications, inventory, and features for a product.',
    parameters: {
      productId: { type: 'string', description: 'Product ID or slug' }
    },
    execute: async (params, ctx) => {
      const startTime = Date.now();
      const product = mockDb.products.find(p => p.id === params.productId || p.slug === params.productId);
      return {
        id: 'tc_' + Math.random().toString(36).substring(2, 9),
        toolName: 'get_product_details',
        inputParams: params,
        outputResult: product || null,
        summary: product ? `Retrieved details for ${product.name} (Stock: ${product.inventory})` : 'Product not found',
        executionTimeMs: Date.now() - startTime,
        status: product ? 'SUCCESS' : 'FAILED'
      };
    }
  },

  check_inventory: {
    name: 'check_inventory',
    description: 'Check real-time stock levels and availability for product IDs.',
    parameters: {
      productIds: { type: 'array', items: { type: 'string' } }
    },
    execute: async (params, ctx) => {
      const startTime = Date.now();
      const ids: string[] = Array.isArray(params.productIds) ? params.productIds : [params.productId || ''];
      const stockReport = ids.map(id => {
        const p = mockDb.products.find(prod => prod.id === id);
        return {
          productId: id,
          name: p?.name || 'Unknown',
          available: (p?.inventory || 0) > 0,
          inventory: p?.inventory || 0,
          lowStock: (p?.inventory || 0) < 10
        };
      });

      return {
        id: 'tc_' + Math.random().toString(36).substring(2, 9),
        toolName: 'check_inventory',
        inputParams: params,
        outputResult: stockReport,
        summary: `Verified stock for ${stockReport.length} item(s) from merchant inventory.`,
        executionTimeMs: Date.now() - startTime,
        status: 'SUCCESS'
      };
    }
  },

  compare_products: {
    name: 'compare_products',
    description: 'Compare 2 or 3 products side-by-side on specs, price, and ratings.',
    parameters: {
      productIds: { type: 'array', items: { type: 'string' } }
    },
    execute: async (params, ctx) => {
      const startTime = Date.now();
      const ids: string[] = params.productIds || [];
      const prods = mockDb.products.filter(p => ids.includes(p.id));
      return {
        id: 'tc_' + Math.random().toString(36).substring(2, 9),
        toolName: 'compare_products',
        inputParams: params,
        outputResult: prods,
        summary: `Compared ${prods.length} products across specifications and pricing.`,
        executionTimeMs: Date.now() - startTime,
        status: 'SUCCESS'
      };
    }
  },

  calculate_cart: {
    name: 'calculate_cart',
    description: 'Calculate official taxes, discount coupon, shipping, and total for a session.',
    parameters: {
      sessionId: { type: 'string' },
      couponCode: { type: 'string', description: 'Optional discount coupon' }
    },
    execute: async (params, ctx) => {
      const startTime = Date.now();
      const sessionId = params.sessionId || ctx?.sessionId || 'default_sess';
      const cart = mockDb.getOrCreateCart(sessionId, ctx?.userId);
      const updated = mockDb.recalculateCart(cart, params.couponCode);

      return {
        id: 'tc_' + Math.random().toString(36).substring(2, 9),
        toolName: 'calculate_cart',
        inputParams: params,
        outputResult: updated,
        summary: `Recalculated cart total: ₹${updated.total.toLocaleString()} (Subtotal: ₹${updated.subtotal.toLocaleString()}, Tax: ₹${updated.tax.toLocaleString()})`,
        executionTimeMs: Date.now() - startTime,
        status: 'SUCCESS'
      };
    }
  },

  add_to_cart: {
    name: 'add_to_cart',
    description: 'Add a product to buyer cart and update totals.',
    parameters: {
      sessionId: { type: 'string' },
      productId: { type: 'string' },
      quantity: { type: 'number' }
    },
    execute: async (params, ctx) => {
      const startTime = Date.now();
      const sessionId = params.sessionId || ctx?.sessionId || 'default_sess';
      const cart = mockDb.getOrCreateCart(sessionId, ctx?.userId);
      const product = mockDb.products.find(p => p.id === params.productId);

      if (!product) {
        return {
          id: 'tc_' + Math.random().toString(36).substring(2, 9),
          toolName: 'add_to_cart',
          inputParams: params,
          outputResult: null,
          summary: 'Failed: Product not found in catalog',
          executionTimeMs: Date.now() - startTime,
          status: 'FAILED'
        };
      }

      const qty = params.quantity || 1;
      const existingItem = cart.items.find(i => i.productId === product.id);
      if (existingItem) {
        existingItem.quantity += qty;
        existingItem.totalPrice = existingItem.quantity * existingItem.unitPrice;
      } else {
        cart.items.push({
          id: 'ci_' + Math.random().toString(36).substring(2, 8),
          productId: product.id,
          product,
          quantity: qty,
          unitPrice: product.price,
          totalPrice: product.price * qty
        });
      }

      mockDb.recalculateCart(cart);

      auditService.log({
        userId: ctx?.userId,
        sessionId: sessionId,
        action: 'CART_ITEM_ADDED',
        tool: 'add_to_cart',
        inputSummary: `Added ${qty}x ${product.name}`,
        outputSummary: `Cart now has ${cart.items.length} items. Total: ₹${cart.total}`,
        status: 'SUCCESS',
        approvalRequired: false,
        amount: cart.total
      });

      return {
        id: 'tc_' + Math.random().toString(36).substring(2, 9),
        toolName: 'add_to_cart',
        inputParams: params,
        outputResult: cart,
        summary: `Added ${qty}x ${product.name} to cart. Cart Total: ₹${cart.total.toLocaleString()}`,
        executionTimeMs: Date.now() - startTime,
        status: 'SUCCESS'
      };
    }
  },

  find_up_sell: {
    name: 'find_up_sell',
    description: 'Find premium higher-spec upgrades for a given product with clear value rationale.',
    parameters: {
      productId: { type: 'string' }
    },
    execute: async (params, ctx) => {
      const startTime = Date.now();
      const product = mockDb.products.find(p => p.id === params.productId);
      const upsells = mockDb.products.filter(p => product?.upSellProducts?.includes(p.id));

      return {
        id: 'tc_' + Math.random().toString(36).substring(2, 9),
        toolName: 'find_up_sell',
        inputParams: params,
        outputResult: upsells,
        summary: upsells.length > 0
          ? `Identified ${upsells.length} higher-tier upgrade options (e.g. ${upsells[0].name})`
          : 'No higher-tier upsell found for this SKU.',
        executionTimeMs: Date.now() - startTime,
        status: 'SUCCESS'
      };
    }
  },

  find_cross_sell: {
    name: 'find_cross_sell',
    description: 'Find compatible complementary accessories or add-ons for a product.',
    parameters: {
      productId: { type: 'string' }
    },
    execute: async (params, ctx) => {
      const startTime = Date.now();
      const product = mockDb.products.find(p => p.id === params.productId);
      const crossSells = mockDb.products.filter(p => product?.crossSellProducts?.includes(p.id));

      return {
        id: 'tc_' + Math.random().toString(36).substring(2, 9),
        toolName: 'find_cross_sell',
        inputParams: params,
        outputResult: crossSells,
        summary: `Found ${crossSells.length} complementary cross-sell accessories.`,
        executionTimeMs: Date.now() - startTime,
        status: 'SUCCESS'
      };
    }
  },

  create_checkout_session: {
    name: 'create_checkout_session',
    description: 'Prepare an explainable, bounded checkout session that REQUIRES explicit user approval before payment.',
    parameters: {
      sessionId: { type: 'string' },
      shippingAddress: { type: 'object' }
    },
    execute: async (params, ctx) => {
      const startTime = Date.now();
      const sessionId = params.sessionId || ctx?.sessionId || 'default_sess';
      const cart = mockDb.getOrCreateCart(sessionId, ctx?.userId);

      if (cart.items.length === 0) {
        return {
          id: 'tc_' + Math.random().toString(36).substring(2, 9),
          toolName: 'create_checkout_session',
          inputParams: params,
          outputResult: null,
          summary: 'Cannot initiate checkout on an empty cart.',
          executionTimeMs: Date.now() - startTime,
          status: 'FAILED'
        };
      }

      auditService.log({
        userId: ctx?.userId,
        sessionId: sessionId,
        action: 'AI_CHECKOUT_PREPARED_PERMISSION_GATE',
        tool: 'create_checkout_session',
        inputSummary: `Checkout initiated for ${cart.items.length} items. Total: ₹${cart.total}`,
        outputSummary: 'Awaiting explicit buyer permission. No payment initiated yet.',
        status: 'REQUIRES_APPROVAL',
        amount: cart.total,
        approvalRequired: true,
        approvalStatus: 'PENDING'
      });

      return {
        id: 'tc_' + Math.random().toString(36).substring(2, 9),
        toolName: 'create_checkout_session',
        inputParams: params,
        outputResult: {
          cartId: cart.id,
          subtotal: cart.subtotal,
          discount: cart.discount,
          tax: cart.tax,
          shipping: cart.shipping,
          total: cart.total,
          itemCount: cart.items.length,
          status: 'AWAITING_USER_APPROVAL'
        },
        summary: `AI prepared a ₹${cart.total.toLocaleString()} checkout. Permission required before initiating payment.`,
        executionTimeMs: Date.now() - startTime,
        status: 'REQUIRES_APPROVAL',
        approvalRequired: true,
        actionCard: {
          type: 'CHECKOUT_CONFIRMATION',
          title: 'Review & Approve Autonomous Checkout',
          description: `AI has built a verified bundle with ${cart.items.length} item(s). Confirm to initiate Razorpay Sandbox Payment.`,
          amount: cart.total,
          items: cart.items.map(i => ({ name: i.product.name, price: i.totalPrice, quantity: i.quantity })),
          actions: [
            { label: 'Approve & Pay (Test Mode)', action: 'APPROVE_CHECKOUT', primary: true },
            { label: 'Modify Bundle', action: 'MODIFY_CART', primary: false }
          ]
        }
      };
    }
  },

  merchant_revenue_analysis: {
    name: 'merchant_revenue_analysis',
    description: 'Provide merchant analytics and AI revenue attribution metrics.',
    parameters: {
      metric: { type: 'string', description: 'e.g. revenue, conversion, ai_attribution, top_skus' },
      period: { type: 'string', description: '7d, 30d, 90d' }
    },
    execute: async (params, ctx) => {
      const startTime = Date.now();
      const totalRevenue = mockDb.orders.reduce((acc, o) => acc + (o.status === 'PAID' ? o.total : 0), 0);
      const aiRevenue = mockDb.orders.filter(o => o.isAiAssisted && o.status === 'PAID').reduce((acc, o) => acc + o.total, 0);

      const metrics = {
        totalOrders: mockDb.orders.length,
        totalRevenue,
        aiAssistedOrders: mockDb.orders.filter(o => o.isAiAssisted).length,
        aiRevenueAttribution: aiRevenue,
        aiRevenueSharePercentage: totalRevenue > 0 ? Math.round((aiRevenue / totalRevenue) * 100) : 0,
        averageOrderValue: mockDb.orders.length > 0 ? Math.round(totalRevenue / mockDb.orders.length) : 0,
        topSellingSKUs: mockDb.products.slice(0, 3).map(p => ({ sku: p.sku, name: p.name, price: p.price }))
      };

      return {
        id: 'tc_' + Math.random().toString(36).substring(2, 9),
        toolName: 'merchant_revenue_analysis',
        inputParams: params,
        outputResult: metrics,
        summary: `Calculated merchant metrics: ₹${totalRevenue.toLocaleString()} Revenue (${metrics.aiRevenueSharePercentage}% AI-driven).`,
        executionTimeMs: Date.now() - startTime,
        status: 'SUCCESS'
      };
    }
  }
};
