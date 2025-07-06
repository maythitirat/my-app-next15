'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function EmailNotifyTest() {
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [testResult, setTestResult] = useState<string | null>(null)
  const [isSendingTest, setIsSendingTest] = useState(false)

  const testConnection = async () => {
    setIsTestingConnection(true)
    setTestResult(null)
    
    try {
      const response = await fetch('/api/line-notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          subject: '🧪 ทดสอบการเชื่อมต่อ Gmail SMTP',
          message: '🧪 ทดสอบการเชื่อมต่อ Gmail SMTP\n\nหากคุณเห็นอีเมลนี้ แสดงว่าระบบทำงานปกติ! ✅',
          todoData: null
        }),
      })

      if (response.ok) {
        setTestResult('✅ ส่งอีเมลสำเร็จ! ตรวจสอบ Gmail ของคุณ')
      } else {
        const error = await response.json()
        setTestResult(`❌ เกิดข้อผิดพลาด: ${error.error}`)
      }
    } catch (error) {
      setTestResult(`❌ เกิดข้อผิดพลาดในการเชื่อมต่อ: ${error}`)
    } finally {
      setIsTestingConnection(false)
    }
  }

  const sendTestMessage = async () => {
    setIsSendingTest(true)
    
    try {
      const testTodo = {
        id: 'test-' + Date.now(),
        title: 'ทดสอบระบบ Email Notification',
        description: 'นี่คือการทดสอบระบบส่งอีเมลแจ้งเตือนเมื่อเพิ่ม Todo ใหม่',
        category: 'ทดสอบระบบ',
        priority: 'medium' as const,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 วันข้างหน้า
        completed: false,
        createdAt: new Date().toISOString()
      }

      const response = await fetch('/api/line-notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: '📧 การแจ้งเตือน Todo ใหม่ - ระบบทดสอบ',
          message: `📧 **การแจ้งเตือน Todo ใหม่**

🔖 **หัวข้อ:** ${testTodo.title}
📝 **รายละเอียด:** ${testTodo.description}
📂 **หมวดหมู่:** ${testTodo.category}
⭐ **ความสำคัญ:** ${testTodo.priority}
📅 **กำหนดเสร็จ:** ${testTodo.dueDate}

✨ ระบบทำงานได้ปกติแล้ว!`,
          todoData: testTodo
        }),
      })

      if (response.ok) {
        setTestResult('✅ ส่งอีเมลทดสอบ Todo สำเร็จ! ตรวจสอบ Gmail ของคุณ')
      } else {
        const error = await response.json()
        setTestResult(`❌ เกิดข้อผิดพลาด: ${error.error}`)
      }
    } catch (error) {
      setTestResult(`❌ เกิดข้อผิดพลาดในการส่งอีเมล: ${error}`)
    } finally {
      setIsSendingTest(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-black dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            📧 Email Notification Settings
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            ตั้งค่าและทดสอบระบบแจ้งเตือนทาง Email
          </p>
          
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link
              href="/todos"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              ← กลับไปที่ Todo
            </Link>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              🏠 หน้าหลัก
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Test Connection Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mr-3">
                <span className="text-lg">🔗</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                ทดสอบการเชื่อมต่อ
              </h2>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              ทดสอบการเชื่อมต่อระบบ Gmail SMTP เพื่อแน่ใจว่าสามารถส่งอีเมลได้
            </p>
            
            <button
              onClick={testConnection}
              disabled={isTestingConnection}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              {isTestingConnection ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  กำลังทดสอบ...
                </>
              ) : (
                '🧪 ทดสอบการเชื่อมต่อ'
              )}
            </button>
          </div>

          {/* Test Todo Notification Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mr-3">
                <span className="text-lg">📝</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                ทดสอบการแจ้งเตือน Todo
              </h2>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              ส่งอีเมลทดสอบในรูปแบบการแจ้งเตือน Todo ใหม่
            </p>
            
            <button
              onClick={sendTestMessage}
              disabled={isSendingTest}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              {isSendingTest ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  กำลังส่ง...
                </>
              ) : (
                '📧 ส่งอีเมลทดสอบ Todo'
              )}
            </button>
          </div>

          {/* Result Display */}
          {testResult && (
            <div className={`rounded-xl p-4 ${
              testResult.includes('✅') 
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700' 
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700'
            }`}>
              <p className={`font-medium ${
                testResult.includes('✅') 
                  ? 'text-green-800 dark:text-green-200' 
                  : 'text-red-800 dark:text-red-200'
              }`}>
                {testResult}
              </p>
            </div>
          )}

          {/* Configuration Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center mr-3">
                <span className="text-lg">⚙️</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                การตั้งค่าระบบ
              </h2>
            </div>
            
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                ระบบใช้ Gmail SMTP สำหรับการส่งอีเมล
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                อีเมลจะถูกส่งอัตโนมัติเมื่อมีการเพิ่ม Todo ใหม่
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                สามารถปรับแต่งการตั้งค่าใน Environment Variables
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-gray-500 dark:text-gray-400">
          <p>ระบบแจ้งเตือนจะช่วยให้คุณไม่พลาดงานสำคัญ</p>
        </div>
      </div>
    </div>
  )
}
