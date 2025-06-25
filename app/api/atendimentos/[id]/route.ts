import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Fazer a requisição POST para o endpoint de forget-client
    const response = await fetch('https://n8n-production-2903.up.railway.app/webhook/rez/api/forget-client', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });

    if (!response.ok) {
      console.error(`Erro ao esquecer cliente ${id}:`, response.status, response.statusText);
      return NextResponse.json(
        { error: 'Erro ao esquecer cliente' },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: 'Cliente esquecido com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao esquecer cliente:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 