import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProduct } from '../services/api'

const ProductForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    imagem: '',
    estoque: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // Refs para focar campos inválidos
  const nomeRef = useRef(null)
  const descricaoRef = useRef(null)
  const precoRef = useRef(null)
  const imagemRef = useRef(null)
  const estoqueRef = useRef(null)

  const validateField = (name, value) => {
    const newErrors = { ...errors }

    switch (name) {
      case 'nome':
        if (!value.trim()) {
          newErrors.nome = 'Nome é obrigatório'
        } else {
          delete newErrors.nome
        }
        break
      case 'descricao':
        if (!value.trim()) {
          newErrors.descricao = 'Descrição é obrigatória'
        } else {
          delete newErrors.descricao
        }
        break
      case 'preco':
        if (!value.trim()) {
          newErrors.preco = 'Preço é obrigatório'
        } else {
          const precoNum = parseFloat(value)
          if (isNaN(precoNum) || precoNum < 0) {
            newErrors.preco = 'Preço deve ser um número maior ou igual a 0'
          } else {
            delete newErrors.preco
          }
        }
        break
      case 'imagem':
        if (!value.trim()) {
          newErrors.imagem = 'URL da imagem é obrigatória'
        } else {
          delete newErrors.imagem
        }
        break
      case 'estoque':
        if (!value.trim()) {
          newErrors.estoque = 'Estoque é obrigatório'
        } else {
          const estoqueNum = parseInt(value)
          if (isNaN(estoqueNum) || estoqueNum < 0) {
            newErrors.estoque = 'Estoque deve ser um número inteiro maior ou igual a 0'
          } else {
            delete newErrors.estoque
          }
        }
        break
      default:
        break
    }

    setErrors(newErrors)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    validateField(name, value)
  }

  const validateForm = () => {
    const newErrors = {}

    // Validar todos os campos
    Object.keys(formData).forEach(key => {
      validateField(key, formData[key])
    })

    // Verificar se há erros após validação
    const hasErrors = Object.keys(errors).length > 0 || 
      !formData.nome.trim() ||
      !formData.descricao.trim() ||
      !formData.preco.trim() ||
      !formData.imagem.trim() ||
      !formData.estoque.trim()

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório'
      nomeRef.current?.focus()
    }
    if (!formData.descricao.trim()) {
      newErrors.descricao = 'Descrição é obrigatória'
      if (!newErrors.nome) descricaoRef.current?.focus()
    }
    if (!formData.preco.trim()) {
      newErrors.preco = 'Preço é obrigatório'
      if (!newErrors.nome && !newErrors.descricao) precoRef.current?.focus()
    } else {
      const precoNum = parseFloat(formData.preco)
      if (isNaN(precoNum) || precoNum < 0) {
        newErrors.preco = 'Preço deve ser um número maior ou igual a 0'
        if (!newErrors.nome && !newErrors.descricao) precoRef.current?.focus()
      }
    }
    if (!formData.imagem.trim()) {
      newErrors.imagem = 'URL da imagem é obrigatória'
      if (!newErrors.nome && !newErrors.descricao && !newErrors.preco) imagemRef.current?.focus()
    }
    if (!formData.estoque.trim()) {
      newErrors.estoque = 'Estoque é obrigatório'
      if (!newErrors.nome && !newErrors.descricao && !newErrors.preco && !newErrors.imagem) estoqueRef.current?.focus()
    } else {
      const estoqueNum = parseInt(formData.estoque)
      if (isNaN(estoqueNum) || estoqueNum < 0) {
        newErrors.estoque = 'Estoque deve ser um número inteiro maior ou igual a 0'
        if (!newErrors.nome && !newErrors.descricao && !newErrors.preco && !newErrors.imagem) estoqueRef.current?.focus()
      }
    }

    setErrors(newErrors)

    // Focar no primeiro campo com erro
    if (newErrors.nome) {
      nomeRef.current?.focus()
      return false
    }
    if (newErrors.descricao) {
      descricaoRef.current?.focus()
      return false
    }
    if (newErrors.preco) {
      precoRef.current?.focus()
      return false
    }
    if (newErrors.imagem) {
      imagemRef.current?.focus()
      return false
    }
    if (newErrors.estoque) {
      estoqueRef.current?.focus()
      return false
    }

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const productData = {
        nome: formData.nome.trim(),
        descricao: formData.descricao.trim(),
        preco: parseFloat(formData.preco),
        imagem: formData.imagem.trim(),
        estoque: parseInt(formData.estoque)
      }

      await createProduct(productData)
      navigate('/')
    } catch (error) {
      setSubmitError('Erro ao cadastrar produto. Verifique se o JSON Server está rodando.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Cadastrar Novo Produto</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {submitError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {submitError}
          </div>
        )}

        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
            Nome do Produto *
          </label>
          <input
            ref={nomeRef}
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            onBlur={() => validateField('nome', formData.nome)}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.nome
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="Digite o nome do produto"
          />
          {errors.nome && (
            <p className="mt-1 text-sm text-red-600">{errors.nome}</p>
          )}
        </div>

        <div>
          <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-2">
            Descrição *
          </label>
          <textarea
            ref={descricaoRef}
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            onBlur={() => validateField('descricao', formData.descricao)}
            rows="4"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.descricao
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="Digite a descrição do produto"
          />
          {errors.descricao && (
            <p className="mt-1 text-sm text-red-600">{errors.descricao}</p>
          )}
        </div>

        <div>
          <label htmlFor="preco" className="block text-sm font-medium text-gray-700 mb-2">
            Preço (R$) *
          </label>
          <input
            ref={precoRef}
            type="number"
            id="preco"
            name="preco"
            value={formData.preco}
            onChange={handleChange}
            onBlur={() => validateField('preco', formData.preco)}
            step="0.01"
            min="0"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.preco
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="0.00"
          />
          {errors.preco && (
            <p className="mt-1 text-sm text-red-600">{errors.preco}</p>
          )}
        </div>

        <div>
          <label htmlFor="imagem" className="block text-sm font-medium text-gray-700 mb-2">
            URL da Imagem *
          </label>
          <input
            ref={imagemRef}
            type="url"
            id="imagem"
            name="imagem"
            value={formData.imagem}
            onChange={handleChange}
            onBlur={() => validateField('imagem', formData.imagem)}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.imagem
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="https://exemplo.com/imagem.jpg"
          />
          {errors.imagem && (
            <p className="mt-1 text-sm text-red-600">{errors.imagem}</p>
          )}
        </div>

        <div>
          <label htmlFor="estoque" className="block text-sm font-medium text-gray-700 mb-2">
            Estoque *
          </label>
          <input
            ref={estoqueRef}
            type="number"
            id="estoque"
            name="estoque"
            value={formData.estoque}
            onChange={handleChange}
            onBlur={() => validateField('estoque', formData.estoque)}
            min="0"
            step="1"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.estoque
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="0"
          />
          {errors.estoque && (
            <p className="mt-1 text-sm text-red-600">{errors.estoque}</p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar Produto'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm

