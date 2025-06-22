'use client';

// Next.js 15 Error Boundary for Resume section
export default function ResumeError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffbe7]">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 border border-[#ffe082]">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          
          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            Resume Error
          </h2>
          
          <p className="mt-2 text-sm text-gray-600">
            There was an error loading the resume data.
          </p>
          
          <p className="mt-1 text-xs text-gray-500">
            {error.message}
          </p>
          
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => reset()}
              className="flex-1 bg-[#ffa000] text-white px-4 py-2 rounded-md hover:bg-[#ff8f00] transition-colors"
            >
              Try again
            </button>
            
            <button
              onClick={() => window.location.href = '/'}
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
            >
              Go home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
