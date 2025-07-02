const { Pool } = require('pg');
require('dotenv').config();

async function checkTables() {
  console.log('🔍 Verificando tabelas no banco de dados...');
  
  const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'postgres',
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
  });

  try {
    const client = await pool.connect();
    console.log('✅ Conectado ao PostgreSQL!');
    
    // Verificar todas as tabelas
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log('\n📊 Tabelas encontradas:');
    if (tablesResult.rows.length === 0) {
      console.log('❌ Nenhuma tabela encontrada!');
    } else {
      tablesResult.rows.forEach(row => {
        console.log(`  - ${row.table_name}`);
      });
    }
    
    // Verificar especificamente a tabela users
    const usersResult = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'users'
      ORDER BY ordinal_position
    `);
    
    console.log('\n👥 Estrutura da tabela users:');
    if (usersResult.rows.length === 0) {
      console.log('❌ Tabela users não existe!');
    } else {
      usersResult.rows.forEach(row => {
        console.log(`  - ${row.column_name}: ${row.data_type}`);
      });
    }
    
    // Verificar se há usuários na tabela
    try {
      const usersCount = await client.query('SELECT COUNT(*) FROM users');
      console.log(`\n👤 Usuários na tabela: ${usersCount.rows[0].count}`);
    } catch (error) {
      console.log('\n❌ Erro ao contar usuários:', error.message);
    }
    
    client.release();
    
  } catch (error) {
    console.error('❌ Erro ao verificar tabelas:', error.message);
  } finally {
    await pool.end();
  }
}

checkTables(); 