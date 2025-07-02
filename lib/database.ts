import { Pool } from 'pg';

// Log das configurações (sem mostrar a senha)
console.log('🔧 Configurações do banco:', {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'postgres',
  port: parseInt(process.env.DB_PORT || '5432'),
  hasPassword: !!process.env.DB_PASSWORD
});

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'postgres',
  password: process.env.DB_PASSWORD || undefined,
  port: parseInt(process.env.DB_PORT || '5432'),
});

// Testar conexão na inicialização
pool.on('connect', () => {
  console.log('✅ Conectado ao PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Erro na conexão PostgreSQL:', err.message);
});

export default pool; 