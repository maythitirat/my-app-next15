"use client";
import Link from "next/link";
import { useResumeContext } from "@/app/_logic/ResumeContext";
import { useState } from "react";
import BackToHomeButton from "@/app/components/BackToHomeButton";

export default function ResumeListPage() {
  const { resumes, loading, error, deleteResume } = useResumeContext();
  const [deleting, setDeleting] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState<string>("");

  const handleDelete = async (id: number, fullName: string) => {
    if (!confirm(`Are you sure you want to delete the resume for "${fullName}"?`)) {
      return;
    }

    try {
      setDeleting(id);
      setDeleteError("");
      await deleteResume(id);
      // Success message could be added here if needed
      console.log(`Resume for ${fullName} deleted successfully`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setDeleteError(`Failed to delete resume for ${fullName}: ${errorMessage}`);
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-2 bg-gray-50">
      <div className="w-full max-w-2xl rounded-2xl shadow-lg bg-white border border-gray-200 p-8">
        {/* Back to Home Button */}
        <div className="mb-4">
          <BackToHomeButton />
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Resume List</h1>
          <Link
            href="/resume/create"
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
          >
            Create New Resume
          </Link>
        </div>
        
        {/* Error Message */}
        {deleteError && (
          <div className="mb-4 p-4 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg">
            <div className="flex items-center">
              <span className="font-medium">Error:</span>
              <span className="ml-2">{deleteError}</span>
              <button
                onClick={() => setDeleteError("")}
                className="ml-auto text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
          </div>
        )}
        
        {resumes.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">No resumes found.</p>
            <Link
              href="/resume/create"
              className="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Create Your First Resume
            </Link>
          </div>
        ) : (
          <ul className="space-y-4">
            {resumes.map((resume) => {
              return (
                <li key={resume.id} className="border-b pb-4">
                  <div className="font-bold text-lg">{resume.full_name}</div>
                  <div className="text-sm text-gray-600 mb-2">{resume.summary}</div>
                  <div className="flex gap-3 items-center">
                    <Link
                      href={`/resume/${resume.id}`}
                      className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-gray-900 transition-colors"
                    >
                      View Resume
                    </Link>
                    <button
                      onClick={() => handleDelete(resume.id, resume.full_name)}
                      disabled={deleting === resume.id}
                      className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deleting === resume.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
