
import { NextRequest, NextResponse } from 'next/server';
import { mockDb } from '@/lib/db/mockDb';
import { auditService } from '@/lib/audit/auditLogger';

export async function GET(req: NextRequest) {
  return NextResponse.json({
    success: true,
    requestId: 'req_camp_' + Date.now(),
    timestamp: new Date().toISOString(),
    data: mockDb.campaigns,
    error: null
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, goal, targetAudience, budget } = body;

    const newCampaign = {
      id: 'camp_' + Math.random().toString(36).substring(2, 9),
      merchantId: 'merch_01',
      title: title || 'Autonomous Upsell Campaign',
      goal: goal || 'Increase AOV by 25%',
      targetAudience: targetAudience || 'Active tech buyers',
      budget: Number(budget) || 15000,
      status: 'ACTIVE' as any,
      strategy: JSON.stringify({
        aiUpsellTriggers: ['Suggest 32GB RAM upgrade when SwiftAir added', 'Prompt 100W GaN charger with laptops'],
        channels: ['Conversational AI In-Stream', 'Smart Drawer Promo']
      }),
      schedule: JSON.stringify({ startDate: new Date().toISOString().split('T')[0], durationDays: 14 }),
      metrics: JSON.stringify({ impressions: 0, conversions: 0, revenueGenerated: 0 }),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mockDb.campaigns.unshift(newCampaign);

    auditService.log({
      action: 'AI_MARKETING_CAMPAIGN_LAUNCHED',
      tool: 'campaign_orchestrator',
      inputSummary: `Campaign: "${newCampaign.title}" | Budget: ₹${newCampaign.budget}`,
      outputSummary: 'AI generated strategy and activated in-stream triggers.',
      status: 'SUCCESS',
      amount: newCampaign.budget,
      approvalRequired: true,
      approvalStatus: 'APPROVED'
    });

    return NextResponse.json({
      success: true,
      requestId: 'req_camp_new_' + Date.now(),
      timestamp: new Date().toISOString(),
      data: newCampaign,
      error: null
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
