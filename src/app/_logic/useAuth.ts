import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuthToken() {
  const [hasToken, setHasToken] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.replace("/authentication");
    } else {
      setHasToken(true);
    }
  }, [router]);

  return hasToken;
}

export function useUserInfo() {
  const [ip, setIp] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("/api/get-ip")
      .then((res) => res.json())
      .then((data) => setIp(data.ip || ""));
    const n = localStorage.getItem("auth_name");
    setName(n || "");
  }, []);

  return { ip, name };
}
