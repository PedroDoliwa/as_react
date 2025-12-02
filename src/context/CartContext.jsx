import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart deve ser usado dentro de CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  // Carregar carrinho do localStorage ao inicializar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error)
      }
    }
  }, [])

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  // Adicionar produto ao carrinho
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      
      if (existingItem) {
        // Se já existe, verifica se pode aumentar a quantidade
        const newQuantity = existingItem.quantity + quantity
        if (newQuantity > product.estoque) {
          return prevItems // Não adiciona se ultrapassar estoque
        }
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        )
      } else {
        // Se não existe, adiciona novo item
        return [...prevItems, { ...product, quantity }]
      }
    })
  }

  // Remover produto do carrinho
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  // Atualizar quantidade de um item
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === productId) {
          // Verifica se não ultrapassa o estoque
          if (newQuantity > item.estoque) {
            return item // Mantém quantidade atual se ultrapassar
          }
          return { ...item, quantity: newQuantity }
        }
        return item
      })
    )
  }

  // Aumentar quantidade
  const increaseQuantity = (productId, maxStock) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === productId) {
          if (item.quantity >= maxStock) {
            return item // Não aumenta se já está no máximo
          }
          return { ...item, quantity: item.quantity + 1 }
        }
        return item
      })
    )
  }

  // Diminuir quantidade
  const decreaseQuantity = (productId) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === productId) {
          if (item.quantity <= 1) {
            return item // Não diminui abaixo de 1
          }
          return { ...item, quantity: item.quantity - 1 }
        }
        return item
      })
    )
  }

  // Limpar carrinho
  const clearCart = () => {
    setCartItems([])
  }

  // Verificar se produto está no carrinho
  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId)
  }

  // Obter quantidade de um produto no carrinho
  const getCartQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId)
    return item ? item.quantity : 0
  }

  // Calcular total do carrinho
  const getTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.preco * item.quantity)
    }, 0)
  }

  // Contar total de itens no carrinho
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isInCart,
    getCartQuantity,
    getTotal,
    getTotalItems
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

