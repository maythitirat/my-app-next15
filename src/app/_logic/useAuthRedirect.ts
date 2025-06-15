import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useRedirectIfToken() {
  const router = useRouter();
  useEffect(() => {
    const token = typeof window !== "undefined" && localStorage.getItem("auth_token");
    if (token) {
      router.replace("/");
    }
  }, [router]);
}
