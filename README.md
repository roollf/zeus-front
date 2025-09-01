
# Zeus Front

Este repositório é o frontend do projeto Zeus, uma aplicação desenvolvida com Next.js e Tailwind CSS para monitoramento, visualização e gestão de dados relacionados à coleção "racao". Permite consultar, visualizar e interagir com os dados de produtos e preços de forma moderna e responsiva.

## Funcionalidades

- Visualização de dados e produtos
- Consulta de preços e histórico
- Interface moderna, responsiva e otimizada
- Componentes reutilizáveis (UI, tabelas, formulários, etc.)

## Pré-requisitos

- [Node.js](https://nodejs.org/) (recomendado: v18 ou superior)
- [npm](https://www.npmjs.com/) (geralmente instalado junto com o Node.js)

## Como executar o projeto em modo de desenvolvimento

1. **Clone o repositório**
	```bash
	git clone <url-do-repositorio>
	```
	Acesse a pasta do projeto:
	```bash
	cd zeus-front
	```

2. **Instale as dependências**
	```bash
	npm install
	```

3. **Execute o projeto**
	```bash
	npm run dev
	```
	O aplicativo será iniciado em modo de desenvolvimento. Abra [http://localhost:3000](http://localhost:3000) no navegador para visualizar.

4. **Alterações em tempo real**
	Qualquer alteração nos arquivos do projeto será refletida automaticamente no navegador.

## Scripts disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera uma versão de produção na pasta `.next`
- `npm start` - Inicia o servidor em produção

## Estrutura de pastas

- `src/` - Código-fonte principal
  - `app/` - Estrutura de rotas, páginas e layout
  - `components/` - Componentes reutilizáveis (UI, tabelas, formulários, header, footer)
  - `lib/` - Funções utilitárias
- `public/` - Arquivos públicos e estáticos

## Observações

- Certifique-se de que o backend do sistema Zeus esteja rodando e acessível, se necessário para integração.
- Este projeto utiliza [Next.js](https://nextjs.org/) e [Tailwind CSS](https://tailwindcss.com/) para estilização.

---
Projeto desenvolvido com [Create Next App](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
