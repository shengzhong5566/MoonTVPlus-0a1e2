import { NextRequest, NextResponse } from 'next/server';

import { getQrLoginSession, saveQrLoginSession } from '@/lib/qr-login/store';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const { token } = await request.json();
  const session = await getQrLoginSession(token);
  if (session) {
    session.status = 'cancelled';
    await saveQrLoginSession(session);
  }
  return NextResponse.json({ ok: true });
}

// 该路由依赖请求数据（查询参数/请求头等），禁止构建时静态预渲染
export const dynamic = 'force-dynamic';
