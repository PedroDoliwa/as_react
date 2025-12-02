# Mini E-commerce com React + JSON Server

Aplicação frontend desenvolvida em React simulando um pequeno e-commerce, utilizando React Router, Context API, hooks, componentização, consumo de API com fetch e estilização com TailwindCSS.

## 📋 Funcionalidades

- ✅ Listagem de produtos da API
- ✅ Visualização de detalhes de produtos
- ✅ Adicionar produtos ao carrinho (respeitando estoque)
- ✅ Aumentar e diminuir quantidade no carrinho
- ✅ Remover itens do carrinho
- ✅ Gerenciamento global do carrinho com Context API
- ✅ Cadastro de novos produtos
- ✅ Edição de produtos existentes
- ✅ Deletar produtos existentes
- ✅ Navegação entre múltiplas páginas com React Router
- ✅ Validações de formulário com feedback visual
- ✅ Interface responsiva com TailwindCSS

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório ou navegue até a pasta do projeto:
```bash
cd AS_react
```

2. Instale as dependências:
```bash
npm install
```

### Executar o Projeto

O projeto precisa de dois servidores rodando simultaneamente:

#### 1. JSON Server (API)

Em um terminal, execute:
```bash
npm run server
```

O JSON Server estará rodando em `http://localhost:3001`

#### 2. Aplicação React

Em outro terminal, execute:
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada pelo Vite)

## 📁 Estrutura do Projeto

