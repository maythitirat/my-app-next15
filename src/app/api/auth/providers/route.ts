import { NextResponse } from 'next/server'

export async function GET() {
  const providers = {
    google: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
    github: !!(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET),
    credentials: true // Always available
  }

  return NextResponse.json(providers)
}
