"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./firebase-style.css";
import Image from "next/image";
import Link from "next/link";

export default function ResumePage() {
  const [hasToken, setHasToken] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("auth_token");
    setHasToken(!!token);
    if (!token) {
      router.replace("/authentication");
    }
  }, [router]);

  if (!hasToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffbe7]">
        <div className="text-2xl font-bold text-[#ffa000]">No information</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-2 bg-[#fffbe7]">
      <div className="w-full max-w-2xl rounded-2xl shadow-lg bg-white border border-[#ffe082] p-0 overflow-hidden">
        <div className="flex flex-col items-center py-8 px-6 bg-[#ffcb2b] relative">
          <Link
            href="/"
            className="absolute left-4 top-4 bg-white text-[#ffa000] border border-[#ffe082] rounded-full px-4 py-1 text-sm font-semibold shadow hover:bg-[#fffbe7] transition-colors"
          >
            ← Back
          </Link>
          <div className="relative w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] rounded-full overflow-hidden mb-3 border-4 border-white shadow-lg flex items-center justify-center">
            <Image
              src="/thitirat.jpg"
              alt="Thitirat Thongthaew"
              fill
              sizes="(max-width: 640px) 120px, 160px"
              className="object-cover object-top scale-[1.07]"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold text-[#22242a] mb-1">
            Thitirat Thongthaew
          </h1>
          <span className="inline-block bg-white text-[#ffa000] font-semibold rounded-full px-4 py-1 text-base mb-2 shadow-sm">
            Full Stack Developer
          </span>
          <a
            href="mailto:thitiratmay.t@gmail.com"
            className="text-[#22242a] hover:underline mb-1 font-medium"
          >
            thitiratmay.t@gmail.com
          </a>
        </div>

        <section className="px-8 py-6 border-b border-[#ffe082]">
          <h2 className="text-lg font-semibold text-[#ffa000] mb-3 tracking-wide">
            Work Experience
          </h2>
          <ul className="list-disc list-inside space-y-1 text-[#22242a] resume-firebase-detail">
            <li>
              <span className="font-bold">Orcsoft</span> - Frontend developer (5
              years) onsite at True and Dtac
            </li>
            <li>
              <span className="font-bold">Advance System Consulting</span> -
              Frontend developer (3 months) onsite at SCB Tech X
            </li>
            <li>
              <span className="font-bold">Accenture</span> - Frontend developer (7
              months) onsite at SCB
            </li>
            <li>
              <span className="font-bold">Cube Soft Tech</span> - Frontend
              developer (1 year and 2 months) onsite at AIS
            </li>
          </ul>
        </section>

        <section className="px-8 py-6 border-b border-[#ffe082]">
          <h2 className="text-lg font-semibold text-[#ffa000] mb-3 tracking-wide">
            Education
          </h2>
          <p className="text-[#22242a] resume-firebase-detail">
            Thammasat University, Major in Computer Science
          </p>
        </section>

        <section className="px-8 py-6 border-b border-[#ffe082]">
          <h2 className="text-lg font-semibold text-[#ffa000] mb-3 tracking-wide">
            Technical Skills
          </h2>
          <div className="flex flex-wrap gap-2 resume-firebase-detail">
            <span className="resume-firebase-chip">Javascript</span>
            <span className="resume-firebase-chip">Next.js</span>
            <span className="resume-firebase-chip">AngularJS</span>
            <span className="resume-firebase-chip">Flutter</span>
          </div>
        </section>

        <section className="px-8 py-6">
          <h2 className="text-lg font-semibold text-[#ffa000] mb-3 tracking-wide">
            Languages
          </h2>
          <div className="flex flex-wrap gap-2 resume-firebase-detail">
            <span className="resume-firebase-chip">Thai (Native)</span>
            <span className="resume-firebase-chip">
              English (Limited working proficiency)
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
