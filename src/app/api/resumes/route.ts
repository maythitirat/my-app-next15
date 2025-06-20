import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const apiRes = await fetch('https://m23bxip04j.execute-api.ap-southeast-1.amazonaws.com/resume', {
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });
  const data = await apiRes.json();
  return NextResponse.json(data, { status: apiRes.status });
}
