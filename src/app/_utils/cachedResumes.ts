import { unstable_cache } from 'next/cache';
import { ResumeResponse } from "../api/resumes/response.dto";

// Next.js 15 - Enhanced caching with unstable_cache
export const getCachedResumes = unstable_cache(
  async (): Promise<ResumeResponse> => {
    const res = await fetch(`${process.env.API_BASE_URL}/resume`, {
      headers: { "Content-Type": "application/json" },
    });
    
    if (!res.ok) {
      throw new Error("Failed to fetch resumes from API");
    }
    
    return res.json();
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
    const res = await fetch(`${process.env.API_BASE_URL}/resume/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch resume ${id}`);
    }
    
    return res.json();
  },
  ['resume-by-id-cache'],
  {
    revalidate: 600, // 10 minutes
    tags: ['resume'],
  }
);
