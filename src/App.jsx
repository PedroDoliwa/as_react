import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import ProductForm from './pages/ProductForm'
import EditProduct from './pages/EditProduct'
import NotFound from './pages/NotFound'

function App() {
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produto/:id" element={<ProductDetails />} />
            <Route path="/carrinho" element={<Cart />} />
            <Route path="/cadastro" element={<ProductForm />} />
            <Route path="/editar/:id" element={<EditProduct />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  )
}

export default App

