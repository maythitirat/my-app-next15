import { NextResponse } from 'next/server';

export async function GET() {
  const apiRes = await fetch(`${process.env.API_BASE_URL}/resume`, {
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });
  const data = await apiRes.json();
  return NextResponse.json(data, { status: apiRes.status });
}
