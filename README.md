# Mini E-commerce com React

Aplicação frontend de e-commerce desenvolvida com React, React Router, Context API e TailwindCSS. Simula um pequeno e-commerce com gerenciamento de produtos e carrinho de compras.

## 🚀 Como Rodar

### Pré-requisitos
- Node.js 16+
- npm ou yarn

### Instalação
```bash
npm install
```

### Executar

O projeto precisa de dois servidores rodando simultaneamente:

1. **Iniciar o JSON Server (API):**
```bash
npm run server
```
A API estará em `http://localhost:3001`

2. **Iniciar a aplicação React:**
```bash
npm run dev
```
A aplicação estará em `http://localhost:5173`

## 📋 Funcionalidades

- ✅ Listagem de produtos da API
- ✅ Visualização de detalhes de produtos
- ✅ Adicionar produtos ao carrinho (respeitando estoque)
- ✅ Gerenciar quantidade no carrinho (aumentar/diminuir)
- ✅ Remover itens do carrinho
- ✅ Cadastro de novos produtos
- ✅ Edição de produtos existentes
- ✅ Deletar produtos
- ✅ Validações de formulário com feedback visual
- ✅ Interface responsiva com TailwindCSS
- ✅ Persistência do carrinho no localStorage

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Layout.jsx      # Layout principal com navegação
│   └── ProductCard.jsx # Card de produto
├── context/            # Context API
│   └── CartContext.jsx # Contexto do carrinho
├── pages/              # Páginas da aplicação
│   ├── Home.jsx        # Listagem de produtos
│   ├── ProductDetails.jsx # Detalhes do produto
│   ├── Cart.jsx        # Carrinho de compras
│   ├── ProductForm.jsx # Formulário de cadastro
│   ├── EditProduct.jsx # Formulário de edição
│   └── NotFound.jsx    # Página 404
├── services/           # Serviços de API
│   └── api.js          # Funções de consumo da API
├── App.jsx             # Componente principal com rotas
├── main.jsx            # Ponto de entrada
└── index.css           # Estilos globais (TailwindCSS)
```

## 🎯 Páginas da Aplicação

- **Home (`/`)**: Lista todos os produtos disponíveis
- **Detalhes (`/produto/:id`)**: Exibe informações completas do produto e permite adicionar ao carrinho
- **Carrinho (`/carrinho`)**: Gerencia itens do carrinho com controle de quantidade
- **Cadastro (`/cadastro`)**: Formulário para cadastrar novos produtos
- **Edição (`/editar/:id`)**: Formulário para editar produtos existentes
- **404**: Página para rotas não encontradas

## 🔧 Principais Conceitos Utilizados

### Hooks
- `useState`: Gerenciamento de estados locais
- `useEffect`: Buscar dados da API e persistência no localStorage
- `useContext`: Consumo do Context API do carrinho
- `useNavigate`: Navegação programática entre rotas
- `useParams`: Captura de parâmetros da URL
- `useRef`: Foco automático em campos inválidos do formulário

### Context API
O carrinho é gerenciado globalmente através do `CartContext`, permitindo:
- Adicionar/remover produtos
- Atualizar quantidades
- Validar estoque disponível
- Persistir no localStorage

### API (JSON Server)
Endpoints utilizados:
- `GET /produtos` - Lista todos os produtos
- `GET /produtos/:id` - Busca produto por ID
- `POST /produtos` - Cria novo produto
- `PUT /produtos/:id` - Atualiza produto
- `DELETE /produtos/:id` - Remove produto

## ✅ Validações

- Campos obrigatórios nos formulários
- Validação de tipos (preço e estoque devem ser números ≥ 0)
- Limite de estoque no carrinho
- Mensagens de erro com feedback visual
- Foco automático no primeiro campo inválido

## 🛠️ Tecnologias

- React 18
- React Router DOM 6
- TailwindCSS 3
- Vite 5
- JSON Server
