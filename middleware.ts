import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './lib/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  console.log('Middleware: Verificando rota:', pathname);

  // Rotas que não precisam de autenticação
  const publicRoutes = ['/auth', '/api/auth/login'];
  
  // Verificar se é uma rota pública
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    console.log('Middleware: Rota pública, permitindo acesso');
    return NextResponse.next();
  }

  // Verificar se é uma rota da API que não precisa de autenticação
  if (pathname.startsWith('/api/auth/')) {
    console.log('Middleware: Rota da API de auth, permitindo acesso');
    return NextResponse.next();
  }

  // Para todas as outras rotas, verificar autenticação
  const token = request.cookies.get('auth-token')?.value;

  if (!token) {
    console.log('Middleware: Token não encontrado, redirecionando para /auth');
    // Redirecionar para login se não estiver autenticado
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  // Verificar se o token é válido (agora assíncrono)
  const payload = await verifyToken(token);
  
  if (!payload) {
    console.log('Middleware: Token inválido, redirecionando para /auth');
    // Token inválido, redirecionar para login
    const response = NextResponse.redirect(new URL('/auth', request.url));
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    });
    return response;
  }

  console.log('Middleware: Token válido, permitindo acesso a', pathname);
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 