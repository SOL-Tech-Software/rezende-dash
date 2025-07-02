import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '../../../../lib/database';
import { generateToken } from '../../../../lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // Buscar usuário no banco de dados
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        'SELECT id, email, password FROM users WHERE email = $1',
        [email]
      );

      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: 'Credenciais inválidas' },
          { status: 401 }
        );
      }

      const user = result.rows[0];

      // Verificar senha
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return NextResponse.json(
          { error: 'Credenciais inválidas' },
          { status: 401 }
        );
      }

      // Gerar token JWT
      const token = await generateToken({
        userId: user.id,
        email: user.email,
      });

      // Criar resposta com cookie
      const response = NextResponse.json(
        { 
          message: 'Login realizado com sucesso',
          user: {
            id: user.id,
            email: user.email,
          }
        },
        { status: 200 }
      );

      // Configurar cookie HTTP-only
      response.cookies.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax', // Mudando para 'lax' para desenvolvimento
        maxAge: 24 * 60 * 60, // 24 horas
        path: '/',
      });
      
      console.log('Cookie auth-token definido com sucesso');

      return response;

    } finally {
      client.release();
    }

  } catch (error: any) {
    console.error('Erro no login:', error);
    
    // Tratamento específico para erros de conexão
    if (error.code === '28P01') {
      return NextResponse.json(
        { error: 'Credenciais do banco de dados inválidas' },
        { status: 500 }
      );
    }
    
    if (error.code === 'ECONNREFUSED') {
      return NextResponse.json(
        { error: 'Não foi possível conectar ao banco de dados' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 