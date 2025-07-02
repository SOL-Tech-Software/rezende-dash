-- Script de configuração do banco de dados - Apenas tabela de usuários
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
    '$2b$10$agW3E45ijw5S3kIR3vgOEeCQ3WsQwAbT./eDT3Jx.WR02rVxHhiVa', -- senha: admin123
    'Administrador'
) ON CONFLICT (email) DO NOTHING;

-- Comentário sobre a tabela
COMMENT ON TABLE users IS 'Tabela de usuários do sistema'; 