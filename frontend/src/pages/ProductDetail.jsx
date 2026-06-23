import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Heart, ShoppingCart, Truck, Shield, Leaf, Minus, Plus, Share2, ChevronLeft } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Skeleton from '../components/ui/Skeleton'
import { useCart } from '../context'
import { useWishlist } from '../context'
import axios from 'axios'
import API_URL from '../config/api'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [relatedProducts, setRelatedProducts] = useState([])
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${API_URL}/api/products/${id}`)
      setProduct(response.data)
      fetchRelatedProducts(response.data.category, response.data._id)
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedProducts = async (category, productId) => {
    try {
      const response = await axios.get(`${API_URL}/api/products?category=${category}&limit=4`)
      setRelatedProducts(response.data.filter(p => p._id !== productId))
    } catch (error) {
      console.error('Error fetching related products:', error)
    }
  }

  const handleAddToCart = () => {
    addToCart(product._id, quantity)
  }

  const handleWishlist = () => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id)
    } else {
      addToWishlist(product._id)
    }
  }

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Skeleton className="h-96 rounded-2xl" />
            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-32" />
              <Skeleton className="h-12 w-1/3" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold text-brown-900 mb-4">Product not found</h2>
          <Link to="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50 animate-fade-in">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-brown-600">
            <Link to="/" className="hover:text-brown-900">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-brown-900">Shop</Link>
            <span>/</span>
            <span className="text-brown-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={product.images?.[selectedImage] || 'https://images.unsplash.com/photo-1499636138751-48d05c912cb4?w=600&h=600&fit=crop'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-brown-600' : 'border-transparent hover:border-brown-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <Badge variant="gold" className="mb-4">{product.category}</Badge>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-brown-900 mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-gold-500 fill-current' : 'text-brown-300'}`}
                    />
                  ))}
                </div>
                <span className="text-brown-600">({product.rating} rating)</span>
                <span className="text-brown-400">|</span>
                <span className="text-brown-600">{product.reviews?.length || 0} reviews</span>
              </div>
              <p className="text-3xl font-bold text-brown-900">₹{product.price}</p>
            </div>

            <p className="text-lg text-brown-700 leading-relaxed">{product.description}</p>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-4 bg-white rounded-xl">
                <Truck className="w-6 h-6 text-brown-600 mb-2" />
                <span className="text-sm text-brown-600 text-center">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white rounded-xl">
                <Shield className="w-6 h-6 text-brown-600 mb-2" />
                <span className="text-sm text-brown-600 text-center">Quality Assured</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white rounded-xl">
                <Leaf className="w-6 h-6 text-brown-600 mb-2" />
                <span className="text-sm text-brown-600 text-center">Natural Ingredients</span>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-brown-900">Quantity:</span>
                <div className="flex items-center border border-brown-200 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-cream-200 transition-colors disabled:opacity-50"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-6 py-3 font-semibold text-brown-900">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="p-3 hover:bg-cream-200 transition-colors disabled:opacity-50"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <span className="text-sm text-brown-600">
                  {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                </span>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleWishlist}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(product._id) ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Ingredients */}
            <Card className="p-6">
              <h3 className="font-serif text-xl font-bold text-brown-900 mb-4">Ingredients</h3>
              <p className="text-brown-600">{product.ingredients || 'Premium flour, butter, sugar, eggs, vanilla extract, and our secret blend of spices.'}</p>
            </Card>

            {/* Nutritional Info */}
            <Card className="p-6">
              <h3 className="font-serif text-xl font-bold text-brown-900 mb-4">Nutritional Information (per 100g)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between">
                  <span className="text-brown-600">Calories</span>
                  <span className="font-semibold text-brown-900">{product.nutrition?.calories || '450 kcal'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brown-600">Protein</span>
                  <span className="font-semibold text-brown-900">{product.nutrition?.protein || '6g'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brown-600">Carbohydrates</span>
                  <span className="font-semibold text-brown-900">{product.nutrition?.carbs || '55g'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brown-600">Fat</span>
                  <span className="font-semibold text-brown-900">{product.nutrition?.fat || '22g'}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="font-serif text-3xl font-bold text-brown-900 mb-8">Customer Reviews</h2>
          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-6">
              {product.reviews.map((review, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cream-200 rounded-full flex items-center justify-center">
                      <span className="font-bold text-brown-900">{review.name?.charAt(0) || 'U'}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-brown-900">{review.name || 'Anonymous'}</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? 'text-gold-500 fill-current' : 'text-brown-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-brown-600">{review.comment}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <p className="text-brown-600">No reviews yet. Be the first to review this product!</p>
            </Card>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-3xl font-bold text-brown-900 mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct._id} to={`/product/${relatedProduct._id}`}>
                  <Card className="overflow-hidden hover:shadow-2xl transition-shadow">
                    <div className="aspect-square">
                      <img
                        src={relatedProduct.images?.[0] || 'https://images.unsplash.com/photo-1499636138751-48d05c912cb4?w=400&h=400&fit=crop'}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif font-bold text-brown-900 mb-2">{relatedProduct.name}</h3>
                      <p className="text-brown-600 font-semibold">₹{relatedProduct.price}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetail
