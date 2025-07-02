# 🚀 Guia de Início Rápido

## 1. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=postgres
DB_PASSWORD=sua_senha_aqui
DB_PORT=5432
JWT_SECRET=minha-chave-secreta-super-segura-123
NODE_ENV=development
```

## 2. Configurar o Banco de Dados

Execute o script de configuração:

```bash
npm run setup-db
```

Este comando irá:
- ✅ Conectar ao PostgreSQL
- ✅ Criar a tabela `users`
- ✅ Criar um usuário de teste
- ✅ Mostrar as credenciais

## 3. Iniciar o Sistema

```bash
npm run dev
```

## 4. Fazer Login

Acesse: `http://localhost:3000`

Use as credenciais de teste:
- **Email:** admin@teste.com
- **Senha:** 123456

## 🔧 Comandos Úteis

```bash
# Configurar banco de dados
npm run setup-db

# Apenas criar tabela (sem usuário de teste)
npm run create-table

# Iniciar desenvolvimento
npm run dev

# Build para produção
npm run build
```

## ❗ Solução de Problemas

### Erro de Conexão com PostgreSQL
- Verifique se o PostgreSQL está rodando
- Confirme as credenciais no `.env.local`
- Teste a conexão: `npm run setup-db`

### Erro de Autenticação
- Verifique se a senha está correta
- Certifique-se de que o usuário tem permissões no banco

### Tabela não existe
- Execute: `npm run setup-db`
- Ou apenas: `npm run create-table` 