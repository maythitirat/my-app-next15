"use client";
import Link from "next/link";
import { useResumeContext } from "@/app/_logic/ResumeContext";
import { useState } from "react";

export default function ResumeListPage() {
  const { resumes, loading, error, deleteResume } = useResumeContext();
  const [deleting, setDeleting] = useState<number | null>(null);

  const handleDelete = async (id: number, fullName: string) => {
    if (!confirm(`Are you sure you want to delete the resume for "${fullName}"?`)) {
      return;
    }

    try {
      setDeleting(id);
      await deleteResume(id);
    } catch (error) {
      alert(`Failed to delete resume: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffbe7]">
        <div className="text-xl text-[#ffa000]">Loading...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffbe7]">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-2 bg-[#fffbe7]">
      <div className="w-full max-w-2xl rounded-2xl shadow-lg bg-white border border-[#ffe082] p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#ffa000]">Resume List</h1>
          <Link
            href="/resume/create"
            className="px-4 py-2 bg-[#ffa000] text-white rounded-lg hover:bg-[#ff8f00] transition-colors text-sm font-medium"
          >
            Create New Resume
          </Link>
        </div>
        {resumes.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">No resumes found.</p>
            <Link
              href="/resume/create"
              className="inline-block px-6 py-3 bg-[#ffa000] text-white rounded-lg hover:bg-[#ff8f00] transition-colors font-medium"
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
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      View Resume
                    </Link>
                    <button
                      onClick={() => handleDelete(resume.id, resume.full_name)}
                      disabled={deleting === resume.id}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
