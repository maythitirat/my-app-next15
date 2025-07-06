'use client'

import TodoForm from '@/app/components/TodoForm'
import TodoList from '@/app/components/TodoList'
import { TodoProvider } from '@/app/_logic/TodoContext'
import Link from 'next/link'

export default function TodosPage() {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-black dark:to-gray-900">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
              📋 Todo Manager
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              จัดการงานประจำวันของคุณอย่างมีประสิทธิภาพ
            </p>
            
            {/* Navigation Links */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
              >
                ← กลับหน้าหลัก
              </Link>
              <Link
                href="/line-notify"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                📧 ตั้งค่า Email Notification
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Add Todo Form */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-lg">➕</span>
                  </div>
                  <h2 className="text-xl font-semibold text-black dark:text-white">
                    เพิ่มงานใหม่
                  </h2>
                </div>
                <TodoForm />
              </div>
            </div>

            {/* Todo List */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-lg">📝</span>
                  </div>
                  <h2 className="text-xl font-semibold text-black dark:text-white">
                    รายการงาน
                  </h2>
                </div>
                <TodoList />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 text-sm text-gray-500 dark:text-gray-400">
            <p>ใช้งาน Todo Manager เพื่อเพิ่มประสิทธิภาพในการทำงาน</p>
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}
