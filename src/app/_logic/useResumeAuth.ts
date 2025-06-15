import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useResumeAuth() {
  const router = useRouter();
  useEffect(() => {
    const token = typeof window !== "undefined" && localStorage.getItem("auth_token");
    if (!token) {
      router.replace("/authentication");
    }
  }, [router]);
  return typeof window !== "undefined" && !!localStorage.getItem("auth_token");
}
