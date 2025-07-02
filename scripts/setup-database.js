const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Carregar variáveis de ambiente
require('dotenv').config();

async function setupDatabase() {
  console.log('🔧 Iniciando configuração do banco de dados...');
  
  const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'postgres',
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
  });

  try {
    // Testar conexão
    const client = await pool.connect();
    console.log('✅ Conectado ao PostgreSQL com sucesso!');
    
    // Ler e executar o script SQL
    const sqlPath = path.join(__dirname, '..', 'database-setup-users-only.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    
    console.log('📝 Executando script de configuração...');
    await client.query(sqlContent);
    
    console.log('✅ Tabela de usuários criada com sucesso!');
    console.log('✅ Usuário de teste criado: admin@soltech.com.br (senha: admin123)');
    
    // Verificar se a tabela foi criada
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'users'
    `);
    
    console.log('📊 Tabela criada:', tablesResult.rows.map(row => row.table_name));
    
    client.release();
    
  } catch (error) {
    console.error('❌ Erro ao configurar banco de dados:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.error('💡 Verifique se o PostgreSQL está rodando e as credenciais estão corretas');
    }
    
    if (error.code === '28P01') {
      console.error('💡 Verifique as credenciais do banco de dados no arquivo .env');
    }
    
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  setupDatabase();
}

module.exports = setupDatabase; 