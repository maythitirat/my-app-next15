import { getCachedResumes } from '@/app/_utils/cachedResumes';
import SearchResume from '@/app/components/SearchResume';
import BackToHomeButton from '@/app/components/BackToHomeButton';
import { Suspense } from 'react';

// Loading component for search page
function SearchLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-600"></div>
    </div>
  );
}

// Next.js 15 - Search page with enhanced caching
export default async function SearchPage() {
  const resumes = await getCachedResumes();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-black dark:to-gray-900 py-10">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🔍 Search Resumes
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            ค้นหาและเรียกดูข้อมูล Resume ทั้งหมด
          </p>
          
          {/* Back to Home Button */}
          <div className="mb-6">
            <BackToHomeButton />
          </div>
        </div>
        
        {/* Search Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <Suspense fallback={<SearchLoading />}>
            <SearchResume resumes={resumes} />
          </Suspense>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-gray-500 dark:text-gray-400">
          <p>ค้นหาและจัดการข้อมูล Resume อย่างมีประสิทธิภาพ</p>
        </div>
      </div>
    </div>
  );
}
