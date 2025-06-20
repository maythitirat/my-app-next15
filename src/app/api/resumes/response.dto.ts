export interface Resume {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  summary: string;
  created_at: string;
  educations: Education[];
  experiences: Experience[];
  skills: string[];
}

export interface Education {
  id: number;
  resume_id: number;
  school_name: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string;
  grade: string;
  description: string;
}

export interface Experience {
  id: number;
  resume_id: number;
  job_title: string;
  company_name: string;
  start_date: string;
  end_date: string;
  description: string;
}

export type ResumeResponse = Resume[];
