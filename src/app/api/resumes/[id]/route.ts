import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

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

    // Update resume data according to API format
    const resumeData = {
      full_name,
      email,
      phone,
      summary
    };

    // Call external API to update resume
    const apiRes = await fetch(`${process.env.API_BASE_URL}/resume/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resumeData),
    });

    if (!apiRes.ok) {
      const errorText = await apiRes.text();
      console.error('API Error:', errorText);
      return NextResponse.json(
        { error: 'Failed to update resume' },
        { status: apiRes.status }
      );
    }

    const data = await apiRes.json();
    return NextResponse.json(data, { status: 200 });
    
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // Call external API to delete resume
    const apiRes = await fetch(`${process.env.API_BASE_URL}/resume/${id}`, {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json',
      },
    });

    if (!apiRes.ok) {
      // Handle different error cases
      if (apiRes.status === 404) {
        return NextResponse.json(
          { 
            message: `Resume with ID ${id} not found or could not be deleted`,
            error: 'Not Found',
            statusCode: 404
          },
          { status: 404 }
        );
      }
      
      // Other errors
      const errorText = await apiRes.text();
      console.error('API Error:', errorText);
      return NextResponse.json(
        { 
          message: `Failed to delete resume with ID ${id}`,
          error: 'Internal Server Error',
          statusCode: apiRes.status
        },
        { status: apiRes.status }
      );
    }

    // Success case
    return NextResponse.json(
      { 
        message: `Resume with ID ${id} has been successfully deleted`,
        deleted: true
      }, 
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json(
      { 
        message: `Failed to delete resume with ID ${id}`,
        error: 'Internal Server Error',
        statusCode: 500
      },
      { status: 500 }
    );
  }
}
