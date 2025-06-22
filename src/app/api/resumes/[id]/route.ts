import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  
  try {
    const apiRes = await fetch(`https://m23bxip04j.execute-api.ap-southeast-1.amazonaws.com/resume/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    
    if (!apiRes.ok) {
      return NextResponse.json({ error: 'Resume not found' }, { status: apiRes.status });
    }
    
    const data = await apiRes.json();
    return NextResponse.json(data, { status: apiRes.status });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch resume' }, { status: 500 });
  }
}
