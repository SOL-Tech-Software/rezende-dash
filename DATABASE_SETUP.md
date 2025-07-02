# Configuração do Banco de Dados

## Problema
O erro `relation "users" does not exist` indica que a tabela de usuários não foi criada no banco de dados PostgreSQL.

## Solução

### 1. Verificar Configuração do Banco

Certifique-se de que você tem um arquivo `.env` na raiz do projeto com as seguintes configurações:

```env
# Configurações do Banco de Dados PostgreSQL
DB_USER=postgres
DB_HOST=localhost
DB_NAME=postgres
DB_PASSWORD=sua_senha_aqui
DB_PORT=5432

# Chave secreta para JWT
JWT_SECRET=minha-chave-secreta-super-segura-123

# Ambiente
NODE_ENV=development
```

### 2. Executar Script de Configuração

Execute o comando para criar as tabelas necessárias:

```bash
npm run setup-db
```

Este comando irá:
- Conectar ao banco PostgreSQL
- Criar a tabela `users`
- Criar a tabela `atendimentos`
- Criar a tabela `mensagens`
- Inserir um usuário de teste

### 3. Usuário de Teste

Após executar o script, você terá um usuário de teste criado:

- **Email:** admin@soltech.com.br
- **Senha:** admin123

### 4. Verificação Manual (Opcional)

Se preferir executar manualmente, você pode:

1. Conectar ao PostgreSQL:
```bash
psql -U postgres -d postgres
```

2. Executar o script SQL:
```sql
\i database-setup.sql
```

### 5. Solução de Problemas

#### Erro de Conexão
Se receber erro de conexão, verifique:
- PostgreSQL está rodando
- Credenciais no arquivo `.env` estão corretas
- Porta 5432 está acessível

#### Erro de Permissão
Se receber erro de permissão:
```sql
GRANT ALL PRIVILEGES ON DATABASE postgres TO postgres;
```

### 6. Estrutura das Tabelas

#### Tabela `users`
- `id`: ID único do usuário
- `email`: Email único do usuário
- `password`: Senha hasheada com bcrypt
- `name`: Nome do usuário
- `created_at`: Data de criação
- `updated_at`: Data de atualização

#### Tabela `atendimentos`
- `id`: ID único do atendimento
- `titulo`: Título do atendimento
- `descricao`: Descrição do atendimento
- `status`: Status (aberto, fechado, etc.)
- `prioridade`: Prioridade (baixa, normal, alta)
- `created_at`: Data de criação
- `updated_at`: Data de atualização

#### Tabela `mensagens`
- `id`: ID único da mensagem
- `atendimento_id`: Referência ao atendimento
- `conteudo`: Conteúdo da mensagem
- `tipo`: Tipo da mensagem (texto, imagem, etc.)
- `created_at`: Data de criação

## Próximos Passos

Após configurar o banco de dados:

1. Reinicie o servidor de desenvolvimento:
```bash
npm run dev
```

2. Teste o login com as credenciais de teste
3. O sistema deve funcionar normalmente 