import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const apiRes = await fetch(`${process.env.API_BASE_URL}/resume/${id}`, {
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
