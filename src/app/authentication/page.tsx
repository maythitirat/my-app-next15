"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "../AuthForm";

export default function AuthPage() {
  const router = useRouter();
  useEffect(() => {
    const token = typeof window !== "undefined" && localStorage.getItem("auth_token");
    if (token) {
      router.replace("/");
    }
  }, [router]);

  // เมื่อ login สำเร็จ ให้ set token แล้ว redirect ไปหน้า home
  const handleAuth = () => {
    localStorage.setItem("auth_token", "1");
    // ดึงชื่อจาก localStorage ที่ AuthForm บันทึกไว้
    const name = localStorage.getItem("pending_auth_name") || "";
    localStorage.setItem("auth_name", name);
    localStorage.removeItem("pending_auth_name");
    window.location.href = "/";
  };
  return <AuthForm onAuth={handleAuth} />;
}
