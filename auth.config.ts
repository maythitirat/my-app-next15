export const authConfig = {
  session: { strategy: 'jwt' as const },
  pages: {
    // ลบ signIn page เพื่อไม่ให้ NextAuth redirect กลับไป /authentication
    // signIn: '/authentication',
  },
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
    // เพิ่ม redirect callback ใน config ด้วย
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async redirect({ url, baseUrl }: any) {
      console.log('🟡 CONFIG REDIRECT CALLBACK:', { url, baseUrl })
      console.log('🟡 FORCING HOME REDIRECT FROM CONFIG')
      return baseUrl + '/'
    },
  },
  providers: [], // Add providers with an empty array for now
}
