import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const session = await auth()
  const { pathname } = request.nextUrl

  // Proteger rutas de dashboard
  if (pathname.startsWith('/dashboard')) {
    if (!session) {
      const loginUrl = new URL('/auth/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Redirigir usuarios autenticados lejos de páginas de auth
  if (pathname.startsWith('/auth/login') || pathname.startsWith('/auth/register')) {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
}
