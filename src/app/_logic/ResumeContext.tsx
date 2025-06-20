"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Resume } from "../api/resumes/response.dto";

interface ResumeContextType {
  resumes: Resume[];
  loading: boolean;
  error: string;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
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

  return (
    <ResumeContext.Provider value={{ resumes, loading, error }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResumeContext() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResumeContext must be used within a ResumeProvider");
  return ctx;
}
