const API_URL = 'http://localhost:3001'

// Função auxiliar para fazer requisições
const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    })

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Erro na API:', error)
    throw error
  }
}

// GET - Listar todos os produtos
export const getProducts = async () => {
  return fetchAPI('/produtos')
}

// GET - Buscar produto por ID
export const getProductById = async (id) => {
  return fetchAPI(`/produtos/${id}`)
}

// POST - Criar novo produto
export const createProduct = async (product) => {
  return fetchAPI('/produtos', {
    method: 'POST',
    body: JSON.stringify(product)
  })
}

// PUT - Atualizar produto
export const updateProduct = async (id, product) => {
  return fetchAPI(`/produtos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(product)
  })
}

// DELETE - Deletar produto
export const deleteProduct = async (id) => {
  return fetchAPI(`/produtos/${id}`, {
    method: 'DELETE'
  })
}

