"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="absolute left-4 top-4 bg-white text-[#ffa000] border border-[#ffe082] rounded-full px-4 py-1 text-sm font-semibold shadow hover:bg-[#fffbe7] transition-colors"
    >
      ← Back
    </button>
  );
}
