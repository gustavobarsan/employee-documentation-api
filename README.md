# API de Gerenciamento de Documentos de Colaboradores

## 1. Introdução

Este documento descreve a API de Gerenciamento de Documentos de Colaboradores. O objetivo do sistema é fornecer uma plataforma robusta e escalável para controlar a documentação necessária para cada colaborador, rastreando o que foi enviado, o que está pendente e o status de cada documento (`PENDENTE`, `APROVADO`, `REJEITADO`).

---

## 2. Arquitetura e Padrões

O projeto foi desenvolvido seguindo os princípios da **Arquitetura Hexagonal (Ports & Adapters)** e organizado em um formato **Modularizado**.

A aplicação é dividida em módulos baseados em funcionalidades (`employee`, `document`, `document-type`). Cada módulo contém seu próprio *core* e seus próprios adaptadores, tornando-o um pequeno sistema autocontido.

---

## 3. Débito Técnico: Ausência de Testes

É fundamental ressaltar que o projeto **não possui uma suíte de testes automatizados** (unitários, de integração ou e2e).

---

## 4. Documentação da API (Swagger)

A API está documentada utilizando o padrão OpenAPI (Swagger). Após iniciar a aplicação, a documentação interativa fica disponível e é a melhor forma de explorar os endpoints, seus parâmetros, e os schemas de requisição e resposta.

*   **URL do Swagger:** http://localhost:3000/api

---

## 5. Guia de Início Rápido (Get Started)

Siga os passos abaixo para executar o projeto em seu ambiente.

### 5.1. Pré-requisitos

*   Node.js (versão 18 ou superior)
*   Yarn ou NPM
*   Docker e Docker Compose

### 5.2. Executando Localmente

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-repositorio>
    cd employee-documentation-api
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configure as variáveis de ambiente:**
    *   Crie uma cópia do arquivo `.env.example` e renomeie para `.env`.
    *   Ajuste a variável `DATABASE_URL` para apontar para sua instância do PostgreSQL. Exemplo:
        ```env
        DATABASE_URL="postgresql://user:password@localhost:5432/database_name?schema=public"
        ```

4.  **Execute as migrações do banco de dados:**
    *   Este comando irá criar as tabelas no banco de dados com base no `schema.prisma`.
    ```bash
    npx prisma migrate dev
    ```

5.  **Inicie a aplicação:**
    ```bash
    npm run start:dev
    ```
    A API estará disponível em `http://localhost:3000`.

### 5.3. Executando com Docker Compose

Esta é a forma mais simples de executar o projeto, pois o Docker Compose gerencia tanto o banco de dados quanto a aplicação.

1.  **Clone o repositório** (se ainda não o fez).

2.  **Configure as variáveis de ambiente:**
    *   Crie uma cópia do arquivo `.env.example` e renomeie para `.env`.
    *   A variável `DATABASE_URL` no `.env` já deve estar configurada para se conectar ao container do banco de dados definido no `docker-compose.yml`.

3.  **Inicie os containers:**
    *   Este comando irá construir as imagens (se necessário) e iniciar os containers da API e do banco de dados em background (`-d`).
    ```bash
    docker-compose up -d --build
    ```
    *   As migrações do banco de dados serão executadas automaticamente ao iniciar o container da aplicação.

4.  **Acesse a API:**
    *   A API estará disponível em `http://localhost:3000`.
    *   A documentação Swagger estará em `http://localhost:3000/api`.

5.  **Para parar os containers:**
    ```bash
    docker-compose down
    ```

---