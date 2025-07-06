import { unstable_cache } from 'next/cache';
import { ResumeResponse } from "../api/resumes/response.dto";
import { getApiBaseUrl } from './apiUtils';

// Next.js 15 - Enhanced caching with unstable_cache
export const getCachedResumes = unstable_cache(
  async (): Promise<ResumeResponse> => {
    const apiBaseUrl = getApiBaseUrl();
    
    try {
      const res = await fetch(`${apiBaseUrl}/resume`, {
        headers: { "Content-Type": "application/json" },
      });
      
      if (!res.ok) {
        throw new Error(`Failed to fetch resumes from API: ${res.status}`);
      }
      
      return res.json();
    } catch (error) {
      console.error('Error fetching resumes:', error);
      // Return empty array for build time
      return [] as ResumeResponse;
    }
  },
  ['resumes-cache'], // cache key
  {
    revalidate: 300, // 5 minutes
    tags: ['resumes'], // for cache invalidation
  }
);

// Cache single resume by ID
export const getCachedResumeById = unstable_cache(
  async (id: string) => {
    const apiBaseUrl = getApiBaseUrl();
    
    try {
      const res = await fetch(`${apiBaseUrl}/resume/${id}`, {
        headers: { "Content-Type": "application/json" },
      });
      
      if (!res.ok) {
        throw new Error(`Failed to fetch resume ${id}: ${res.status}`);
      }
      
      return res.json();
    } catch (error) {
      console.error(`Error fetching resume ${id}:`, error);
      // Return empty response for build time
      return { resume: null };
    }
  },
  ['resume-by-id-cache'],
  {
    revalidate: 600, // 10 minutes
    tags: ['resume'],
  }
);