```
AS_react/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Layout.jsx      # Layout principal com navegação
│   │   └── ProductCard.jsx # Card de produto
│   ├── context/            # Context API
│   │   └── CartContext.jsx # Contexto do carrinho
│   ├── pages/              # Páginas da aplicação
│   │   ├── Home.jsx        # Listagem de produtos
│   │   ├── ProductDetails.jsx # Detalhes do produto
│   │   ├── Cart.jsx        # Carrinho de compras
│   │   ├── ProductForm.jsx # Formulário de cadastro
│   │   ├── EditProduct.jsx # Formulário de edição
│   │   └── NotFound.jsx    # Página 404
│   ├── services/           # Serviços de API
│   │   └── api.js          # Funções de consumo da API
│   ├── App.jsx             # Componente principal com rotas
│   ├── main.jsx            # Ponto de entrada
│   └── index.css           # Estilos globais (TailwindCSS)
├── db.json                 # Banco de dados do JSON Server
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎯 Páginas da Aplicação

### 1. Home (`/`)
- Lista todos os produtos disponíveis
- Exibe imagem, nome e preço de cada produto
- Mostra badge "Esgotado" quando estoque é 0
- Link para detalhes do produto
- Links para Carrinho e Cadastro de Produto

### 2. Detalhes do Produto (`/produto/:id`)
- Exibe informações completas do produto
- Mostra estoque disponível
- Botão para adicionar ao carrinho
- Validações:
  - Botão desativado se estoque = 0
  - Botão desativado se quantidade no carrinho atingiu o estoque
  - Mensagem "Estoque máximo atingido" quando aplicável

### 3. Carrinho (`/carrinho`)
- Lista todos os itens adicionados
- Para cada item exibe:
  - Nome
  - Quantidade atual
  - Preço unitário
  - Preço total
  - Estoque máximo permitido
- Funcionalidades:
  - Aumentar quantidade (até limite do estoque)
  - Diminuir quantidade (mínimo 1)
  - Remover item
  - Total geral da compra
- Validações:
  - Bloqueia aumentos acima do estoque
  - Exibe mensagem quando atinge o máximo

### 4. Cadastro de Produto (`/cadastro`)
- Formulário com campos:
  - Nome (obrigatório)
  - Descrição (obrigatório)
  - Preço (obrigatório, ≥ 0)
  - URL da imagem (obrigatório)
  - Estoque (obrigatório, ≥ 0)
- Validações:
  - Todos os campos obrigatórios
  - Preço e estoque devem ser números válidos
  - Mensagens de erro abaixo dos inputs
  - useRef para focar primeiro campo inválido
- Após cadastro, redireciona para Home

### 5. Edição de Produto (`/editar/:id`)
- Carrega dados do produto automaticamente
- Formulário pré-preenchido com validações
- Atualiza produto via PUT na API
- Mesmas validações do cadastro
- Após editar, redireciona para Home

### 6. Página 404
- Exibida para rotas não encontradas
- Link para voltar à Home

## 🔧 Hooks Utilizados

### useState
- Gerenciamento de estados locais em componentes
- Estados de formulários, loading, erros, produtos, etc.

### useEffect
- Buscar dados da API ao montar componentes
- Carregar e salvar carrinho do localStorage
- Exemplos:
  - `Home.jsx`: Carrega lista de produtos
  - `ProductDetails.jsx`: Carrega detalhes do produto
  - `CartContext.jsx`: Persistência do carrinho

### useContext
- Consumo do Context API do carrinho
- Utilizado em:
  - `ProductDetails.jsx`: Adicionar ao carrinho
  - `Cart.jsx`: Gerenciar itens do carrinho
  - `Layout.jsx`: Exibir quantidade de itens

### useRef
- Foco automático em campos inválidos do formulário
- Implementado em `ProductForm.jsx` para melhorar UX

### useNavigate
- Navegação programática entre rotas
- Utilizado após cadastro de produto e em botões de voltar

### useParams
- Captura de parâmetros da URL
- Utilizado em `ProductDetails.jsx` para obter o ID do produto

## 🛒 Context API - Gerenciamento do Carrinho

### Criação do Context

O contexto foi criado em `src/context/CartContext.jsx` usando `createContext()`:

```javascript
const CartContext = createContext()
```

### Dados Armazenados

O contexto armazena:
- `cartItems`: Array com os itens do carrinho
- Cada item contém todas as informações do produto + quantidade

### Funções Disponíveis

O contexto fornece as seguintes funções:

- `addToCart(product, quantity)`: Adiciona produto ao carrinho
- `removeFromCart(productId)`: Remove produto do carrinho
- `updateQuantity(productId, newQuantity)`: Atualiza quantidade de um item
- `increaseQuantity(productId, maxStock)`: Aumenta quantidade em 1
- `decreaseQuantity(productId)`: Diminui quantidade em 1
- `clearCart()`: Limpa todo o carrinho
- `isInCart(productId)`: Verifica se produto está no carrinho
- `getCartQuantity(productId)`: Retorna quantidade de um produto no carrinho
- `getTotal()`: Calcula total do carrinho
- `getTotalItems()`: Retorna total de itens no carrinho

### Como o Carrinho é Manipulado

1. **Adicionar ao Carrinho**:
   - Verifica se produto já existe
   - Se existe, aumenta quantidade (respeitando estoque)
   - Se não existe, adiciona novo item

2. **Persistência**:
   - Carrinho é salvo no `localStorage` automaticamente
   - Carrinho é carregado do `localStorage` ao inicializar

3. **Validações de Estoque**:
   - Não permite adicionar mais do que o estoque disponível
   - Bloqueia aumentos quando atinge o limite

### Componentes que Consomem o Context

- **ProductDetails**: Adiciona produtos ao carrinho
- **Cart**: Gerencia itens, quantidades e remoções
- **Layout**: Exibe contador de itens no carrinho

### Por que Context API?

- **Estado Global**: Carrinho precisa ser acessível em múltiplas páginas
- **Simplicidade**: Evita prop drilling (passar props por vários níveis)
- **Reatividade**: Mudanças no carrinho refletem automaticamente em todos os componentes

## 🌐 Consumo da API (JSON Server)

### Configuração do JSON Server

O JSON Server foi configurado no `package.json`:

```json
"server": "json-server --watch db.json --port 3001"
```

O arquivo `db.json` contém os dados iniciais dos produtos.

### Endpoints Utilizados

Base URL: `http://localhost:3001`

#### GET /produtos
Lista todos os produtos.

**Exemplo de requisição:**
```javascript
const products = await getProducts()
```

