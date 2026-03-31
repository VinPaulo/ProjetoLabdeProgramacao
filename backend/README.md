# Projeto LabProg - Backend

Este é o backend do sistema P.Wallet, construído para fornecer uma API robusta e segura.

## Tecnologias e Frameworks Utilizados
- **Linguagem:** Java 17
- **Framework:** Spring Boot 3
- **Banco de Dados:** PostgreSQL

## Configuração
O sistema utiliza variáveis de ambiente para configuração do banco de dados.
Certifique-se de que o arquivo `.env` na raiz da pasta `backend` contém as credenciais corretas.

## Como rodar o Backend localmente

1. Entre na pasta do projeto:
   ```bash
   cd backend
   ```

2. Compile e rode a aplicação usando o Maven Wrapper:
   ```bash
   .\mvnw spring-boot:run
   ```

3. O servidor iniciará por padrão na porta **8080**.

## Executando os Testes
Para rodar os testes unitários e de integração (JUnit/Mockito/Testcontainers), utilize o comando na pasta do backend:
```bash
.\mvnw test
```

## Como subir via Docker
O projeto principal conta com um `docker-compose.yml` que sobe toda a stack integrada (Banco de Dados, Backend e Frontend).
Para acessar, vá até a **raiz do repositório** (uma pasta acima do backend) e execute:
```bash
docker-compose up -d --build
```
Isso iniciará:
- Banco de dados PostgreSQL (porta 5432)
- Backend Spring Boot (porta 8080)
- Frontend React (porta 80)

## Documentação da API (Swagger)
Com o backend rodando, acesse:
[http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

## Estrutura do Projeto
- `src/main/java`: Código fonte Java.
- `src/main/resources`: Configurações e propriedades do Spring.
- `.env`: Variáveis de ambiente (não deve ser commitado em produção).
