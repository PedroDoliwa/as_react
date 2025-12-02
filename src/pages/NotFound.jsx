import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="text-center py-12">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-4">Página não encontrada</h2>
      <p className="text-gray-600 mb-6">
        A página que você está procurando não existe.
      </p>
      <Link
        to="/"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors"
      >
        Voltar para Home
      </Link>
    </div>
  )
}

export default NotFound

