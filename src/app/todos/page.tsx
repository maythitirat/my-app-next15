'use client'

import TodoForm from '@/app/components/TodoForm'
import TodoList from '@/app/components/TodoList'
import { TodoProvider } from '@/app/_logic/TodoContext'

export default function TodosPage() {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                📋 Todo List
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                จัดการงานประจำวันของคุณ
              </p>
              
              {/* Email Notification Settings Link */}
              <div className="mt-4">
                <a
                  href="/line-notify"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
                >
                  � ตั้งค่า Email Notification
                </a>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
                    ➕ เพิ่มงานใหม่
                  </h2>
                  <TodoForm />
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-gray-50 dark:bg-gray-900/20 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                    📝 รายการงาน
                  </h2>
                  <TodoList />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}
