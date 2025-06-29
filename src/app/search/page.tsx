import { getCachedResumes } from '@/app/_utils/cachedResumes';
import SearchResume from '@/app/components/SearchResume';
import BackToHomeButton from '@/app/components/BackToHomeButton';
import { Suspense } from 'react';

// Loading component for search page
function SearchLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffbe7]">
      <div className="text-[#ffa000] text-lg">Loading search...</div>
    </div>
  );
}

// Next.js 15 - Search page with enhanced caching
export default async function SearchPage() {
  const resumes = await getCachedResumes();

  return (
    <div className="min-h-screen bg-[#fffbe7] py-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back to Home Button */}
        <div className="mb-6">
          <BackToHomeButton />
        </div>
        
        <h1 className="text-3xl font-bold text-center text-[#ffa000] mb-8">
          Search Resumes
        </h1>
        
        <Suspense fallback={<SearchLoading />}>
          <SearchResume resumes={resumes} />
        </Suspense>
      </div>
    </div>
  );
}
