"use client";
import AuthForm from "../AuthForm";
import { useRedirectIfToken } from "../_logic/useAuthRedirect";

export default function AuthPage() {
  useRedirectIfToken();

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
