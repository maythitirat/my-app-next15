import { Resume } from "../api/resumes/response.dto";

export async function getResumeById(id: number): Promise<Resume | null> {
  const res = await fetch("/api/resumes", { next: { revalidate: 0 } });
  if (!res.ok) return null;
  const resumes: Resume[] = await res.json();
  return resumes.find(r => r.id === id) || null;
}
