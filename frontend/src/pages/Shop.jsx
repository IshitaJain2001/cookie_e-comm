import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, Grid, List, Heart, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Button'
import Skeleton from '../components/ui/Skeleton'
import { useCart } from '../context'
import { useWishlist } from '../context'
import Modal from '../components/ui/Modal'
import axios from 'axios'
import API_URL from '../config/api'

const Shop = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState('grid')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()

  const categories = ['all', 'chocolate', 'fruit', 'nut', 'sugar-free', 'seasonal']

  useEffect(() => {
    fetchProducts()
  }, [searchQuery, selectedCategory, sortBy])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchQuery) params.append('search', searchQuery)
      if (selectedCategory !== 'all') params.append('category', selectedCategory)
      params.append('sort', sortBy)
      
      const response = await axios.get(`${API_URL}/api/products?${params}`)
      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleQuickView = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleAddToCart = (productId) => {
    addToCart(productId)
  }

  const handleWishlist = (e, productId) => {
    e.preventDefault()
    e.stopPropagation()
    if (isInWishlist(productId)) {
      removeFromWishlist(productId)
    } else {
      addToWishlist(productId)
    }
  }

  return (
    <div className="min-h-screen bg-cream-50 animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brown-900 to-brown-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Our Collection</h1>
          <p className="text-xl text-cream-100">Discover our handcrafted artisan cookies</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full lg:w-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brown-400" />
              <input
                type="text"
                placeholder="Search cookies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-400"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-brown-600 text-white'
                      : 'bg-cream-200 text-brown-800 hover:bg-cream-300'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            {/* Sort and View */}
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-400"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest</option>
              </select>

              <div className="flex border border-brown-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${viewMode === 'grid' ? 'bg-brown-600 text-white' : 'bg-white text-brown-600'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' ? 'bg-brown-600 text-white' : 'bg-white text-brown-600'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'} gap-8`}>
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-96 rounded-2xl" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-brown-400" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-brown-900 mb-2">No cookies found</h3>
            <p className="text-brown-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              className="px-6 py-3 bg-brown-600 text-white rounded-lg font-semibold hover:bg-brown-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'} gap-8`}>
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                viewMode={viewMode}
                onQuickView={handleQuickView}
                onAddToCart={handleAddToCart}
                onWishlist={handleWishlist}
                isInWishlist={isInWishlist(product._id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedProduct?.name}
      >
        {selectedProduct && (
          <QuickViewContent product={selectedProduct} onAddToCart={() => handleAddToCart(selectedProduct._id)} />
        )}
      </Modal>
    </div>
  )
}

const ProductCard = ({ product, viewMode, onQuickView, onAddToCart, onWishlist, isInWishlist }) => {
  if (viewMode === 'list') {
    return (
      <Link to={`/product/${product._id}`} className="block">
        <Card className="p-6 flex gap-6 hover:shadow-2xl transition-shadow">
          <div className="w-48 h-48 flex-shrink-0">
            <img
              src={product.images?.[0] || 'https://images.unsplash.com/photo-1499636138751-48d05c912cb4?w=200&h=200&fit=crop'}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <Badge variant="gold" className="mb-2">{product.category}</Badge>
                <h3 className="font-serif text-xl font-bold text-brown-900">{product.name}</h3>
              </div>
              <button
                onClick={(e) => onWishlist(e, product._id)}
                className="p-2 hover:bg-cream-200 rounded-full transition-colors"
              >
                <Heart className={`w-6 h-6 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-brown-600'}`} />
              </button>
            </div>
            <p className="text-brown-600 mb-4 line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-brown-900">₹{product.price}</p>
                <p className="text-sm text-brown-600">{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    onQuickView(product)
                  }}
                  className="px-4 py-2 border border-brown-600 text-brown-600 rounded-lg hover:bg-brown-600 hover:text-white transition-colors"
                >
                  Quick View
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    onAddToCart(product._id)
                  }}
                  className="px-4 py-2 bg-brown-600 text-white rounded-lg hover:bg-brown-700 transition-colors flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group"
    >
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.images?.[0] || 'https://images.unsplash.com/photo-1499636138751-48d05c912cb4?w=400&h=400&fit=crop'}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="gold">{product.category}</Badge>
          </div>
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button
              onClick={(e) => onWishlist(e, product._id)}
              className="p-2 bg-white rounded-full shadow-lg hover:bg-cream-200 transition-colors"
            >
              <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-brown-600'}`} />
            </button>
          </div>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              onClick={() => onQuickView(product)}
              className="px-4 py-2 bg-white text-brown-900 rounded-lg font-semibold hover:bg-cream-200 transition-colors"
            >
              Quick View
            </button>
            <Link
              to={`/product/${product._id}`}
              className="px-4 py-2 bg-brown-600 text-white rounded-lg font-semibold hover:bg-brown-700 transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
        <div className="p-6">
          <h3 className="font-serif text-lg font-bold text-brown-900 mb-2 truncate">{product.name}</h3>
          <p className="text-brown-600 text-sm mb-4 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-brown-900">₹{product.price}</p>
            <button
              onClick={() => onAddToCart(product._id)}
              className="p-2 bg-brown-600 text-white rounded-lg hover:bg-brown-700 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

const QuickViewContent = ({ product, onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <img
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1499636138751-48d05c912cb4?w=400&h=400&fit=crop'}
          alt={product.name}
          className="w-full h-80 object-cover rounded-lg"
        />
      </div>
      <div>
        <Badge variant="gold" className="mb-4">{product.category}</Badge>
        <h3 className="font-serif text-2xl font-bold text-brown-900 mb-4">{product.name}</h3>
        <p className="text-brown-600 mb-6">{product.description}</p>
        <p className="text-3xl font-bold text-brown-900 mb-6">₹{product.price}</p>
        
        <div className="mb-6">
          <p className="text-sm text-brown-600 mb-2">Stock: {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}</p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-brown-600">Rating:</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating) ? 'text-gold-500' : 'text-brown-300'}>★</span>
              ))}
              <span className="ml-2 text-sm text-brown-600">({product.rating})</span>
            </div>
          </div>
        </div>

        <button
          onClick={onAddToCart}
          disabled={product.stock === 0}
          className="w-full py-3 bg-brown-600 text-white rounded-lg font-semibold hover:bg-brown-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  )
}

export default Shop
