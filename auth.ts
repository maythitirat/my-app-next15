import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/authentication',
  },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('🔐 LOGIN ATTEMPT:', credentials?.email)
        
        if (!credentials?.email || !credentials?.password) {
          console.log('❌ NO CREDENTIALS')
          return null
        }
        
        // ข้อมูล user ทดสอบ
        const users = [
          { id: '1', email: 'admin@example.com', password: 'password', name: 'Admin User' },
          { id: '2', email: 'user@example.com', password: 'password', name: 'Regular User' },
          { id: '3', email: 'test@test.com', password: 'test', name: 'Test User' },
        ]
        
        const user = users.find(u => 
          u.email === credentials.email && u.password === credentials.password
        )
        
        if (user) {
          console.log('✅ LOGIN SUCCESS:', user.email)
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          }
        }
        
        console.log('❌ LOGIN FAILED')
        return null
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        console.log('🔑 JWT CREATED for:', user.email)
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        console.log('👤 SESSION CREATED for:', session.user.email)
      }
      return session
    },
  },
})
