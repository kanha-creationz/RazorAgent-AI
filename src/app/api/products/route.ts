
import { NextRequest, NextResponse } from 'next/server';
import { mockDb } from '@/lib/db/mockDb';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q')?.toLowerCase();
  const category = searchParams.get('category');
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
  const isAgent = searchParams.get('agent') === 'true';

  let products = [...mockDb.products];

  if (category && category !== 'all') {
    products = products.filter(p => p.categoryId === category);
  }

  if (maxPrice) {
    products = products.filter(p => p.price <= maxPrice);
  }

  if (q) {
    products = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q)) ||
      (p.aiMetadata?.intentKeywords?.some(k => k.toLowerCase().includes(q)))
    );
  }

  // Agent-readable catalog format if requested
  if (isAgent) {
    const agentCatalog = products.map(p => ({
      id: p.id,
      sku: p.sku,
      title: p.name,
      priceINR: p.price,
      inStock: p.inventory > 0,
      stockCount: p.inventory,
      rating: p.rating,
      features: p.features,
      specifications: p.specifications,
      aiRecommendationTriggers: p.aiMetadata?.intentKeywords,
      compatibleAddons: p.crossSellProducts,
      higherTierUpgrade: p.upSellProducts
    }));

    return NextResponse.json({
      success: true,
      requestId: 'agent_cat_' + Date.now(),
      timestamp: new Date().toISOString(),
      data: {
        schema: 'RazorAgent-Agent-Catalog-v1',
        totalItems: agentCatalog.length,
        items: agentCatalog
      },
      error: null
    });
  }

  return NextResponse.json({
    success: true,
    requestId: 'req_prod_' + Date.now(),
    timestamp: new Date().toISOString(),
    data: {
      products,
      categories: mockDb.categories,
      total: products.length
    },
    error: null
  });
}
