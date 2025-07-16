# Backend API – Stefanini Brasil

Bem-vindo ao repositório do backend para o teste técnico da Stefanini Brasil. Este projeto foi desenvolvido utilizando NestJS, Express, TypeORM, SQLite e Redis, com o objetivo de fornecer uma API robusta, escalável e de fácil manutenção.

---

## Índice
- [Introdução](#introdução)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Execução](#execução)
- [Endpoints Disponíveis](#endpoints-disponíveis)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

---

## Introdução

Esta API foi desenvolvida como parte de um teste técnico, simulando um ambiente real de backend para gerenciamento de postagens e membros. O projeto utiliza cache com Redis para otimização de consultas e banco de dados SQLite para persistência dos dados.

## Pré-requisitos

- Node.js (versão 18 ou superior)
- Redis (em execução local na porta padrão 6379)

## Instalação

Clone o repositório e acesse o diretório do projeto:

```bash
git clone https://github.com/caueeex/backend-api.git
cd backend-api/backend
```

Instale as dependências do projeto:

```bash
npm install
```

## Execução

Para iniciar a aplicação em modo de desenvolvimento, execute:

```bash
npm run start:dev
```

A API estará disponível em: [http://localhost:3001](http://localhost:3001) (ou na porta definida no arquivo `.env`).

## Endpoints Disponíveis

- `GET /posts` – Lista todas as postagens
- `GET /members` – Lista todos os membros

## Exemplos de Uso

Abaixo estão exemplos de como utilizar os principais endpoints da API, incluindo explicações sobre cada funcionalidade.

### 1. Listar Postagens

**Endpoint:** `GET /posts`

Retorna uma lista de todas as postagens cadastradas no sistema. Os dados são buscados do banco SQLite e, para otimizar a performance, são armazenados em cache no Redis.

**Exemplo de requisição:**
```bash
curl -X GET http://localhost:3001/posts
```

**Exemplo de resposta:**
```json
[
  {
    "id": 1,
    "title": "Primeira Postagem",
    "content": "Conteúdo da primeira postagem.",
    "authorId": 1
  },
  {
    "id": 2,
    "title": "Segunda Postagem",
    "content": "Conteúdo da segunda postagem.",
    "authorId": 2
  }
]
```

**Explicação:**
- O endpoint busca todas as postagens do banco de dados.
- Caso o cache esteja disponível, os dados são retornados do Redis, acelerando a resposta.

---

### 2. Listar Membros

**Endpoint:** `GET /members`

Retorna uma lista de todos os membros cadastrados. Assim como o endpoint de postagens, utiliza cache Redis para otimizar a consulta.

**Exemplo de requisição:**
```bash
curl -X GET http://localhost:3001/members
```

**Exemplo de resposta:**
```json
[
  {
    "id": 1,
    "name": "João Silva",
    "email": "joao.silva@exemplo.com"
  },
  {
    "id": 2,
    "name": "Maria Souza",
    "email": "maria.souza@exemplo.com"
  }
]
```

**Explicação:**
- O endpoint retorna todos os membros registrados no banco.
- O uso do Redis reduz o tempo de resposta em consultas repetidas.

---

> **Nota:** Os dados são fictícios e populados automaticamente ao iniciar a aplicação. Para adicionar, editar ou remover dados, é necessário alterar o seed do banco ou implementar novos endpoints.

## Estrutura do Projeto

```text
backend-api/
└── backend/
    ├── src/
    │   ├── app.module.ts
    │   ├── main.ts
    │   ├── posts/
    │   └── members/
    ├── package.json
    └── ...
```

## Tecnologias Utilizadas

- **NestJS** – Framework para aplicações Node.js escaláveis
- **Express** – Servidor HTTP
- **TypeORM** – ORM para TypeScript e JavaScript
- **SQLite** – Banco de dados relacional leve
- **Redis** – Cache de alto desempenho
- **TypeScript** – Tipagem estática para JavaScript

## Contribuição

Contribuições são bem-vindas! Para contribuir:
1. Fork este repositório
2. Crie uma branch com sua feature ou correção: `git checkout -b minha-feature`
3. Commit suas alterações: `git commit -m 'feat: minha nova feature'`
4. Push para a branch: `git push origin minha-feature`
5. Abra um Pull Request

## Licença

Este projeto foi desenvolvido exclusivamente para fins de avaliação técnica pela Stefanini Brasil.

## Contato

Dúvidas ou sugestões? Entre em contato pelo e-mail: [seu-email@exemplo.com]
