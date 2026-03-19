# Projeto LabProg - Backend

Este é o backend do sistema de autenticação, construído com Spring Boot 3 e PostgreSQL.

## Requisitos
- Java 17
- PostgreSQL rodando localmente

## Configuração
O sistema utiliza variáveis de ambiente para configuração do banco de dados.
Certifique-se de que o arquivo `.env` na raiz da pasta `demo` contém as credenciais corretas.

## Como rodar o Backend

1. Entre na pasta do projeto:
   ```bash
   cd demo
   ```

2. Compile e rode a aplicação usando o Maven Wrapper:
   ```bash
   .\mvnw spring-boot:run
   ```

3. O servidor iniciará em per padrão na porta **8080**.

## Documentação da API (Swagger)
Com o sistema rodando, acesse:
[http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

## Estrutura do Projeto
- `src/main/java`: Código fonte Java.
- `src/main/resources`: Configurações e propriedades do Spring.
- `.env`: Variáveis de ambiente (não deve ser commitado em produção).
