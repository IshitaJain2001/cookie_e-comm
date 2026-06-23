import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, ShoppingBag, Heart, MapPin, Settings, LogOut, Package, Clock, CheckCircle, XCircle } from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { useAuth } from '../../context'
import { useWishlist } from '../../context'
import axios from 'axios'
import API_URL from '../../config/api'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders()
    }
  }, [activeTab])

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/orders/my-orders`)
      setOrders(response.data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-4 h-4" />
      case 'cancelled': return <XCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-cream-50 animate-fade-in">
      {/* Header */}
      <div className="bg-brown-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold mb-2">My Dashboard</h1>
          <p className="text-cream-100">Welcome back, {user?.name || 'Customer'}!</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-brown-200">
                <div className="w-16 h-16 bg-brown-200 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-brown-600" />
                </div>
                <div>
                  <h3 className="font-bold text-brown-900">{user?.name || 'Customer'}</h3>
                  <p className="text-sm text-brown-600">{user?.email || ''}</p>
                </div>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-brown-600 text-white'
                        : 'text-brown-700 hover:bg-cream-200'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </nav>

              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 mt-6 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && <ProfileTab user={user} />}
            {activeTab === 'orders' && <OrdersTab orders={orders} loading={loading} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} />}
            {activeTab === 'wishlist' && <WishlistTab />}
            {activeTab === 'addresses' && <AddressesTab />}
            {activeTab === 'settings' && <SettingsTab />}
          </div>
        </div>
      </div>
    </div>
  )
}

const ProfileTab = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle profile update
    alert('Profile updated successfully!')
  }

  return (
    <Card className="p-8">
      <h2 className="font-serif text-2xl font-bold text-brown-900 mb-6">Profile Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-brown-900 mb-2">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-brown-900 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-brown-900 mb-2">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-400"
            />
          </div>
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
    </Card>
  )
}

const OrdersTab = ({ orders, loading, getStatusColor, getStatusIcon }) => {
  if (loading) {
    return <Card className="p-8">Loading orders...</Card>
  }

  if (orders.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Package className="w-16 h-16 text-brown-300 mx-auto mb-4" />
        <h3 className="font-serif text-xl font-bold text-brown-900 mb-2">No orders yet</h3>
        <p className="text-brown-600 mb-6">Start shopping to see your orders here</p>
        <Link to="/shop">
          <Button>Start Shopping</Button>
        </Link>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-bold text-brown-900">Order History</h2>
      {orders.map((order) => (
        <Card key={order._id} className="p-6">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-brown-200">
            <div>
              <p className="font-semibold text-brown-900">Order #{order._id.slice(-8).toUpperCase()}</p>
              <p className="text-sm text-brown-600">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <Badge className={getStatusColor(order.status)}>
              <span className="flex items-center gap-1">
                {getStatusIcon(order.status)}
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </Badge>
          </div>
          <div className="space-y-3 mb-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-16 h-16 bg-cream-100 rounded-lg flex items-center justify-center">
                  <Package className="w-8 h-8 text-brown-400" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-brown-900">{item.product?.name || 'Product'}</p>
                  <p className="text-sm text-brown-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-brown-900">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-brown-200">
            <p className="text-brown-600">Total</p>
            <p className="text-xl font-bold text-brown-900">₹{order.total}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}

const WishlistTab = () => {
  const { wishlist } = useWishlist()

  if (wishlist.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Heart className="w-16 h-16 text-brown-300 mx-auto mb-4" />
        <h3 className="font-serif text-xl font-bold text-brown-900 mb-2">Your wishlist is empty</h3>
        <p className="text-brown-600 mb-6">Save your favorite cookies here</p>
        <Link to="/shop">
          <Button>Browse Cookies</Button>
        </Link>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-bold text-brown-900">My Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <Card key={item._id} className="overflow-hidden">
            <div className="aspect-square">
              <img
                src={item.images?.[0] || 'https://images.unsplash.com/photo-1499636138751-48d05c912cb4?w=300&h=300&fit=crop'}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-brown-900 mb-2">{item.name}</h3>
              <p className="text-brown-600 font-semibold mb-4">₹{item.price}</p>
              <Link to={`/product/${item._id}`} className="block">
                <Button variant="primary" size="sm" className="w-full">View Details</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

const AddressesTab = () => {
  return (
    <Card className="p-8">
      <h2 className="font-serif text-2xl font-bold text-brown-900 mb-6">Saved Addresses</h2>
      <div className="text-center py-12">
        <MapPin className="w-16 h-16 text-brown-300 mx-auto mb-4" />
        <h3 className="font-serif text-xl font-bold text-brown-900 mb-2">No saved addresses</h3>
        <p className="text-brown-600 mb-6">Add your delivery addresses for faster checkout</p>
        <Button>Add New Address</Button>
      </div>
    </Card>
  )
}

const SettingsTab = () => {
  return (
    <Card className="p-8">
      <h2 className="font-serif text-2xl font-bold text-brown-900 mb-6">Account Settings</h2>
      <div className="space-y-6">
        <div className="p-4 border border-brown-200 rounded-lg">
          <h3 className="font-semibold text-brown-900 mb-2">Change Password</h3>
          <p className="text-sm text-brown-600 mb-4">Update your password to keep your account secure</p>
          <Button variant="outline">Change Password</Button>
        </div>
        <div className="p-4 border border-brown-200 rounded-lg">
          <h3 className="font-semibold text-brown-900 mb-2">Email Preferences</h3>
          <p className="text-sm text-brown-600 mb-4">Manage your email subscription preferences</p>
          <Button variant="outline">Manage Preferences</Button>
        </div>
        <div className="p-4 border border-red-200 rounded-lg">
          <h3 className="font-semibold text-red-900 mb-2">Delete Account</h3>
          <p className="text-sm text-red-600 mb-4">Permanently delete your account and all data</p>
          <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
            Delete Account
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default Dashboard
