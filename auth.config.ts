export const authConfig = {
  pages: {
    signIn: '/authentication',
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authorized({ auth, request: { nextUrl } }: any) {
      const isLoggedIn = !!auth?.user
      const isOnProtectedRoute = nextUrl.pathname.startsWith('/resume') ||
                                nextUrl.pathname.startsWith('/search')
      
      if (isOnProtectedRoute) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      } else if (isLoggedIn && nextUrl.pathname === '/authentication') {
        return Response.redirect(new URL('/', nextUrl))
      }
      return true
    },
  },
  providers: [], // Add providers with an empty array for now
}
