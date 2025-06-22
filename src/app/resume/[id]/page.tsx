import { notFound } from "next/navigation";
import Image from "next/image";
import type { Resume } from "../../api/resumes/response.dto";
import { formatDate, getYearDiff } from "@/app/_utils/resumeFormatUtils";
import BackButton from "@/app/components/BackButton";
import { fetchResumeByIdSSR } from "@/app/_utils/fetchResumeByIdSSR";

// SSR for SEO - fetch resume detail by id directly
export default async function ResumeIdPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const resumeId = parseInt(id);
  
  if (isNaN(resumeId)) return notFound();
  
  // SSR: fetch resume detail ด้วย id จาก resumebyid API (เรียกครั้งเดียว)
  const resumeDetail: Resume | null = await fetchResumeByIdSSR(resumeId);
  if (!resumeDetail) return notFound();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-2 bg-[#fffbe7]">
      <div className="w-full max-w-2xl rounded-2xl shadow-lg bg-white border border-[#ffe082] p-0 overflow-hidden">
        <div className="flex flex-col items-center py-8 px-6 bg-[#ffcb2b] relative">
          <BackButton />
          <div className="relative w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] rounded-full overflow-hidden mb-3 border-4 border-white shadow-lg flex items-center justify-center">
            <Image
              src={resumeDetail.id === 1 ? "/thitirat.jpg" : "/file.svg"}
              alt={resumeDetail.full_name}
              fill
              sizes="(max-width: 640px) 120px, 160px"
              className="object-cover object-top scale-[1.07]"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold text-[#22242a] mb-1">
            {resumeDetail.full_name}
          </h1>
          <span className="inline-block bg-white text-[#ffa000] font-semibold rounded-full px-4 py-1 text-base mb-2 shadow-sm">
            {resumeDetail.summary}
          </span>
          <a
            href={`mailto:${resumeDetail.email}`}
            className="text-[#22242a] hover:underline mb-1 font-medium"
          >
            {resumeDetail.email}
          </a>
          <div className="text-[#22242a] text-sm mb-1">{resumeDetail.phone}</div>
        </div>

        <section className="px-8 py-6 border-b border-[#ffe082]">
          <h2 className="text-lg font-semibold text-[#ffa000] mb-3 tracking-wide">
            Work Experience
          </h2>
          <ul className="list-disc list-inside space-y-1 text-[#22242a] resume-firebase-detail">
            {resumeDetail.experiences.map((exp) => (
              <li key={exp.id}>
                <span className="font-bold">{exp.company_name}</span> {exp.job_title} ({getYearDiff(exp.start_date, exp.end_date)} years)
                <div className="text-sm text-gray-600">{exp.description}</div>
              </li>
            ))}
          </ul>
        </section>

        <section className="px-8 py-6 border-b border-[#ffe082]">
          <h2 className="text-lg font-semibold text-[#ffa000] mb-3 tracking-wide">
            Education
          </h2>
          {resumeDetail.educations.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="font-bold">{edu.school_name}</div>
              <div>
                {edu.degree}, {edu.field_of_study}
              </div>
              <div className="text-sm text-gray-600">
                {formatDate(edu.start_date)} - {formatDate(edu.end_date)} | Grade: {edu.grade}
              </div>
              <div className="text-sm text-gray-600">{edu.description}</div>
            </div>
          ))}
        </section>

        <section className="px-8 py-6 border-b border-[#ffe082]">
          <h2 className="text-lg font-semibold text-[#ffa000] mb-3 tracking-wide">
            Technical Skills
          </h2>
          <div className="flex flex-wrap gap-2 resume-firebase-detail">
            {resumeDetail.skills.map((skill) => (
              <span key={skill} className="resume-firebase-chip">
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
