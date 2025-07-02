# Configuração do Sistema de Autenticação

## 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# Configurações do Banco de Dados PostgreSQL
DB_USER=postgres
DB_HOST=localhost
DB_NAME=your_database_name
DB_PASSWORD=your_password
DB_PORT=5432

# Chave secreta para JWT (mude em produção!)
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Ambiente
NODE_ENV=development
```

## 2. Estrutura da Tabela Users

Certifique-se de que sua tabela `users` no PostgreSQL tenha pelo menos os seguintes campos:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Importante:** As senhas devem estar hasheadas com bcrypt. Se você já tem usuários na tabela, você precisará atualizar as senhas para o formato bcrypt.

## 3. Como Hashar Senhas

Para criar um hash de senha compatível com o sistema:

```javascript
const bcrypt = require('bcryptjs');
const hashedPassword = bcrypt.hashSync('sua_senha_aqui', 10);
console.log(hashedPassword);
```

## 4. Testando o Sistema

1. Configure as variáveis de ambiente
2. Certifique-se de que o PostgreSQL está rodando
3. Execute `npm run dev`
4. Acesse `http://localhost:3000/auth`
5. Use as credenciais de um usuário existente na sua tabela

## 5. Funcionalidades Implementadas

- ✅ Login com email e senha
- ✅ Verificação de credenciais no banco PostgreSQL
- ✅ Geração de JWT tokens
- ✅ Cookies HTTP-only seguros
- ✅ Middleware de proteção de rotas
- ✅ Logout automático
- ✅ Redirecionamento automático para login
- ✅ Contexto de autenticação no frontend
- ✅ Botão de logout no navbar

## 6. Rotas Protegidas

Todas as rotas exceto `/auth` e `/api/auth/*` são protegidas pelo middleware. Usuários não autenticados serão redirecionados automaticamente para a página de login.

## 7. Segurança

- Senhas hasheadas com bcrypt
- JWT tokens com expiração de 24 horas
- Cookies HTTP-only para armazenamento seguro
- Middleware que verifica tokens em todas as rotas protegidas
- Redirecionamento automático em caso de token inválido 