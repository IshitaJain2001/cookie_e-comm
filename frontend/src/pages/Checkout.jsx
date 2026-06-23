import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CreditCard, Truck, Lock, CheckCircle, ArrowRight } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { useCart } from '../context'
import { useAuth } from '../context'
import axios from 'axios'
import API_URL from '../config/api'

const Checkout = () => {
  const navigate = useNavigate()
  const { cart, cartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState(null)

  const [formData, setFormData] = useState({
    // Shipping
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    
    // Payment
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    saveCard: false,
    
    // Delivery
    deliveryOption: 'standard',
    specialInstructions: ''
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Create order
      const orderData = {
        items: cart.map(item => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price
        })),
        shippingAddress: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        deliveryOption: formData.deliveryOption,
        specialInstructions: formData.specialInstructions,
        subtotal: cartTotal,
        shipping: cartTotal >= 500 ? 0 : 50,
        total: cartTotal + (cartTotal >= 500 ? 0 : 50)
      }

      const response = await axios.post(`${API_URL}/api/orders`, orderData)
      setOrderId(response.data._id)
      clearCart()
      setOrderPlaced(true)
    } catch (error) {
      console.error('Error placing order:', error)
      alert('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <Card className="p-12 text-center">
          <h2 className="font-serif text-2xl font-bold text-brown-900 mb-4">Your cart is empty</h2>
          <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
        </Card>
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full mx-4"
        >
          <Card className="p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-brown-900 mb-4">Order Placed!</h2>
            <p className="text-brown-600 mb-6">Thank you for your order. Your cookies are being prepared with love.</p>
            <p className="text-sm text-brown-500 mb-8">Order ID: {orderId}</p>
            <Button onClick={() => navigate('/dashboard')} className="w-full">
              View Order History
            </Button>
          </Card>
        </motion.div>
      </div>
    )
  }

  const shippingCost = cartTotal >= 500 ? 0 : 50
  const total = cartTotal + shippingCost

  return (
    <div className="min-h-screen bg-cream-50 animate-fade-in">
      {/* Header */}
      <div className="bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-serif text-4xl font-bold text-brown-900">Checkout</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Shipping Information */}
              <Card className="p-6 mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <Truck className="w-6 h-6 text-brown-600" />
                  <h2 className="font-serif text-2xl font-bold text-brown-900">Shipping Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-brown-900 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-400"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-brown-900 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-brown-900 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-brown-900 mb-2">Zip Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-400"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-brown-900 mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-brown-900 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-brown-900 mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-400"
                    />
                  </div>
                </div>
              </Card>

              {/* Delivery Options */}
              <Card className="p-6 mb-6">
                <h2 className="font-serif text-2xl font-bold text-brown-900 mb-6">Delivery Options</h2>
                
                <div className="space-y-4">
                  <label className="flex items-center p-4 border border-brown-200 rounded-lg cursor-pointer hover:border-brown-400 transition-colors">
                    <input
                      type="radio"
                      name="deliveryOption"
                      value="standard"
                      checked={formData.deliveryOption === 'standard'}
                      onChange={handleChange}
                      className="mr-4"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-brown-900">Standard Delivery</p>
                      <p className="text-sm text-brown-600">3-5 business days</p>
                    </div>
                    <p className="font-semibold text-brown-900">{shippingCost === 0 ? 'FREE' : '₹50'}</p>
                  </label>
                  
                  <label className="flex items-center p-4 border border-brown-200 rounded-lg cursor-pointer hover:border-brown-400 transition-colors">
                    <input
                      type="radio"
                      name="deliveryOption"
                      value="express"
                      checked={formData.deliveryOption === 'express'}
                      onChange={handleChange}
                      className="mr-4"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-brown-900">Express Delivery</p>
                      <p className="text-sm text-brown-600">1-2 business days</p>
                    </div>
                    <p className="font-semibold text-brown-900">₹100</p>
                  </label>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-semibold text-brown-900 mb-2">Special Instructions (Optional)</label>
                  <textarea
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-400"
                    placeholder="Any special requests for your order..."
                  />
                </div>
              </Card>

              {/* Payment Information */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="w-6 h-6 text-brown-600" />
                  <h2 className="font-serif text-2xl font-bold text-brown-900">Payment Information</h2>
                </div>
                
                <div className="bg-cream-100 p-4 rounded-lg mb-6 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-green-600" />
                  <p className="text-sm text-brown-600">This is a demo. No real payment will be processed.</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-brown-900 mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-brown-900 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-400"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-brown-900 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-400"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-brown-900 mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        className="w-full px-4 py-3 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-400"
                      />
                    </div>
                  </div>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="saveCard"
                      checked={formData.saveCard}
                      onChange={handleChange}
                      className="rounded"
                    />
                    <span className="text-sm text-brown-600">Save card for future purchases</span>
                  </label>
                </div>
              </Card>

              <Button
                size="lg"
                className="w-full mt-6"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Place Order'} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="font-serif text-2xl font-bold text-brown-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item._id} className="flex gap-4">
                    <div className="w-16 h-16 flex-shrink-0">
                      <img
                        src={item.images?.[0] || 'https://images.unsplash.com/photo-1499636138751-48d05c912cb4?w=100&h=100&fit=crop'}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-brown-900 text-sm">{item.name}</h3>
                      <p className="text-sm text-brown-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-brown-900">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-brown-200 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-brown-600">Subtotal</span>
                  <span className="font-semibold text-brown-900">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brown-600">Shipping</span>
                  <span className="font-semibold text-brown-900">{shippingCost === 0 ? 'Free' : '₹' + shippingCost}</span>
                </div>
                <div className="border-t border-brown-200 pt-3">
                  <div className="flex justify-between">
                    <span className="font-bold text-brown-900">Total</span>
                    <span className="font-bold text-2xl text-brown-900">₹{total}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
