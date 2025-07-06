'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createResumeAction, ActionState } from '@/app/_actions/resumeActions';

// Next.js 15 - useActionState hook
export default function CreateResumeForm() {
  const [state, formAction, isPending] = useActionState<ActionState | null, FormData>(
    createResumeAction,
    null
  );
  const router = useRouter();

  // Handle successful creation and redirect
  useEffect(() => {
    if (state?.success && state?.shouldRedirect) {
      // Redirect after showing success message briefly
      const timer = setTimeout(() => {
        router.push('/resume');
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [state?.success, state?.shouldRedirect, router]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Resume</h2>
      
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="เช่น สมชาย ใจดี"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="เช่น somchai@example.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="เช่น 081-234-5678"
          />
        </div>

        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
            Professional Summary *
          </label>
          <textarea
            id="summary"
            name="summary"
            rows={5}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="เช่น นักพัฒนา Full Stack Developer ที่มีประสบการณ์ 3 ปี เชี่ยวชาญใน React, Node.js และ PostgreSQL"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? 'Creating...' : 'Create Resume'}
        </button>
      </form>

      {state?.error && (
        <div className="mt-4 p-3 bg-gray-100 border border-gray-400 text-gray-700 rounded">
          {state.error}
        </div>
      )}

      {state?.success && (
        <div className="mt-4 p-3 bg-gray-100 border border-gray-400 text-gray-700 rounded">
          {state.success}
          {state.shouldRedirect && (
            <div className="text-sm mt-1">กำลังนำคุณไปยังหน้ารายการ resume...</div>
          )}
        </div>
      )}
    </div>
  );
}
