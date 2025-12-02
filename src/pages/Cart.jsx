import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

const Cart = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    getTotal
  } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Carrinho de Compras</h1>
        <p className="text-gray-600 text-lg mb-6">Seu carrinho está vazio.</p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors"
        >
          Continuar Comprando
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Carrinho de Compras</h1>

      <div className="space-y-4">
        {cartItems.map(item => {
          const isMaxStock = item.quantity >= item.estoque
          const itemTotal = item.preco * item.quantity

          return (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row md:items-center gap-4"
            >
              <div className="flex-shrink-0">
                <img
                  src={item.imagem || 'https://via.placeholder.com/150?text=Sem+Imagem'}
                  alt={item.nome}
                  className="w-24 h-24 object-cover rounded"
                />
              </div>

              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.nome}
                </h3>
                <p className="text-gray-600 mb-2">
                  Preço unitário: R$ {item.preco.toFixed(2).replace('.', ',')}
                </p>
                <p className="text-gray-600 mb-2">
                  Estoque disponível: {item.estoque} unidades
                </p>
                <p className="text-lg font-semibold text-blue-600">
                  Total: R$ {itemTotal.toFixed(2).replace('.', ',')}
                </p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-10 h-10 rounded font-bold transition-colors"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-12 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item.id, item.estoque)}
                    className={`w-10 h-10 rounded font-bold transition-colors ${
                      isMaxStock
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                    disabled={isMaxStock}
                  >
                    +
                  </button>
                </div>

                {isMaxStock && (
                  <p className="text-xs text-yellow-600 text-center">
                    Estoque máximo atingido
                  </p>
                )}

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition-colors"
                >
                  Remover
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-gray-800">Total:</span>
          <span className="text-3xl font-bold text-blue-600">
            R$ {getTotal().toFixed(2).replace('.', ',')}
          </span>
        </div>
        <div className="flex gap-4">
          <Link
            to="/"
            className="flex-1 bg-gray-200 text-gray-800 text-center py-3 rounded hover:bg-gray-300 transition-colors"
          >
            Continuar Comprando
          </Link>
          <button
            className="flex-1 bg-green-600 text-white py-3 rounded hover:bg-green-700 transition-colors"
            disabled
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart

