export const authConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' as const },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authorized({ auth, request: { nextUrl } }: any) {
      const isLoggedIn = !!auth?.user
      const isOnProtectedRoute = nextUrl.pathname.startsWith('/resume') ||
                                nextUrl.pathname.startsWith('/search') ||
                                nextUrl.pathname.startsWith('/todos')
      
      console.log('🛡️ Authorized callback:', {
        path: nextUrl.pathname,
        isLoggedIn,
        isOnProtectedRoute
      })
      
      // ให้ middleware จัดการ redirect แทน ตรงนี้แค่เช็คสิทธิ์
      if (isOnProtectedRoute) {
        return isLoggedIn
      }
      
      return true
    },
  },
  providers: [], // Add providers with an empty array for now
}
