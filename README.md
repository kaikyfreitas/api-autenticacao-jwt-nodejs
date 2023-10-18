# API de Autenticação com JWT e Node.js

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=nodedotjs)
![Express.js](https://img.shields.io/badge/Express.js-4.18-lightgrey?logo=express)
![JWT](https://img.shields.io/badge/JWT-JSON%20Web%20Token-blue)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

Uma API de autenticação completa construída com Node.js e Express. Este projeto implementa um fluxo de registro e login seguro utilizando **JSON Web Tokens (JWT)** para autorização e **bcrypt.js** para o hashing de senhas, garantindo que as senhas nunca sejam armazenadas em texto plano.

## ✨ Features

-   **Registro de Usuário:** Endpoint para criar novos usuários com senhas seguras (hashed).
-   **Login de Usuário:** Endpoint que valida as credenciais e retorna um JWT se forem corretas.
-   **Hashing de Senhas:** Utiliza `bcrypt.js` para proteger as senhas dos usuários.
-   **Rotas Protegidas:** Exemplo de uma rota (`/profile`) que só pode ser acessada com um token JWT válido.
-   **Middleware de Autenticação:** Um middleware reutilizável para proteger qualquer rota que necessite de autorização.
-   **Segredos de Aplicação:** O segredo do JWT é armazenado de forma segura em um arquivo `.env`.

## 📦 Instalação e Configuração

1.  **Clone e instale as dependências:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd api-autenticacao-jwt-nodejs
    npm install
    ```

2.  **Configure o arquivo de ambiente:**
    -   Crie um arquivo `.env` na raiz do projeto.
    -   Adicione uma variável `JWT_SECRET` com uma string longa e segura:
    ```
    JWT_SECRET=seu_segredo_super_secreto_e_longo_aqui
    ```

## ▶️ Como Executar

```bash
npm run dev