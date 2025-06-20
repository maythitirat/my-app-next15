import { ResumeResponse } from "../api/resumes/response.dto";

export async function getResumesFromApi(): Promise<ResumeResponse> {
  const res = await fetch("https://m23bxip04j.execute-api.ap-southeast-1.amazonaws.com/resumes", {
    headers: { "Content-Type": "application/json" },
    cache: "no-store"
  });
  if (!res.ok) throw new Error("Failed to fetch resumes from API");
  return res.json();
}
