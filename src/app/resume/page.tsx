"use client";
import Link from "next/link";
import { useResumeContext } from "@/app/_logic/ResumeContext";

export default function ResumeListPage() {
  const { resumes, loading, error } = useResumeContext();

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
        <h1 className="text-2xl font-bold mb-6 text-[#ffa000]">Resume List</h1>
        <ul className="space-y-4">
          {resumes.map((resume) => {
            return (
              <li key={resume.id} className="border-b pb-4">
                <div className="font-bold text-lg">{resume.full_name}</div>
                <div className="text-sm text-gray-600 mb-2">{resume.summary}</div>
                <Link
                  href={`/resume/${resume.id}`}
                  className="text-blue-600 underline text-sm"
                >
                  View Resume
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
