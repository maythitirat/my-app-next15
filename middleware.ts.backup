import { auth } from './auth'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default auth((req: any) => {
  // req.auth contains the session information
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  // Define protected routes
  const isProtectedRoute = nextUrl.pathname.startsWith('/resume') ||
                          nextUrl.pathname.startsWith('/linkedin') ||
                          nextUrl.pathname.startsWith('/search')

  // Redirect to authentication if not logged in and trying to access protected route
  if (isProtectedRoute && !isLoggedIn) {
    return Response.redirect(new URL('/authentication', nextUrl))
  }

  // Redirect to home if logged in and trying to access authentication page
  if (isLoggedIn && nextUrl.pathname === '/authentication') {
    return Response.redirect(new URL('/', nextUrl))
  }
})

export const config = {
  // Match all routes except API routes, static files, and images
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
