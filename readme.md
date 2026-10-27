# 📊 sales-api-node-ts

API RESTful para gerenciamento de vendas, construída com **Node.js**, **TypeScript**, **Express**, **TypeORM** e **PostgreSQL**, com suporte a cache **Redis**, autenticação **JWT**, upload de arquivos, envio de e‑mails e documentação **Swagger**. O projeto foi desenvolvido como parte do curso **API Restful Javascript com Node.js, Typescript, TypeORM etc** da Udemy e representa uma experiência prática de aprendizado na construção de back‑ends modulares e escaláveis.

## 🎯 Visão Geral

O **sales-api-node-ts** é uma aplicação backend robusta e escalável para gerenciamento completo de operações comerciais. O projeto implementa funcionalidades essenciais de um sistema de vendas, incluindo cadastro de usuários, autenticação segura, gestão de clientes, produtos, pedidos e processamento de pagamentos, com suporte a upload de arquivos e notificações por email.

Desenvolvido com foco em **boas práticas de engenharia de software**, o repositório demonstra padrões consolidados como **Clean Architecture**, **Dependency Injection** e **Test-Driven Development**.

## 🛠️ Stack Tecnológico

### Core & Runtime

- **Node.js** `^20.17.0 || >=22.9.0`
- **TypeScript** `^4.9.5` — Type safety e desenvolvimento seguro
- **Express** `^4.17.1` — Framework HTTP minimalista e robusto

### Persistência de Dados

- **PostgreSQL** — Banco de dados relacional principal
- **TypeORM** `^0.3.x` — ORM com suporte a migrations e relacionamentos
- **Redis** (via ioredis `^5.4.1`) — Cache distribuído e sessões

### Autenticação & Segurança

- **JWT (jsonwebtoken)** `^8.5.1` — Autenticação baseada em tokens
- **bcryptjs** `^2.4.3` — Hash seguro de senhas
- **Celebrate** `^13.0.4` — Validação de schemas com Joi

### Armazenamento & Integração

- **AWS SDK** `^2.830.0` — Integração com S3 para upload de arquivos
- **Multer** — Middleware para processamento de uploads
- **Nodemailer** — Envio de emails (Ethereal ou AWS SES)

### Documentação & Qualidade

- **Swagger/OpenAPI** (swagger-ui-express) — Documentação interativa da API
- **ESLint** — Linting e análise estática de código
- **Prettier** — Formatação automática de código
- **Jest** `^29.7.0` — Framework de testes unitários e integração
- **Husky** `^9.1.7` — Git hooks para garantir qualidade

### Utilitários

- **class-transformer** `^0.3.1` — Serialização e transformação de objetos
- **date-fns** `^2.16.1` — Manipulação de datas
- **CORS** — Controle de requisições cross-origin
- **dotenv** — Gerenciamento de variáveis de ambiente

## 📁 Estrutura do Projeto

```
src/
├── modules/                          # Domínios de negócio
│   ├── users/                        # Gestão de usuários
│   │   ├── controllers/              # Controladores HTTP
│   │   ├── services/                 # Lógica de negócio
│   │   ├── repositories/             # Acesso a dados
│   │   ├── entities/                 # Modelos de dados
│   │   └── routes/                   # Definição de rotas
│   ├── products/                     # Catálogo de produtos
│   ├── customers/                    # Gestão de clientes
│   ├── orders/                       # Processamento de pedidos
│   └── [outros módulos]/
│
├── shared/                           # Código compartilhado
│   ├── infra/
│   │   ├── http/                     # Configuração do servidor Express
│   │   ├── typeorm/                  # Configuração do banco de dados
│   │   ├── mail/                     # Serviço de email
│   │   ├── storage/                  # Gerenciamento de arquivos
│   │   └── cache/                    # Configuração do Redis
│   ├── errors/                       # Classes de erro customizadas
│   ├── middlewares/                  # Middlewares globais
│   └── container/                    # Injeção de dependência
│
└── tests/                            # Testes unitários e integração
```

## 🔑 Principais Categorias de Funcionalidades

### 👤 Gestão de Usuários

- **Autenticação** — Login com JWT e refresh tokens
- **Registro** — Criação de novos usuários com validação
- **Perfil** — Atualização de dados pessoais
- **Avatar** — Upload e gerenciamento de imagens de perfil
- **Recuperação de Senha** — Reset via email com token temporário
- **Busca Avançada** — Paginação, ordenação e filtros

### 🛍️ Catálogo de Produtos

