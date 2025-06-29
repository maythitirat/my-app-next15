import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    // ลบ signIn page เพื่อไม่ให้ NextAuth redirect กลับไป /authentication
    // signIn: '/authentication',
    signOut: '/',
    error: '/authentication',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log('� API ROUTE REDIRECT CALLBACK:', { url, baseUrl })
      console.log('� FORCING HOME REDIRECT FROM API ROUTE')
      // บังคับ redirect ไป home เสมอ
      return baseUrl + '/'
    },
    async jwt({ token, user, account }) {
      console.log('🔧 JWT callback:', { 
        hasToken: !!token, 
        hasUser: !!user, 
        hasAccount: !!account,
        tokenSub: token?.sub,
        userEmail: user?.email 
      })
      
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        console.log('💾 Updated token with user data')
      }
      return token
    },
    async session({ session, token }) {
      console.log('🎯 Session callback:', { 
        hasSession: !!session, 
        hasToken: !!token,
        tokenId: token?.id,
        sessionUserEmail: session?.user?.email 
      })
      
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        console.log('🔄 Updated session with token data')
      }
      return session
    },
  },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('🔍 Authorize called with:', {
          email: credentials?.email,
          hasPassword: !!credentials?.password
        })
        
        // Valid users for demo
        const validUsers = [
          { id: '1', email: 'admin@example.com', password: 'password', name: 'Admin User' },
          { id: '2', email: 'user@example.com', password: 'password', name: 'Regular User' },
          { id: '3', email: 'test@test.com', password: 'test', name: 'Test User' },
        ]
        
        // Check if credentials exist
        if (!credentials?.email || !credentials?.password) {
          console.log('❌ Missing email or password')
          return null
        }
        
        const user = validUsers.find(u => 
          u.email === credentials.email && u.password === credentials.password
        )
        
        if (user) {
          console.log('✅ Login successful for:', user.email)
          const returnUser = {
            id: user.id,
            name: user.name,
            email: user.email,
          }
          console.log('👤 Returning user object:', returnUser)
          return returnUser
        }
        
        console.log('❌ Login failed - invalid credentials for email:', credentials.email)
        return null
      },
    }),
  ],
})

export { handler as GET, handler as POST }
