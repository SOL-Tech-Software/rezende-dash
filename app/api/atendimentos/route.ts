import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const response = await fetch('https://n8n-production-2903.up.railway.app/webhook/rez/api/chats', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Se a resposta não for ok, retornar array vazio em vez de erro
    if (!response.ok) {
      console.warn(`API retornou status ${response.status}, retornando array vazio`);
      return NextResponse.json([], { status: 200 });
    }

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.warn('Erro ao fazer parse da resposta, retornando array vazio');
      return NextResponse.json([], { status: 200 });
    }
    
    // Garantir que sempre retorne um array
    const atendimentos = Array.isArray(data) ? data : [];
    
    return NextResponse.json(atendimentos, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar dados dos chats:', error);
    // Em caso de erro, retornar array vazio em vez de erro 500
    return NextResponse.json([], { status: 200 });
  }
}
