"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Resume } from "../api/resumes/response.dto";

interface ResumeContextType {
  resumes: Resume[];
  loading: boolean;
  error: string;
  deleteResume: (id: number) => Promise<void>;
  refreshResumes: () => Promise<void>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchResumes = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/resumes");
      if (!res.ok) throw new Error("Failed to fetch resumes");
      const data: Resume[] = await res.json();
      setResumes(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error fetching resumes");
    } finally {
      setLoading(false);
    }
  };

  const deleteResume = async (id: number) => {
    try {
      const res = await fetch(`/api/resumes/${id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) {
        throw new Error('Failed to delete resume');
      }
      
      // Remove the deleted resume from state
      setResumes(prev => prev.filter(resume => resume.id !== id));
    } catch (e) {
      throw new Error(e instanceof Error ? e.message : 'Error deleting resume');
    }
  };

  const refreshResumes = async () => {
    await fetchResumes();
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <ResumeContext.Provider value={{ resumes, loading, error, deleteResume, refreshResumes }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResumeContext() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResumeContext must be used within a ResumeProvider");
  return ctx;
}
