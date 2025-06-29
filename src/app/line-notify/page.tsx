'use client'

import { useState } from 'react'

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
          subject: '� ทดสอบ Todo Notification',
          message: 'Test message',
          todoData: testTodo
        }),
      })

      if (response.ok) {
        alert('ส่ง test email สำเร็จ! ตรวจสอบ Gmail ของคุณ')
      } else {
        const error = await response.json()
        alert(`เกิดข้อผิดพลาด: ${error.error}`)
      }
    } catch (error) {
      alert(`เกิดข้อผิดพลาด: ${error}`)
    } finally {
      setIsSendingTest(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          � Gmail SMTP Notification Settings
        </h1>

        <div className="space-y-4">
          {/* Status */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              สถานะการตั้งค่า
            </h2>
            <p className="text-blue-800 dark:text-blue-200">
              {process.env.NODE_ENV === 'development' ? (
                <>
                  ✅ Development mode - ระบบพร้อมทดสอบ<br/>
                  📋 ตรวจสอบไฟล์ .env.local ว่ามี Gmail credentials หรือไม่
                </>
              ) : (
                '🚀 Production mode'
              )}
            </p>
          </div>

          {/* Test Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={testConnection}
              disabled={isTestingConnection}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                isTestingConnection
                  ? 'bg-gray-400 cursor-not-allowed text-gray-700'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isTestingConnection ? '⏳ กำลังทดสอบ...' : '🧪 ทดสอบการเชื่อมต่อ'}
            </button>

            <button
              onClick={sendTestMessage}
              disabled={isSendingTest}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                isSendingTest
                  ? 'bg-gray-400 cursor-not-allowed text-gray-700'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              {isSendingTest ? '⏳ กำลังส่ง...' : '� ส่งอีเมลทดสอบ'}
            </button>
          </div>

          {/* Test Result */}
          {testResult && (
            <div className={`p-4 rounded-lg ${
              testResult.includes('✅') 
                ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200' 
                : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
            }`}>
              {testResult}
            </div>
          )}

          {/* Setup Guide */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              📚 วิธีการตั้งค่า Gmail SMTP
            </h3>
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">1. เปิดใช้งาน 2-Step Verification</h4>
                <p>ไปที่ <a href="https://myaccount.google.com/security" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Google Account Security</a> และเปิดใช้งาน 2-Step Verification</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">2. สร้าง App Password</h4>
                <p>ไปที่ <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Google App Passwords</a> และสร้าง password สำหรับ app</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">3. เพิ่มข้อมูลใน .env.local</h4>
                <code className="block p-3 bg-gray-800 text-green-400 rounded mt-2 whitespace-pre-wrap">
{`# Gmail SMTP Configuration
GMAIL_EMAIL=your_email@gmail.com
GMAIL_APP_PASSWORD=your_16_character_app_password
NOTIFICATION_EMAIL=recipient@gmail.com  # (optional - หากไม่กำหนดจะส่งไปที่ GMAIL_EMAIL)`}
                </code>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">4. Restart Development Server</h4>
                <code className="block p-2 bg-gray-800 text-green-400 rounded mt-1">
                  npm run dev
                </code>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
              ✨ คุณสมบัติ Email Notification
            </h3>
            <ul className="space-y-1 text-sm text-yellow-800 dark:text-yellow-200">
              <li>� ส่งอีเมลแจ้งเตือนเมื่อเพิ่ม todo ใหม่</li>
              <li>🎨 รูปแบบอีเมล HTML สวยงาม</li>
              <li>📱 รองรับการแสดงผลใน mobile</li>
              <li>🆓 ฟรี (ใช้ Gmail SMTP)</li>
              <li>🔧 ปรับแต่งได้ (subject, recipient)</li>
              <li>� แสดงรายละเอียดงานครบถ้วน</li>
            </ul>
          </div>

          {/* Back to Todos */}
          <div className="pt-4">
            <a
              href="/todos"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
            >
              ← กลับไปหน้า Todo List
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
