import { auth } from './auth'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default auth((req: any) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const pathname = nextUrl.pathname
  const searchParams = nextUrl.searchParams.toString()

  console.log('🔧 Middleware:', {
    path: pathname,
    search: searchParams,
    isLoggedIn,
    hasAuth: !!req.auth,
    userEmail: req.auth?.user?.email,
    fullUrl: nextUrl.href,
  })

  // Define protected routes
  const isProtectedRoute = pathname.startsWith('/resume') ||
                          pathname.startsWith('/search') ||
                          pathname.startsWith('/todos')

  // Redirect to authentication if not logged in and trying to access protected route
  if (isProtectedRoute && !isLoggedIn) {
    console.log('🚫 Redirecting to /authentication - accessing protected route without auth')
    return Response.redirect(new URL('/authentication', nextUrl))
  }

  // Redirect to home if logged in and trying to access authentication page
  if (isLoggedIn && pathname === '/authentication') {
    console.log('✅ USER IS LOGGED IN but accessing /authentication - FORCING REDIRECT TO HOME')
    const homeUrl = new URL('/', nextUrl)
    return Response.redirect(homeUrl)
  }

  console.log('✅ Middleware passed - no redirect needed')
})

export const config = {
  // Match all routes except API routes, static files, and images
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
