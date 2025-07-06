"use client";
import Link from "next/link";

interface BackToHomeButtonProps {
  className?: string;
  variant?: "button" | "link";
}

export default function BackToHomeButton({ 
  className = "", 
  variant = "button" 
}: BackToHomeButtonProps) {
  const baseStyles = variant === "button" 
    ? "inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
    : "inline-flex items-center text-gray-600 hover:text-gray-800 text-sm font-medium";

  return (
    <Link 
      href="/" 
      className={`${baseStyles} ${className}`}
    >
      <svg 
        className="w-4 h-4 mr-2" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M10 19l-7-7m0 0l7-7m-7 7h18" 
        />
      </svg>
      Back to Home
    </Link>
  );
}
