import { Resume } from "../api/resumes/response.dto";

export async function fetchResumeByIdSSR(id: number): Promise<Resume | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001"}/api/resumebyid/${id}`, { cache: "force-cache" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
