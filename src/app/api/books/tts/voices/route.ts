import { NextRequest, NextResponse } from 'next/server';

import { getBookTtsConfig, listBookTtsVoices } from '@/lib/book-tts';

import { getAuthorizedBooksUsername } from '../../_utils';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const username = await getAuthorizedBooksUsername(request);
  if (username instanceof NextResponse) return username;

  try {
    const config = await getBookTtsConfig();
    const voices = await listBookTtsVoices();
    return NextResponse.json({
      voices,
      defaults: {
        voice: config.defaultVoice,
        rate: config.defaultRate,
        pitch: config.defaultPitch,
        volume: config.defaultVolume,
        maxCharsPerChunk: config.maxCharsPerChunk,
        prefetchChunks: config.prefetchChunks,
        maxTextLengthPerRequest: config.maxTextLengthPerRequest,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message || '获取音色列表失败' }, { status: 500 });
  }
}

// 该路由依赖请求数据（查询参数/请求头等），禁止构建时静态预渲染
export const dynamic = 'force-dynamic';