- **CRUD Completo** — Criar, ler, atualizar e deletar produtos
- **Busca e Filtros** — Pesquisa por nome, categoria e preço
- **Imagens** — Upload de fotos de produtos para S3

### 👥 Gestão de Clientes

- **Cadastro** — Registro de clientes com validação
- **Perfil** — Manutenção de dados de contato
- **Histórico** — Rastreamento de pedidos por cliente

### 📦 Processamento de Pedidos

- **Criação** — Geração de pedidos com múltiplos itens
- **Relacionamentos** — Associação com clientes e produtos
- **Consulta** — Busca de pedidos por ID com detalhes completos

### 📧 Notificações

- **Email** — Envio de confirmações, recuperação de senha e notificações
- **Templates** — Handlebars para emails customizados
- **Drivers** — Suporte a Ethereal (desenvolvimento) e AWS SES (produção)

## 🚀 Como Explorar o Repositório

### 1. **Configuração Inicial**

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/robsonsestrem/sales-api-node-ts.git
cd sales-api-node-ts
npm install
```

### 2. **Variáveis de Ambiente**

Crie um arquivo `.env` na raiz do projeto baseado em `.env.example`:

```bash
cp .env.example .env
```

Configure as variáveis necessárias:

```
APP_SECRET=sua_chave_secreta_aqui
APP_API_URL=http://localhost:3333
APP_WEB_URL=http://localhost:3000
PORT=3333

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASS=

# Email (ethereal ou ses)
MAIL_DRIVER=ethereal

# Storage (disk ou s3)
STORAGE_DRIVER=disk

# AWS (se usar S3)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

# Swagger
ENABLE_SWAGGER=true
```

### 3. **Banco de Dados**

Inicie o PostgreSQL (via Docker ou localmente) e execute as migrations:

```bash
npm run migration:run
```

Para reverter a última migration:

```bash
npm run migration:revert
```

Para visualizar o status das migrations:

```bash
npm run migration:show
```

### 4. **Desenvolvimento**

Inicie o servidor em modo desenvolvimento com hot-reload:

```bash
npm run dev
```

A API estará disponível em `http://localhost:3333`

Acesse a documentação Swagger em `http://localhost:3333/api-docs`

### 5. **Build para Produção**

Compile o TypeScript para JavaScript:

```bash
npm run build
```

Inicie a aplicação compilada:

```bash
npm start
```

### 6. **Testes**

Execute a suite de testes:

```bash
npm test
```

### 7. **Qualidade de Código**

Verifique linting:

```bash
npm run lint
```

Corrija automaticamente problemas de linting:

```bash
npm run lint-fix
```

Formate o código com Prettier:

```bash
npm run format
```

Verifique formatação sem modificar:

```bash
npm run format:check
```

## 🐳 Docker & Containerização

O projeto inclui configuração Docker Compose para ambiente completo:

```bash
docker-compose up -d
```

Isso inicia:

- **Aplicação Node.js** na porta 3333
- **PostgreSQL** na porta 5432
- **Redis** na porta 6379
- **PgAdmin** na porta 8000 (gerenciador visual do PostgreSQL)

## 🙏 Agradecimento e Aprendizado

Este projeto foi desenvolvido como parte do curso **“API Restful Javascript com Node.js, Typescript, TypeORM etc”**, ministrado na Udemy. 
A experiência de construir uma API completa, desde a modelagem do banco até a integração com serviços externos, foi fundamental para consolidar conhecimentos em desenvolvimento back‑end, boas práticas de arquitetura e uso profissional de ORM. 
O resultado é um material de estudo que, embora fruto de aprendizado, procura seguir padrões adotados no mercado.

## ⚠️ Observações Importantes

- **Variáveis de Ambiente** — Nunca commitar `.env` com credenciais reais. Usar `.env.example` como template
- **Segurança** — Senhas são hasheadas com bcryptjs; tokens JWT expiram conforme configurado
- **Armazenamento** — Suporta armazenamento local (disk) ou em nuvem (AWS S3)
- **Email** — Em desenvolvimento, usar Ethereal (fake SMTP); em produção, usar AWS SES
- **Redis** — Essencial para cache e sessões em ambientes com múltiplas instâncias
- **Migrations** — Sempre revisar e testar migrations antes de aplicar em produção
- **Documentação Swagger** — Manter atualizada conforme novas rotas são adicionadas

## 🔗 Recursos Adicionais

- [Documentação TypeORM](https://typeorm.io/)
- [Express.js Guide](https://expressjs.com/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)

---

**Licença:** MIT

**Versão:** 1.0.0

