import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET() {
  const apiRes = await fetch(`${process.env.API_BASE_URL}/resume`, {
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });
  const data = await apiRes.json();
  return NextResponse.json(data, { status: apiRes.status });
}

// POST method สำหรับสร้าง Resume ใหม่
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { full_name, email, phone, summary } = body;
    
    if (!full_name || !email || !phone || !summary) {
      return NextResponse.json(
        { error: 'Missing required fields: full_name, email, phone, summary' },
        { status: 400 }
      );
    }

    // Create resume data according to API format
    const resumeData = {
      full_name,
      email,
      phone,
      summary
    };

    try {
      // Try to call external API to create resume
      const apiRes = await fetch(`${process.env.API_BASE_URL}/resume`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resumeData),
      });

      if (apiRes.ok) {
        const data = await apiRes.json();
        return NextResponse.json(data, { status: 201 });
      }
    } catch {
      console.log('External API not available, using mock response');
    }

    // If external API fails, return mock response for development
    const mockResume = {
      id: Date.now(), // Generate temporary ID
      ...resumeData,
      created_at: new Date().toISOString(),
      educations: [],
      experiences: [],
      skills: []
    };

    console.log('Created mock resume:', mockResume);
    return NextResponse.json(mockResume, { status: 201 });
    
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
