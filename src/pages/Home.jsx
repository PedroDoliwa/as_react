import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProducts, deleteProduct } from '../services/api'
import ProductCard from '../components/ProductCard'

const Home = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await getProducts()
      setProducts(data)
      setError(null)
    } catch (err) {
      setError('Erro ao carregar produtos. Verifique se o JSON Server está rodando.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleEdit = (productId) => {
    navigate(`/editar/${productId}`)
  }

  const handleDelete = async (productId) => {
    if (window.confirm('Tem certeza que deseja deletar este produto?')) {
      try {
        await deleteProduct(productId)
        // Recarregar lista de produtos
        await loadProducts()
        alert('Produto deletado com sucesso!')
      } catch (err) {
        alert('Erro ao deletar produto. Verifique se o JSON Server está rodando.')
        console.error(err)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-xl text-gray-600">Carregando produtos...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Produtos Disponíveis</h1>
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Nenhum produto cadastrado ainda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
              showActions={true}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home

