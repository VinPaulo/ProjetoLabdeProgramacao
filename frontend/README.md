# Projeto LabProg - Frontend (P.Wallet)

Este é o frontend da aplicação web P.Wallet, a interface de usuário para o sistema de finanças.

## Tecnologias e Frameworks Utilizados
- **Linguagem:** TypeScript / JavaScript
- **Framework:** React 19
- **Build Tool:** Vite
- **Estilização:** CSS Vanilla e Lucide React para ícones

## Como rodar o Frontend localmente

1. Entre na pasta do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

A aplicação estará disponível na porta configurada pelo Vite (geralmente `http://localhost:5173`).

## Executando os Testes
A aplicação utiliza Vitest e React Testing Library para os testes automatizados.
Para executar a suíte de testes, utilize o comando na pasta doc frontend:
```bash
npm run test
```

## Como subir via Docker
O projeto principal conta com um `docker-compose.yml` que sobe toda a stack integrada (Banco de Dados, Backend e Frontend).
Para inicializar os containers, vá até a **raiz do repositório** (uma pasta acima do frontend) e execute:
```bash
docker-compose up -d --build
```
O frontend estará acessível na porta configurada (geralmente a porta **80** via Nginx configurado no Dockerfile).

## Scripts Úteis
- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Faz o build de produção da aplicação, compilando o TypeScript e empacotando com o Vite.
- `npm run lint`: Analisa o código com o ESLint.
- `npm run test`: Executa os testes unitários e de componentes usando Vitest.
- `npm run preview`: Visualiza o build de produção localmente simulando o ambiente real.
