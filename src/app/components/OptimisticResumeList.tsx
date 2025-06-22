'use client';

import { useOptimistic, useTransition } from 'react';
import { Resume } from '@/app/api/resumes/response.dto';

interface OptimisticResumeProps {
  initialResumes: Resume[];
  onDeleteResume: (id: number) => Promise<void>;
}

// Next.js 15 - React 19 useOptimistic for instant UI updates
export default function OptimisticResumeList({ 
  initialResumes, 
  onDeleteResume 
}: OptimisticResumeProps) {
  const [isPending, startTransition] = useTransition();
  
  const [optimisticResumes, addOptimisticResume] = useOptimistic(
    initialResumes,
    (state: Resume[], action: { type: 'delete'; id: number }) => {
      if (action.type === 'delete') {
        return state.filter(resume => resume.id !== action.id);
      }
      return state;
    }
  );

  const handleDelete = (id: number) => {
    startTransition(async () => {
      // Optimistically update UI
      addOptimisticResume({ type: 'delete', id });
      
      try {
        // Perform actual delete
        await onDeleteResume(id);
      } catch (error) {
        // Handle error - UI will revert automatically
        console.error('Failed to delete resume:', error);
      }
    });
  };

  return (
    <div className="space-y-4">
      {optimisticResumes.map((resume) => (
        <div 
          key={resume.id} 
          className={`border rounded-lg p-6 transition-all ${
            isPending ? 'opacity-70' : 'opacity-100'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                {resume.full_name}
              </h3>
              <p className="text-gray-600 mb-2">{resume.email}</p>
              <p className="text-gray-700 line-clamp-2">{resume.summary}</p>
            </div>
            
            <div className="ml-4 space-x-2">
              <button
                onClick={() => handleDelete(resume.id)}
                disabled={isPending}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {resume.experiences?.length || 0} experiences • {resume.educations?.length || 0} education records
            </span>
          </div>
        </div>
      ))}
      
      {optimisticResumes.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No resumes found.
        </div>
      )}
    </div>
  );
}
