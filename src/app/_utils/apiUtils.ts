// API Base URL utility with fallback for Vercel builds
export function getApiBaseUrl(): string {
  const baseUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
  
  if (!baseUrl) {
    console.warn('API_BASE_URL not found, using fallback');
    return 'https://m23bxip04j.execute-api.ap-southeast-1.amazonaws.com';
  }
  
  return baseUrl;
}

// Safe fetch function for API calls with error handling
export async function safeFetch(url: string, options?: RequestInit): Promise<Response> {
  try {
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error(`Failed to fetch: ${url}`);
  }
}
