import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  console.log('🔧 Simple Middleware:', {
    path: pathname,
    url: request.url,
  })

  // Define protected routes
  const isProtectedRoute = pathname.startsWith('/resume') ||
                          pathname.startsWith('/search') ||
                          pathname.startsWith('/todos')

  // For now, let all routes pass through
  // We'll handle authentication in the pages themselves
  console.log('✅ Middleware passed - allowing all routes')
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
