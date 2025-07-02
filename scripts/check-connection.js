require('dotenv').config();

console.log('🔧 Configurações de conexão do banco:');
console.log('=====================================');
console.log('DB_USER:', process.env.DB_USER || 'postgres (padrão)');
console.log('DB_HOST:', process.env.DB_HOST || 'localhost (padrão)');
console.log('DB_NAME:', process.env.DB_NAME || 'postgres (padrão)');
console.log('DB_PORT:', process.env.DB_PORT || '5432 (padrão)');
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '***configurado***' : '❌ NÃO CONFIGURADO');
console.log('');

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'postgres',
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

async function checkConnection() {
  try {
    const client = await pool.connect();
    console.log('✅ Conectado com sucesso!');
    
    // Verificar qual banco estamos conectados
    const dbResult = await client.query('SELECT current_database() as db, current_user as user');
    console.log('📊 Banco atual:', dbResult.rows[0].db);
    console.log('👤 Usuário atual:', dbResult.rows[0].user);
    
    // Listar todos os bancos disponíveis
    const databasesResult = await client.query('SELECT datname FROM pg_database WHERE datistemplate = false');
    console.log('\n🗄️ Bancos disponíveis:');
    databasesResult.rows.forEach(row => {
      console.log(`  - ${row.datname}`);
    });
    
    // Verificar tabelas no banco atual
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log('\n📋 Tabelas no banco atual:');
    if (tablesResult.rows.length === 0) {
      console.log('  ❌ Nenhuma tabela encontrada');
    } else {
      tablesResult.rows.forEach(row => {
        console.log(`  - ${row.table_name}`);
      });
    }
    
    client.release();
    
  } catch (error) {
    console.error('❌ Erro de conexão:', error.message);
    console.error('Código do erro:', error.code);
  } finally {
    await pool.end();
  }
}

checkConnection(); 