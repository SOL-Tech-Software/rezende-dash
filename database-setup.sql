-- Script de configuração do banco de dados para o Whitelabel Dashboard N8N
-- Execute este script no seu banco PostgreSQL

-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar índice para melhor performance nas consultas por email
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Inserir um usuário de teste (senha: admin123)
-- A senha deve ser hasheada com bcrypt
INSERT INTO users (email, password, name) 
VALUES (
    'admin@soltech.com.br', 
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- senha: admin123
    'Administrador'
) ON CONFLICT (email) DO NOTHING;

-- Criar tabela de atendimentos (se necessário para o dashboard)
CREATE TABLE IF NOT EXISTS atendimentos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    status VARCHAR(50) DEFAULT 'aberto',
    prioridade VARCHAR(20) DEFAULT 'normal',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de mensagens (se necessário para o dashboard)
CREATE TABLE IF NOT EXISTS mensagens (
    id SERIAL PRIMARY KEY,
    atendimento_id INTEGER REFERENCES atendimentos(id) ON DELETE CASCADE,
    conteudo TEXT NOT NULL,
    tipo VARCHAR(20) DEFAULT 'texto',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Comentários sobre as tabelas
COMMENT ON TABLE users IS 'Tabela de usuários do sistema';
COMMENT ON TABLE atendimentos IS 'Tabela de atendimentos/tickets';
COMMENT ON TABLE mensagens IS 'Tabela de mensagens dos atendimentos'; 