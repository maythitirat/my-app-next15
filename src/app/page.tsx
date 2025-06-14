"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const [hasToken, setHasToken] = useState(false);
  const [open, setOpen] = useState(false);
  const [ip, setIp] = useState("");
  const [name, setName] = useState("");
  const navRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // ปิดเมนูเมื่อคลิกนอก navigation
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.replace("/authentication");
    } else {
      setHasToken(true);
    }
  }, [router]);

  useEffect(() => {
    // ดึง IP
    fetch("/api/get-ip")
      .then((res) => res.json())
      .then((data) => setIp(data.ip || ""));
    // ดึงชื่อจาก localStorage (ถ้าเก็บไว้ตอน login)
    const n = localStorage.getItem("auth_name");
    setName(n || "");
  }, []);

  if (!hasToken) return null;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Logout button */}
      <button
        className="fixed top-6 right-6 z-50 bg-[#ffcb2b] text-[#22242a] font-semibold px-4 py-2 rounded shadow hover:bg-[#ffe082] transition-colors"
        onClick={() => {
          localStorage.removeItem("auth_token");
          window.location.href = "/authentication";
        }}
      >
        Log out
      </button>
      {/* Burger menu button */}
      <button
        className="fixed top-6 left-6 z-50 flex flex-col gap-1.5 w-10 h-10 justify-center items-center bg-white/80 dark:bg-black/40 rounded shadow-md"
        aria-label="Open menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="block w-6 h-0.5 bg-black dark:bg-white rounded" />
        <span className="block w-6 h-0.5 bg-black dark:bg-white rounded" />
        <span className="block w-6 h-0.5 bg-black dark:bg-white rounded" />
      </button>
      {/* Slide-in navigation */}
      <div
        className={`fixed inset-0 z-40 transition-colors duration-300 ${
          open ? "bg-black/40" : "bg-transparent pointer-events-none"
        }`}
        aria-hidden={!open}
      />
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-black shadow-lg transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ willChange: "transform" }}
        aria-label="Sidebar navigation"
      >
        <div className="flex flex-col gap-6 p-8 pt-20">
          <a
            href="/linkedin"
            className="text-lg font-semibold text-blue-700 hover:underline"
            onClick={() => setOpen(false)}
          >
            LinkedIn: Company Posts
          </a>
          <a
            href="/linkedin/searchpeople"
            className="text-lg font-semibold text-blue-700 hover:underline"
            onClick={() => setOpen(false)}
          >
            LinkedIn: Search People
          </a>
          <a
            href="/resume"
            className="text-lg font-semibold text-blue-700 hover:underline"
            onClick={() => setOpen(false)}
          >
            Resume
          </a>
        </div>
      </nav>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-white/80 rounded px-4 py-2 shadow text-center text-sm text-[#22242a] font-medium">
        {name && <span>👤 {name} </span>}
        {ip && <span> | 🌐 {ip}</span>}
      </div>
    </div>
  );
}
