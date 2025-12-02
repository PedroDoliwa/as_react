import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../services/api'
import { useCart } from '../context/CartContext'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, isInCart, getCartQuantity } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        const data = await getProductById(id)
        setProduct(data)
        setError(null)
      } catch (err) {
        setError('Produto não encontrado.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  const handleAddToCart = () => {
    if (!product) return

    const cartQuantity = getCartQuantity(product.id)
    
    if (product.estoque === 0) {
      setMessage('Produto esgotado!')
      return
    }

    if (cartQuantity >= product.estoque) {
      setMessage('Estoque máximo atingido!')
      return
    }

    addToCart(product, 1)
    setMessage('Produto adicionado ao carrinho!')
    setTimeout(() => setMessage(''), 3000)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-xl text-gray-600">Carregando produto...</div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded inline-block">
          {error || 'Produto não encontrado'}
        </div>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Voltar para Home
        </button>
      </div>
    )
  }

  const cartQuantity = getCartQuantity(product.id)
  const canAddToCart = product.estoque > 0 && cartQuantity < product.estoque
  const isMaxStock = cartQuantity >= product.estoque

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/')}
        className="mb-4 text-blue-600 hover:text-blue-800 flex items-center gap-2"
      >
        ← Voltar
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={product.imagem || 'https://via.placeholder.com/500x500?text=Sem+Imagem'}
              alt={product.nome}
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.nome}
            </h1>
            <p className="text-gray-600 mb-4 text-lg">
              {product.descricao || 'Sem descrição disponível.'}
            </p>
            <div className="mb-4">
              <span className="text-3xl font-bold text-blue-600">
                R$ {product.preco.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <div className="mb-6">
              <p className="text-gray-700">
                <span className="font-semibold">Estoque:</span>{' '}
                {product.estoque > 0 ? (
                  <span className="text-green-600">{product.estoque} unidades</span>
                ) : (
                  <span className="text-red-600">Esgotado</span>
                )}
              </p>
              {isInCart(product.id) && (
                <p className="text-gray-700 mt-2">
                  <span className="font-semibold">No carrinho:</span>{' '}
                  <span className="text-blue-600">{cartQuantity} unidades</span>
                </p>
              )}
            </div>

            {message && (
              <div
                className={`mb-4 p-3 rounded ${
                  message.includes('adicionado')
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {message}
              </div>
            )}

            {isMaxStock && product.estoque > 0 && (
              <div className="mb-4 p-3 rounded bg-yellow-100 text-yellow-700">
                Estoque máximo atingido
              </div>
            )}

            <button
              onClick={handleAddToCart}
              disabled={!canAddToCart}
              className={`w-full py-3 rounded font-semibold transition-colors ${
                canAddToCart
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {product.estoque === 0
                ? 'Produto Esgotado'
                : isMaxStock
                ? 'Estoque Máximo Atingido'
                : 'Adicionar ao Carrinho'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

