import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, X } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Skeleton from '../components/ui/Skeleton'
import { useCart } from '../context'

const Cart = () => {
  const navigate = useNavigate()
  const { cart, loading, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart()
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [appliedCoupon, setAppliedCoupon] = useState(null)

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === 'welcome10') {
      setDiscount(cartTotal * 0.1)
      setAppliedCoupon('WELCOME10')
    } else if (couponCode.toLowerCase() === 'sweet20') {
      setDiscount(cartTotal * 0.2)
      setAppliedCoupon('SWEET20')
    } else {
      alert('Invalid coupon code')
    }
  }

  const handleRemoveCoupon = () => {
    setDiscount(0)
    setAppliedCoupon(null)
    setCouponCode('')
  }

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity)
    }
  }

  const handleCheckout = () => {
    navigate('/checkout')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-96 rounded-2xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50 animate-fade-in">
      {/* Header */}
      <div className="bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-serif text-4xl font-bold text-brown-900">Shopping Cart</h1>
          <p className="text-brown-600 mt-2">{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {cart.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="w-16 h-16 text-brown-400" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-brown-900 mb-4">Your cart is empty</h2>
            <p className="text-brown-600 mb-8">Looks like you haven't added any cookies yet</p>
            <Link to="/shop">
              <Button size="lg">
                Continue Shopping <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="p-6">
                    <div className="flex gap-6">
                      <div className="w-32 h-32 flex-shrink-0">
                        <img
                          src={item.images?.[0] || 'https://images.unsplash.com/photo-1499636138751-48d05c912cb4?w=200&h=200&fit=crop'}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <Link to={`/product/${item._id}`}>
                              <h3 className="font-serif text-xl font-bold text-brown-900 hover:text-brown-600 transition-colors">
                                {item.name}
                              </h3>
                            </Link>
                            <p className="text-sm text-brown-600">{item.category}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="p-2 hover:bg-cream-200 rounded-full transition-colors text-red-500"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-brown-200 rounded-lg">
                            <button
                              onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="p-2 hover:bg-cream-200 transition-colors disabled:opacity-50"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 font-semibold text-brown-900">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                              disabled={item.quantity >= item.stock}
                              className="p-2 hover:bg-cream-200 transition-colors disabled:opacity-50"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-2xl font-bold text-brown-900">₹{item.price * item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
              
              <div className="flex gap-4 mt-8">
                <Link to="/shop" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="text-red-500 border-red-500 hover:bg-red-50"
                >
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h2 className="font-serif text-2xl font-bold text-brown-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-brown-600">Subtotal</span>
                    <span className="font-semibold text-brown-900">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brown-600">Shipping</span>
                    <span className="font-semibold text-brown-900">{cartTotal >= 500 ? 'Free' : '₹50'}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedCoupon})</span>
                      <span className="font-semibold">-₹{discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-brown-200 pt-4">
                    <div className="flex justify-between">
                      <span className="font-bold text-brown-900">Total</span>
                      <span className="font-bold text-2xl text-brown-900">
                        ₹{Math.max(0, cartTotal + (cartTotal >= 500 ? 0 : 50) - discount).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-brown-900 mb-2">Coupon Code</label>
                  <div className="flex gap-2">
                    {appliedCoupon ? (
                      <div className="flex-1 flex items-center justify-between bg-green-100 text-green-800 px-4 py-3 rounded-lg">
                        <span className="font-semibold">{appliedCoupon} applied</span>
                        <button onClick={handleRemoveCoupon}>
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Enter coupon code"
                          className="flex-1 px-4 py-3 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-400"
                        />
                        <Button onClick={handleApplyCoupon}>Apply</Button>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-brown-500 mt-2">Try: WELCOME10 or SWEET20</p>
                </div>

                <Button size="lg" className="w-full" onClick={handleCheckout}>
                  Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                <div className="mt-6 p-4 bg-cream-100 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-brown-600">
                    <span className="text-green-500">✓</span>
                    <span>Free shipping on orders over ₹500</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
