import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    // Google Provider (จะทำงานเมื่อมี credentials เท่านั้น)
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET 
      ? [Google({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })]
      : []
    ),
    
    // GitHub Provider (จะทำงานเมื่อมี credentials เท่านั้น)
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ? [GitHub({
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
        })]
      : []
    ),
    
    // Credentials Provider (for custom login)
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('Authorize called with:', credentials)
        
        // You can implement your own authentication logic here
        // For now, we'll use a simple mock authentication
        const validUsers = [
          { id: '1', email: 'admin@example.com', password: 'password', name: 'Admin User' },
          { id: '2', email: 'user@example.com', password: 'password', name: 'Regular User' },
          { id: '3', email: 'test@test.com', password: 'test', name: 'Test User' },
        ]
        
        const user = validUsers.find(u => 
          u.email === credentials?.email && u.password === credentials?.password
        )
        
        if (user) {
          console.log('Login successful for', user.email)
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          }
        }
        
        console.log('Login failed - invalid credentials')
        return null
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log('� CUSTOM REDIRECT CALLBACK TRIGGERED:', { url, baseUrl })
      console.log('� FORCING REDIRECT TO HOME REGARDLESS OF INPUT')
      // บังคับ redirect ไป home เสมอ ไม่สนใจ URL ที่ส่งมา
      const homeUrl = baseUrl + '/'
      console.log('🔴 RETURNING:', homeUrl)
      return homeUrl
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})
