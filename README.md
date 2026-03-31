# Projeto Lab de Programação - P.Wallet

Bem-vindo ao repositório do **P.Wallet**, um sistema completo (Full-Stack) de gerenciamento financeiro desenvolvido como projeto para o Laboratório de Programação.

Esta aplicação foi dividida em duas partes principais: uma API backend robusta construída em Java e uma interface web moderna e responsiva construída com React.

## 📁 Estrutura do Repositório

O projeto adota uma arquitetura de monorepo separando claramente o Frontend e o Backend:

- **[`/backend`](./backend)**: Contém a API RESTful desenvolvida em **Java 17** com **Spring Boot 3**. Utiliza o **PostgreSQL** como banco de dados principal.
- **[`/frontend`](./frontend)**: Contém a Interface de Usuário desenvolvida em **TypeScript** com **React 19** e **Vite**.

> Cada diretório possui o seu próprio arquivo `README.md` com instruções detalhadas de como rodar os testes, instalar dependências e inicializar os servidores de desenvolvimento localmente.

## 🚀 Como executar o projeto completo com Docker

A maneira mais fácil e recomendada de subir toda a aplicação ambiente (Frontend, Backend e Banco de Dados) é utilizando o **Docker Compose**. 

Certifique-se de ter o Docker e o Docker Compose (ou Docker Desktop) instalados em sua máquina.

1. Clone o repositório e acesse a raiz do projeto (onde este README e o arquivo `docker-compose.yml` estão localizados).
2. Execute o comando abaixo para construir as imagens e iniciar os containers em segundo plano:
   ```bash
   docker-compose up -d --build
   ```
   
Isso criará os containers do banco de dados, fará o build do backend e o build do frontend simultaneamente.

### Portas Padrões
Ao rodar pelo Docker, os serviços ficarão acessíveis nos seguintes endereços:
- **Interface Web (Frontend):** `http://localhost:80` (Acesse pelo navegador)
- **API (Backend):** `http://localhost:8080`
- **Banco de Dados (PostgreSQL):** `localhost:5432`

Para parar e remover os containers gerados:
```bash
docker-compose down
```

## 🧪 Testes

Os testes automatizados foram criados tanto para a interface web quanto para a API.
Para executá-los, você precisará ter o Node.js e o JDK 17 instalados.

- **Frontend:** Entre na pasta `frontend/` e rode `npm run test`
- **Backend:** Entre na pasta `backend/` e rode `.\mvnw test` (ou `./mvnw test` no Linux/Mac)

Para mais detalhes sobre as tecnologias empregadas, consulte a documentação específica nas pastas `frontend` e `backend`.
