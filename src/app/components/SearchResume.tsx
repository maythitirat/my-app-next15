'use client';

import { useDeferredValue, useMemo, useState, useTransition } from 'react';
import { Resume } from '@/app/api/resumes/response.dto';
import Link from 'next/link';

interface SearchResumeProps {
  resumes: Resume[];
}

// Next.js 15 - React 19 Search with useDeferredValue
export default function SearchResume({ resumes }: SearchResumeProps) {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);

  const filteredResumes = useMemo(() => {
    if (!deferredQuery) return resumes;
    
    return resumes.filter(resume =>
      resume.full_name.toLowerCase().includes(deferredQuery.toLowerCase()) ||
      resume.email.toLowerCase().includes(deferredQuery.toLowerCase()) ||
      resume.summary.toLowerCase().includes(deferredQuery.toLowerCase()) ||
      resume.skills?.some(skill => 
        skill.toLowerCase().includes(deferredQuery.toLowerCase())
      )
    );
  }, [resumes, deferredQuery]);

  const handleSearch = (value: string) => {
    startTransition(() => {
      setQuery(value);
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search resumes by name, email, summary, or skills..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full px-4 py-3 border-2 border-[#ffe082] rounded-lg focus:outline-none focus:border-[#ffa000] transition-colors"
        />
        {isPending && (
          <div className="mt-2 text-sm text-[#ffa000]">Searching...</div>
        )}
      </div>

      {/* Results */}
      <div className={`space-y-4 transition-opacity ${isPending ? 'opacity-50' : 'opacity-100'}`}>
        {filteredResumes.map((resume) => (
          <div key={resume.id} className="bg-white rounded-lg shadow-md border border-[#ffe082] p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[#ffa000] mb-2">
                  <Link href={`/resume/${resume.id}`} className="hover:underline">
                    {resume.full_name}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-2">{resume.email}</p>
                <p className="text-gray-700 line-clamp-2 mb-3">{resume.summary}</p>
                
                {/* Skills */}
                {resume.skills && resume.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.slice(0, 5).map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#ffe082] text-[#ffa000] rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {resume.skills.length > 5 && (
                      <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-sm">
                        +{resume.skills.length - 5} more
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <Link
                href={`/resume/${resume.id}`}
                className="ml-4 bg-[#ffa000] text-white px-4 py-2 rounded-md hover:bg-[#ff8f00] transition-colors"
              >
                View
              </Link>
            </div>
          </div>
        ))}
        
        {filteredResumes.length === 0 && deferredQuery && (
          <div className="text-center py-8 text-gray-500">
            No resumes found for &quot;{deferredQuery}&quot;
          </div>
        )}
      </div>
      
      {/* Results count */}
      <div className="mt-6 text-sm text-gray-600 text-center">
        {deferredQuery ? (
          `Found ${filteredResumes.length} resume${filteredResumes.length !== 1 ? 's' : ''} for &quot;${deferredQuery}&quot;`
        ) : (
          `Showing all ${resumes.length} resume${resumes.length !== 1 ? 's' : ''}`
        )}
      </div>
    </div>
  );
}
