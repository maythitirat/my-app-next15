"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Resume } from "../api/resumes/response.dto";

export default function ResumeListPage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/resumes")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch resumes");
        return res.json();
      })
      .then((data: Resume[]) => {
        setResumes(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message || "Error fetching resumes");
        setLoading(false);
      });
  }, []);

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
            const namePath = resume.full_name.split(" ")[0].toLowerCase();
            return (
              <li key={resume.id} className="border-b pb-4">
                <div className="font-bold text-lg">{resume.full_name}</div>
                <div className="text-sm text-gray-600 mb-2">{resume.summary}</div>
                <Link
                  href={`/resume/${namePath}`}
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
