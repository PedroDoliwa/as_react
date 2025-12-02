import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const ProductCard = ({ product, onEdit, onDelete, showActions = false }) => {
  const isOutOfStock = product.estoque === 0
  const { addToCart, isInCart, getCartQuantity } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (product.estoque === 0) {
      alert('Produto esgotado!')
      return
    }

    const cartQuantity = getCartQuantity(product.id)
    if (cartQuantity >= product.estoque) {
      alert('Estoque máximo atingido!')
      return
    }

    addToCart(product, 1)
    alert('Produto adicionado ao carrinho!')
  }

  const handleEdit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (onEdit) onEdit(product.id)
  }

  const handleDelete = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (onDelete) onDelete(product.id)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={product.imagem || 'https://via.placeholder.com/300x200?text=Sem+Imagem'}
          alt={product.nome}
          className="w-full h-48 object-cover"
        />
        {isOutOfStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Esgotado
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.nome}
        </h3>
        <p className="text-2xl font-bold text-blue-600 mb-4">
          R$ {product.preco.toFixed(2).replace('.', ',')}
        </p>
        
        <div className="space-y-2">
          <Link
            to={`/produto/${product.id}`}
            className="block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Ver Detalhes
          </Link>
          
          {!isOutOfStock && (
            <button
              onClick={handleAddToCart}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
            >
              Adicionar ao Carrinho
            </button>
          )}

          {showActions && (
            <div className="flex gap-2 pt-2 border-t">
              <button
                onClick={handleEdit}
                className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition-colors text-sm"
              >
                Editar
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors text-sm"
              >
                Deletar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard

