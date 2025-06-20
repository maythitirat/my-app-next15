import { useEffect, useState } from "react";
import type { Resume } from "../api/resumes/response.dto";

export function useResume() {
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/resumes")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch resumes");
        return res.json();
      })
      .then((data: Resume[]) => {
        setResume(data[0] || null); // Show the first resume
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message || "Error fetching resumes");
        setLoading(false);
      });
  }, []);

  return { resume, loading, error };
}
