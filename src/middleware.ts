import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('admin_session')
  
  // Se tentar acessar rotas do admin e NÃO estiver logado, manda pro login
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!authCookie) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  
  // Se já estiver logado e tentar ir pro login, joga pro painel
  if (request.nextUrl.pathname === '/login') {
    if (authCookie) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}