'use client'

import { signIn, getSession } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import BackToHomeButton from "@/app/components/BackToHomeButton"

// Component สำหรับเช็คว่า OAuth providers พร้อมใช้งานหรือไม่
function AuthProviders() {
  const [providers, setProviders] = useState({
    google: false,
    github: false,
    loading: true
  })

  useEffect(() => {
    // เรียก API เพื่อเช็คว่า provider ไหนพร้อมใช้งาน
    fetch('/api/auth/providers')
      .then(res => res.json())
      .then(data => {
        setProviders({
          google: !!data.google,
          github: !!data.github,
          loading: false
        })
      })
      .catch(() => {
        setProviders({
          google: false,
          github: false,
          loading: false
        })
      })
  }, [])

  if (providers.loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse bg-gray-200 h-12 rounded-lg"></div>
        <div className="animate-pulse bg-gray-200 h-12 rounded-lg"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* แสดงข้อความแจ้งเตือนถ้าไม่มี OAuth credentials */}
      {!providers.google && !providers.github && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <div className="flex">
            <svg className="w-5 h-5 text-yellow-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
            </svg>
            <div>
              <p className="text-sm text-yellow-800">
                <strong>OAuth ยังไม่ได้ตั้งค่า:</strong> ดู <code className="bg-yellow-100 px-1 rounded">OAUTH_SETUP.md</code> เพื่อตั้งค่า Google/GitHub login
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Google Sign In - แสดงเฉพาะเมื่อมี credentials */}
      {providers.google && (
        <button
          onClick={() => signIn('google')}
          className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>
      )}

      {/* GitHub Sign In - แสดงเฉพาะเมื่อมี credentials */}
      {providers.github && (
        <button
          onClick={() => signIn('github')}
          className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-gray-900 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
        >
          <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
          </svg>
          Continue with GitHub
        </button>
      )}
    </div>
  )
}

export default function AuthenticationPage() {
  const { data: session, status } = useSession()
  
  // If already logged in, redirect to home immediately
  useEffect(() => {
    if (session) {
      console.log('👤 Session detected in /authentication, redirecting to home')
      window.location.replace('/')
    }
  }, [session])

  const handleDirectLogin = async () => {
    alert('🚀 Direct Test Login clicked!')
    console.log('🚀 DIRECT TEST LOGIN BUTTON CLICKED!')
    
    try {
      console.log('🔄 Testing direct signin...')
      const result = await signIn('credentials', {
        email: 'admin@example.com',
        password: 'password',
        redirect: false,
      })
      
      console.log('📋 Direct signin result:', result)
      console.log('📋 Direct result details:', {
        ok: result?.ok,
        status: result?.status,
        error: result?.error,
        url: result?.url
      })
      
      if (result?.ok) {
        console.log('✅ Direct login successful!')
        alert('✅ Login successful! Refreshing session...')
        
        // Refresh session เพื่อให้ middleware ตรวจจับได้
        await getSession()
        await new Promise(resolve => setTimeout(resolve, 200))
        
        console.log('🔄 Session refreshed, now redirecting...')
        alert('🔄 Redirecting to home...')
        window.location.replace('/')
      } else {
        console.error('❌ Direct login failed:', result?.error)
        alert('❌ Login failed: ' + (result?.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('💥 Direct signin error:', error)
      alert('💥 Error: ' + error)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
      </div>
    )
  }

  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to home...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Back to Home Button */}
        <div className="text-left">
          <BackToHomeButton variant="link" className="text-gray-600 hover:text-gray-800" />
        </div>
        
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome Back!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your resume management dashboard
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          {/* OAuth Providers */}
          <AuthProviders />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-br from-yellow-50 to-amber-100 text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Credentials Sign In Form */}
          <form onSubmit={async (e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const email = formData.get('email') as string
            const password = formData.get('password') as string
            
            console.log('Attempting to sign in with:', { email, password })
            
            try {
              console.log('🔄 Form signin attempt...')
              const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
              })
              
              console.log('📋 Form signin result:', result)
              
              if (result?.ok) {
                console.log('✅ Login successful, refreshing session and redirecting to home')
                await getSession()
                await new Promise(resolve => setTimeout(resolve, 200))
                console.log('🔄 Session refreshed, now redirecting...')
                window.location.replace('/')
              } else {
                console.error('❌ Login failed:', result?.error)
                alert('เข้าสู่ระบบไม่สำเร็จ: ' + (result?.error || 'Unknown error'))
              }
            } catch (error) {
              console.error('💥 Form signin error:', error)
              alert('เกิดข้อผิดพลาดในการเข้าสู่ระบบ: ' + error)
            }
          }}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                placeholder="password"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
            >
              Sign in with credentials
            </button>
          </form>

          <div className="text-center text-sm text-gray-600 bg-amber-50 p-3 rounded-lg">
            <p className="font-medium text-amber-800">Demo credentials for testing:</p>
            <div className="space-y-1 mt-2">
              <p><strong>Admin:</strong> admin@example.com / password</p>
              <p><strong>User:</strong> user@example.com / password</p>
              <p><strong>Test:</strong> test@test.com / test</p>
            </div>
            
            {/* Quick login buttons */}
            <div className="mt-3 space-y-2">
              <button
                type="button"
                onClick={() => {
                  const emailEl = document.getElementById('email') as HTMLInputElement
                  const passwordEl = document.getElementById('password') as HTMLInputElement
                  if (emailEl) emailEl.value = 'admin@example.com'
                  if (passwordEl) passwordEl.value = 'password'
                }}
                className="w-full px-3 py-2 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
              >
                🔸 Auto-fill Admin
              </button>
              
              <button
                type="button"
                onClick={() => alert('Simple test button works!')}
                className="w-full px-3 py-2 text-xs bg-green-100 text-green-800 rounded hover:bg-green-200 transition-colors"
              >
                🧪 Simple Test Button
              </button>
              
              <button
                type="button"
                onClick={handleDirectLogin}
                className="w-full px-3 py-2 text-xs bg-orange-100 text-orange-800 rounded hover:bg-orange-200 transition-colors"
              >
                🚀 Direct Test Login (Admin)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
