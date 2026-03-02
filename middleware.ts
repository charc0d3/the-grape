import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // If user hasn't completed onboarding, redirect to quiz
    // (except if they're already on onboarding pages)
    if (
      token &&
      !token.onboardingCompleted &&
      !pathname.startsWith('/onboarding') &&
      !pathname.startsWith('/api')
    ) {
      return NextResponse.redirect(new URL('/onboarding/quiz', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    '/scan/:path*',
    '/my-wines/:path*',
    '/profile/:path*',
    '/onboarding/:path*',
  ],
}