**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "Notebook Gamer",
    "descricao": "...",
    "preco": 3499.99,
    "imagem": "https://...",
    "estoque": 5
  }
]
```

#### GET /produtos/:id
Busca um produto específico por ID.

**Exemplo de requisição:**
```javascript
const product = await getProductById(1)
```

**Resposta:**
```json
{
  "id": 1,
  "nome": "Notebook Gamer",
  "descricao": "...",
  "preco": 3499.99,
  "imagem": "https://...",
  "estoque": 5
}
```

#### POST /produtos
Cria um novo produto.

**Exemplo de requisição:**
```javascript
const newProduct = await createProduct({
  nome: "Novo Produto",
  descricao: "Descrição do produto",
  preco: 99.99,
  imagem: "https://...",
  estoque: 10
})
```

**Corpo da requisição:**
```json
{
  "nome": "Novo Produto",
  "descricao": "Descrição do produto",
  "preco": 99.99,
  "imagem": "https://...",
  "estoque": 10
}
```

### Tratamento de Erros e Loading

#### Loading States
- Estados de loading são gerenciados com `useState`
- Exibição de mensagens como "Carregando produtos..." durante requisições

#### Tratamento de Erros
- Try/catch em todas as chamadas de API
- Mensagens de erro exibidas ao usuário
- Verificação se JSON Server está rodando

**Exemplo:**
```javascript
try {
  setLoading(true)
  const data = await getProducts()
  setProducts(data)
} catch (error) {
  setError('Erro ao carregar produtos. Verifique se o JSON Server está rodando.')
} finally {
  setLoading(false)
}
```

## 🎨 Estilização com TailwindCSS

### Configuração

TailwindCSS foi configurado em:
- `tailwind.config.js`: Configuração do Tailwind
- `postcss.config.js`: Configuração do PostCSS
- `src/index.css`: Importação das diretivas do Tailwind

### Componentes Estilizados

- **Cards de Produtos**: Sombras, hover effects, badges
- **Páginas Responsivas**: Grid adaptativo, mobile-first
- **Botões**: Estados hover, disabled, cores diferentes
- **Inputs**: Estados de foco e erro com bordas coloridas
- **Feedback Visual**: Mensagens de sucesso/erro com cores distintas

### Exemplos de Classes Utilizadas

- `bg-blue-600`: Cor de fundo azul
- `hover:bg-blue-700`: Efeito hover
- `rounded-lg`: Bordas arredondadas
- `shadow-md`: Sombra média
- `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`: Grid responsivo
- `focus:ring-2 focus:ring-blue-500`: Anel de foco

## ✅ Validações Implementadas

### Formulários

1. **Campos Obrigatórios**:
   - Todos os campos do formulário são obrigatórios
   - Mensagens de erro exibidas abaixo dos inputs

2. **Validação de Tipos**:
   - Preço: Deve ser número ≥ 0
   - Estoque: Deve ser número inteiro ≥ 0

3. **Foco Automático**:
   - useRef utilizado para focar primeiro campo inválido
   - Melhora a experiência do usuário

### Carrinho

1. **Limite de Estoque**:
   - Não permite adicionar mais do que o estoque disponível
   - Bloqueia botão de aumentar quando atinge limite

2. **Quantidade Mínima**:
   - Não permite diminuir abaixo de 1
   - Se chegar a 0, remove do carrinho

3. **Mensagens Informativas**:
   - "Estoque máximo atingido" quando aplicável
   - "Produto esgotado" quando estoque = 0

## 📦 Dependências

### Produção
- `react`: ^18.2.0
- `react-dom`: ^18.2.0
- `react-router-dom`: ^6.20.0

### Desenvolvimento
- `vite`: ^5.0.8
- `@vitejs/plugin-react`: ^4.2.1
- `tailwindcss`: ^3.3.6
- `postcss`: ^8.4.32
- `autoprefixer`: ^10.4.16
- `json-server`: ^0.17.4

## 🔄 Fluxo de Navegação

```
Home (/)
  ├── Ver Detalhes → ProductDetails (/produto/:id)
  │     └── Adicionar ao Carrinho
  ├── Editar Produto → EditProduct (/editar/:id)
  │     └── Após editar → Home (/)
  ├── Deletar Produto → Remove da API
  ├── Carrinho → Cart (/carrinho)
  └── Cadastrar Produto → ProductForm (/cadastro)
        └── Após cadastro → Home (/)
```

## 📝 Observações

- O projeto não inclui gerenciamento de estoque (atualização automática) conforme escopo
- O projeto não inclui tela de edição de produtos conforme escopo
- O carrinho é persistido no localStorage
- Todas as validações são feitas no frontend
- O JSON Server precisa estar rodando para a aplicação funcionar

## 👨‍💻 Desenvolvido com

- React 18
- React Router DOM 6
- TailwindCSS 3
- Vite 5
- JSON Server

---

**Desenvolvido para avaliação prática AS - Mini E-commerce com React + JSON Server**

