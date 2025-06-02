import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Public routes that don't require authentication
const publicRoute = '/';


export async function middleware(request: NextRequest) {
  const token = request.cookies.get('aitoken')?.value;
  
  // Check if the current route is a public route
  const isPublicRoute = publicRoute == request.nextUrl.pathname;
  
  // If no token and not a public route, redirect to login
  if (!token && !isPublicRoute) {
    const loginUrl = new URL('/', request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  // Fallback - should not reach here in normal flow
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'], // Exclude static files, assets, and API routes
};