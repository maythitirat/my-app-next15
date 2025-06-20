import { Resume } from "../api/resumes/response.dto";

export async function fetchAllResumesSSR(): Promise<Resume[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001"}/api/resumes`, { cache: "force-cache" });
  if (!res.ok) return [];
  return res.json();
}
