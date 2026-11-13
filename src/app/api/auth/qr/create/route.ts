import { NextRequest, NextResponse } from 'next/server';

import { createQrLoginSession } from '@/lib/qr-login/store';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const session = await createQrLoginSession();
  const origin = new URL(request.url).origin;
  const qrUrl = `${origin}/qr-login?token=${encodeURIComponent(session.token)}`;
  return NextResponse.json({ token: session.token, qrUrl, expiresAt: session.expiresAt, ttl: 120 });
}

// 该路由依赖请求数据（查询参数/请求头等），禁止构建时静态预渲染
export const dynamic = 'force-dynamic';
