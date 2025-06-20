import { Resume } from "../api/resumes/response.dto";

/**
 * รับ name (first name) และ resumes array แล้ว return Resume ที่ match หรือ null
 * ไม่ fetch API ใหม่ แต่ filter จาก resumes ที่รับมา (ใช้ได้ทั้ง client/server)
 */
export function getResumePageDataFromList(name: string, resumes: Resume[]): Resume | null {
  return resumes.find(r => r.full_name.split(" ")[0].toLowerCase() === name.toLowerCase()) || null;
}
