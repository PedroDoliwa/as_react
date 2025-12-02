import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Layout = ({ children }) => {
  const { getTotalItems } = useCart()

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold hover:text-blue-200">
              Mini E-commerce
            </Link>
            <div className="flex items-center gap-6">
              <Link
                to="/"
                className="hover:text-blue-200 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/cadastro"
                className="hover:text-blue-200 transition-colors"
              >
                Cadastrar Produto
              </Link>
              <Link
                to="/carrinho"
                className="relative hover:text-blue-200 transition-colors"
              >
                Carrinho
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}

export default Layout

