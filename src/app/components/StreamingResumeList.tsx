import { Suspense } from 'react';
import { getCachedResumes } from '@/app/_utils/cachedResumes';
import Link from 'next/link';

// Loading component
function ResumeListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="border rounded-lg p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );
}

// Async component for resume list
async function ResumeList() {
  const resumes = await getCachedResumes();

  return (
    <div className="space-y-4">
      {resumes.map((resume) => (
        <div key={resume.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
          <h3 className="text-xl font-semibold mb-2">
            <Link 
              href={`/resume/${resume.id}`}
              className="text-blue-600 hover:text-blue-800"
            >
              {resume.full_name}
            </Link>
          </h3>
          <p className="text-gray-600 mb-2">{resume.email}</p>
          <p className="text-gray-700 line-clamp-2">{resume.summary}</p>
          
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {resume.experiences?.length || 0} experiences
            </span>
            <Link 
              href={`/resume/${resume.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

// Next.js 15 - Streaming with Suspense
export default function StreamingResumeList() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Resume List</h1>
      
      <Suspense fallback={<ResumeListSkeleton />}>
        <ResumeList />
      </Suspense>
    </div>
  );
}
