
import { NextRequest, NextResponse } from 'next/server';
import { AIProviderAdapter } from '@/lib/ai/adapter';
import { checkRateLimit } from '@/lib/security/rateLimiter';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
  const rate = checkRateLimit(`ai_chat_${ip}`, 30, 60000);
  if (!rate.allowed) {
    return NextResponse.json({
      success: false,
      requestId: 'req_rl_' + Date.now(),
      timestamp: new Date().toISOString(),
      data: null,
      error: { code: 'RATE_LIMITED', message: `Too many AI queries. Please wait ${rate.resetInSec}s.` }
    }, { status: 429 });
  }

  try {
    const body = await req.json();
    const { prompt, history = [], userId, sessionId = 'default_sess' } = body;

    if (!prompt) {
      return NextResponse.json({
        success: false,
        requestId: 'req_err_' + Date.now(),
        timestamp: new Date().toISOString(),
        data: null,
        error: { code: 'BAD_REQUEST', message: 'Prompt is required.' }
      }, { status: 400 });
    }

    const response = await AIProviderAdapter.processUserPrompt(prompt, history, { userId, sessionId });

    return NextResponse.json({
      success: true,
      requestId: 'req_' + Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
      data: response,
      error: null
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      requestId: 'req_err_' + Date.now(),
      timestamp: new Date().toISOString(),
      data: null,
      error: { code: 'AGENT_ERROR', message: err.message || 'Internal AI Agent error' }
    }, { status: 500 });
  }
}
