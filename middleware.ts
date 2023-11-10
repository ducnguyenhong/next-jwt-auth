import { jwtDecode } from 'jwt-decode';
import { NextRequest, NextResponse } from 'next/server';

const LOGIN_ROUTE = '/dang-nhap';

export function middleware(req: NextRequest) {
  if (req.method !== 'GET') {
    return NextResponse.next();
  }

  const url = new URL(req.url);
  const pathname = url.pathname;

  // redirect to login page
  const token = req.cookies.get('token');
  if (!token) {
    if (pathname === LOGIN_ROUTE) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL(LOGIN_ROUTE, req.url));
  }

  const decoded = jwtDecode(token.value);
  if (!decoded || typeof decoded === 'string') {
    throw new Error('Unknown format');
  }

  // Normal process
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|logo.svg).*)'
  ]
};
