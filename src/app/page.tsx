"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('🏠 Home page loaded:', {
      hasSession: !!session,
      sessionUser: session?.user?.email,
      status: status
    })
  }, [session, status])

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

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-600"></div>
      </div>
    );
  }

  // Not authenticated
  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-black dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Resume Manager</h1>
          <p className="text-lg text-gray-600 mb-8">Please sign in to access your dashboard</p>
          <Link
            href="/authentication"
            className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Logout button */}
      <button
        className="fixed top-6 right-6 z-50 bg-gray-900 text-white font-semibold px-4 py-2 rounded shadow hover:bg-gray-700 transition-colors"
        onClick={() => signOut()}
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
          <Link
            href="/resume"
            className="text-lg font-semibold text-gray-700 hover:underline"
            onClick={() => setOpen(false)}
          >
            Resume Management
          </Link>
          <a
            href="/search"
            className="text-lg font-semibold text-gray-700 hover:underline"
            onClick={() => setOpen(false)}
          >
            🔍 Search Resumes
          </a>
          <Link
            href="/resume/create"
            className="text-lg font-semibold text-gray-700 hover:underline"
            onClick={() => setOpen(false)}
          >
            ➕ Create Resume
          </Link>
          <Link
            href="/todos"
            className="text-lg font-semibold text-gray-700 hover:underline"
            onClick={() => setOpen(false)}
          >
            📋 Todo List
          </Link>
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
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-white/90 dark:bg-gray-800/90 rounded px-4 py-2 shadow text-center text-sm text-gray-800 dark:text-gray-200 font-medium">
        {session.user?.name && <span>👤 {session.user.name} </span>}
        {session.user?.email && <span> | 📧 {session.user.email}</span>}
      </div>
    </div>
  );
}
