# Backend API – Stefanini Brasil

Bem-vindo ao backend do teste técnico Stefanini Brasil. Este projeto utiliza **NestJS**, **TypeORM**, **MySQL/MariaDB** e **Redis** para fornecer uma API robusta e performática.

---

## Índice
- [Introdução](#introdução)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Banco de Dados](#banco-de-dados)
- [Redis com Docker](#redis-com-docker)
- [Execução](#execução)
- [Endpoints Disponíveis](#endpoints-disponíveis)
- [Cache Redis](#cache-redis)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contato](#contato)

---

## Introdução

API para gerenciamento de postagens e membros, com cache Redis para otimização de consultas e persistência em banco MySQL/MariaDB.

## Pré-requisitos

- Node.js 18+
- Docker (para rodar Redis e MySQL)
- MySQL/MariaDB (pode ser local ou via phpMyAdmin)

## Instalação

Clone o repositório e acesse o diretório do backend:

```bash
git clone https://github.com/caueeex/backend-api.git
cd backend-api/backend
npm install
```

## Banco de Dados

### **Inicialização do Banco (Recomendado):**

1. **Execute o script de inicialização:**
   ```bash
   # Via linha de comando MySQL
   mysql -u root < setup-database.sql
   
   # Ou via phpMyAdmin
   # 1. Acesse o phpMyAdmin
   # 2. Clique em "SQL"
   # 3. Cole todo o conteúdo do arquivo `setup-database.sql`
   # 4. Clique em "Executar"
   ```

2. **Verificar se o banco está funcionando:**
   ```bash
   # Testar conexão
   mysql -u root -e "USE stefanini_db; SELECT COUNT(*) FROM members; SELECT COUNT(*) FROM posts;"
   ```

2. **Executar manualmente:**
   
   Crie o banco e as tabelas manualmente no MySQL/MariaDB:

   ```sql
   CREATE DATABASE IF NOT EXISTS stefanini_db;
   USE stefanini_db;

   CREATE TABLE members (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       email VARCHAR(100) NOT NULL UNIQUE,
       created_at DATETIME DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE posts (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(200) NOT NULL,
       content TEXT NOT NULL,
       member_id INT,
       created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
       FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE SET NULL
   );
   ```

3. **Configure o acesso ao banco** em `src/app.module.ts` se necessário:
   - Host: localhost
   - Port: 3306
   - Username: root
   - Password: (vazia por padrão)

   **⚠️ Importante:** Se sua instalação do MySQL tem senha, altere a linha `password: ''` para `password: 'sua_senha'` ou configure a variável de ambiente `DB_PASSWORD`

## Redis e MySQL com Docker

### **Opção 1 - Docker Compose (Recomendado):**

Se você tiver um arquivo `docker-compose.yml` na raiz do projeto:

```bash
# Iniciar Redis e MySQL
docker-compose up -d

# Verificar se estão rodando
docker-compose ps

# Parar serviços
docker-compose down
```

**Nota:** Se não tiver o arquivo docker-compose.yml, use a Opção 2 (Docker Manual).

### **Opção 2 - Docker Manual:**

Execute Redis e MySQL usando Docker:

```bash
# Iniciar MySQL
docker run --name mysql-stefanini \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=stefanini_db \
  -p 3306:3306 \
  -d mysql:8.0

# Iniciar Redis
docker run --name redis-stefanini \
  -p 6379:6379 \
  -d redis

# Verificar se estão rodando
docker ps

# Parar containers (quando necessário)
docker stop mysql-stefanini redis-stefanini

# Remover containers (quando necessário)
docker rm mysql-stefanini redis-stefanini
```

### **Opção 3 - Apenas Redis (MySQL local):**

Se você já tem MySQL instalado localmente:

```bash
# Iniciar apenas Redis
docker run --name redis-stefanini -p 6379:6379 -d redis

# Verificar se está rodando
docker ps

# Parar Redis (quando necessário)
docker stop redis-stefanini

# Remover container (quando necessário)
docker rm redis-stefanini
```

## Execução

```bash
npm run start:dev
```

A API estará disponível em: [http://localhost:3001](http://localhost:3001)

**Logs de inicialização:**
```
🚀 Application is running on: http://localhost:3001
📊 Database: localhost:3306
🔴 Redis: localhost:6379
🌐 CORS enabled for: http://localhost:3000
```

## Endpoints Disponíveis

### **Health Check:**
- `GET /health` – Verifica o status da API e conexões

### **Postagens:**
- `GET /posts` – Lista todas as postagens (com cache Redis)
- `GET /posts/:id` – Busca uma postagem específica por ID

### **Membros:**
- `GET /members` – Lista todos os membros (com cache Redis)
- `GET /members/:id` – Busca um membro específico por ID
- `GET /members/profile/:id` – Busca perfil detalhado de um membro específico

### **Exemplos de uso:**
```bash
# Verificar status da API
curl http://localhost:3001/health

# Listar todas as postagens
curl http://localhost:3001/posts

# Buscar postagem específica
curl http://localhost:3001/posts/1

# Listar todos os membros
curl http://localhost:3001/members

# Buscar membro específico
curl http://localhost:3001/members/1

# Buscar perfil de um membro
curl http://localhost:3001/members/profile/1
```

## Cache Redis

O projeto implementa cache Redis para otimizar as consultas:

### **Funcionalidades:**
- **Cache de listagens**: `posts:all` e `members:all` (TTL: 60s)
- **Cache individual**: `posts:{id}` e `members:{id}` (TTL: 60s)
- **Invalidação automática**: Métodos para limpar cache quando necessário

### **Configuração:**
```typescript
// Variáveis de ambiente suportadas
REDIS_HOST=localhost
REDIS_PORT=6379
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=  # Vazia por padrão
DB_DATABASE=stefanini_db
```

### **Performance:**
- **Primeira consulta**: Busca do banco de dados
- **Consultas subsequentes**: Retorno do cache Redis (muito mais rápido)
- **Cache expira**: Após 60 segundos, nova consulta ao banco

## Tecnologias Utilizadas

- **NestJS** – Framework Node.js
- **TypeORM** – ORM para TypeScript
- **MySQL/MariaDB** – Banco de dados relacional
- **Redis** – Cache de alto desempenho (via Docker)
- **Docker** – Para rodar o Redis facilmente

## 🔧 Configuração TypeORM

### **Entidades:**
- **Member**: Configurada para usar tabela `members` (explicitamente definida)
- **Post**: Configurada para usar tabela `posts` (explicitamente definida)
- **Relacionamentos**: Posts têm relacionamento ManyToOne com Members
- **Campos de data**: `created_at` configurado para usar `CURRENT_TIMESTAMP`

### **Configuração:**
- **Sincronização**: Desabilitada (`synchronize: false`) para evitar alterações automáticas
- **Auto-load**: Desabilitado (`autoLoadEntities: false`) para controle manual
- **Entidades**: Especificadas manualmente no `app.module.ts`
- **Nomes de tabelas**: Explicitamente definidos para evitar duplicação

## 🔧 Troubleshooting

### **Problemas Comuns:**

1. **Erro de conexão com MySQL:**
   - Verifique se o MySQL está rodando
   - Confirme a senha no `src/app.module.ts`
   - Execute o script `setup-database.sql` no phpMyAdmin

2. **Erro de conexão com Redis:**
   - Verifique se o Redis está rodando: `docker ps`
   - Reinicie o Redis: `docker restart redis`

3. **Porta 3001 ocupada:**
   - Mate processos Node.js: `taskkill /f /im node.exe`
   - Ou mude a porta no `src/main.ts`

4. **Erro de índices no banco:**
   - Execute o script `setup-database.sql` para limpar o banco
   - Ou desabilite `synchronize: true` no `app.module.ts`

5. **Tabelas duplicadas (member/members, post/posts):**
   - Se o TypeORM criar tabelas duplicadas, remova as tabelas no singular:
   ```sql
   USE stefanini_db;
   DROP TABLE IF EXISTS member;
   DROP TABLE IF EXISTS post;
   ```
   - As entidades estão configuradas para usar as tabelas corretas (`members`, `posts`)
   - **Solução definitiva**: Use o script `setup-database.sql` que já configura tudo corretamente

6. **Cache não funcionando:**
   - Verifique se o Redis está rodando
   - Confirme as configurações de host e porta
   - Verifique os logs do Redis: `docker logs redis`

## Contato

Dúvidas ou sugestões? Entre em contato pelo e-mail: [seu-email@exemplo.com]
