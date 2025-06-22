'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export interface ActionState {
  error?: string;
  success?: string;
  shouldRedirect?: boolean;
}

// Next.js 15 Server Actions
export async function createResumeAction(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const summary = formData.get('summary') as string;

  // Validate required fields
  if (!name || !email || !phone || !summary) {
    return { error: 'Please fill in all required fields' };
  }

  try {
    // Call internal API route instead of external API directly
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/resumes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name: name,
        email,
        phone,
        summary,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('API Error:', errorData);
      return { error: 'Failed to create resume. Please try again.' };
    }

    // Invalidate cache
    revalidateTag('resumes');
    
    // Return success and trigger client-side redirect
    return { success: 'Resume created successfully!', shouldRedirect: true };
  } catch (error) {
    console.error('Server Error:', error);
    return { error: 'Failed to create resume. Please check your connection.' };
  }
}

export async function updateResumeAction(
  id: string,
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const summary = formData.get('summary') as string;

  try {
    // Call internal API route instead of external API directly
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/resumes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name: name,
        email,
        phone, // เพิ่ม phone field
        summary,
      }),
    });

    if (!response.ok) {
      return { error: 'Failed to update resume' };
    }

    // Invalidate caches
    revalidateTag('resumes');
    revalidateTag('resume');
    
    // Redirect to updated resume
    redirect(`/resume/${id}`);
  } catch {
    return { error: 'Failed to update resume. Please try again.' };
  }
}

export async function deleteResumeAction(
  id: string
): Promise<ActionState> {
  try {
    // Call internal API route instead of external API directly
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/resumes/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return { error: 'Failed to delete resume' };
    }

    // Invalidate caches
    revalidateTag('resumes');
    revalidateTag('resume');
    
    return { success: 'Resume deleted successfully' };
  } catch {
    return { error: 'Failed to delete resume. Please try again.' };
  }
}
