import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../../../lib/jwt';
import pool from '../../../../lib/database';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Token não fornecido' },
        { status: 401 }
      );
    }

    const payload = await verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      );
    }

    // Buscar dados do usuário no banco
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        'SELECT id, email, name FROM users WHERE id = $1',
        [payload.userId]
      );

      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: 'Usuário não encontrado' },
          { status: 404 }
        );
      }

      const user = result.rows[0];

      return NextResponse.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      });

    } finally {
      client.release();
    }

  } catch (error) {
    console.error('Erro ao verificar autenticação:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 