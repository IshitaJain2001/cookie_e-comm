import { useState, useEffect } from 'react'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutDashboard, ShoppingBag, Users, Package, TrendingUp, Settings, LogOut, Menu, X } from 'lucide-react'
import Card from '../../components/ui/Card'
import { useAuth } from '../../context'
import axios from 'axios'
import API_URL from '../../config/api'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0
  })
  const [recentOrders, setRecentOrders] = useState([])

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/')
    }
    fetchStats()
    fetchRecentOrders()
  }, [user, navigate])

  const fetchStats = async () => {
    try {
      const [ordersRes, productsRes, usersRes] = await Promise.all([
        axios.get(`${API_URL}/api/orders`),
        axios.get(`${API_URL}/api/products`),
        axios.get(`${API_URL}/api/users`)
      ])
      
      const totalRevenue = ordersRes.data.reduce((sum, order) => sum + order.total, 0)
      
      setStats({
        totalOrders: ordersRes.data.length,
        totalRevenue,
        totalProducts: productsRes.data.length,
        totalUsers: usersRes.data.length
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const fetchRecentOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/orders?limit=5`)
      setRecentOrders(response.data.slice(0, 5))
    } catch (error) {
      console.error('Error fetching recent orders:', error)
    }
  }

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/products', label: 'Products', icon: Package },
    { path: '/admin/orders', label: 'Orders', icon: ShoppingBag },
    { path: '/admin/customers', label: 'Customers', icon: Users },
    { path: '/admin/analytics', label: 'Analytics', icon: TrendingUp },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
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

  if (location.pathname === '/admin') {
    return (
      <div className="min-h-screen bg-cream-50">
        <AdminLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} menuItems={menuItems} logout={logout}>
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Revenue"
                value={`₹${stats.totalRevenue.toLocaleString()}`}
                icon={TrendingUp}
                color="bg-green-500"
                trend="+12.5%"
              />
              <StatCard
                title="Total Orders"
                value={stats.totalOrders}
                icon={ShoppingBag}
                color="bg-blue-500"
                trend="+8.2%"
              />
              <StatCard
                title="Total Products"
                value={stats.totalProducts}
                icon={Package}
                color="bg-purple-500"
                trend="+2"
              />
              <StatCard
                title="Total Customers"
                value={stats.totalUsers}
                icon={Users}
                color="bg-orange-500"
                trend="+15.3%"
              />
            </div>

            {/* Recent Orders */}
            <Card className="p-6">
              <h2 className="font-serif text-2xl font-bold text-brown-900 mb-6">Recent Orders</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-brown-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-brown-900">Order ID</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-brown-900">Customer</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-brown-900">Total</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-brown-900">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-brown-900">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order._id} className="border-b border-brown-100 hover:bg-cream-50">
                        <td className="py-3 px-4 text-sm text-brown-900">#{order._id.slice(-8).toUpperCase()}</td>
                        <td className="py-3 px-4 text-sm text-brown-600">{order.shippingAddress?.fullName || 'N/A'}</td>
                        <td className="py-3 px-4 text-sm font-semibold text-brown-900">₹{order.total}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-brown-600">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4">
                <Link to="/admin/orders" className="text-brown-600 hover:text-brown-900 font-semibold">
                  View All Orders →
                </Link>
              </div>
            </Card>
          </div>
        </AdminLayout>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <AdminLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} menuItems={menuItems} logout={logout}>
        <Outlet />
      </AdminLayout>
    </div>
  )
}

const AdminLayout = ({ sidebarOpen, setSidebarOpen, menuItems, logout, children }) => {
  const location = useLocation()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-brown-900 text-white transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="p-6">
          <h1 className="font-serif text-2xl font-bold">Cookie Tin</h1>
          <p className="text-cream-200 text-sm">Admin Panel</p>
        </div>
        <nav className="px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-brown-700 text-white'
                  : 'text-cream-100 hover:bg-brown-800'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-brown-200">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-cream-200 rounded-lg"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h2 className="font-serif text-xl font-bold text-brown-900 lg:hidden">Admin Dashboard</h2>
            <div className="hidden lg:block">
              <h2 className="font-serif text-xl font-bold text-brown-900">Admin Dashboard</h2>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className="text-sm text-green-600 font-semibold">{trend}</span>
      </div>
      <p className="text-sm text-brown-600 mb-1">{title}</p>
      <p className="text-3xl font-bold text-brown-900">{value}</p>
    </Card>
  </motion.div>
)

export default AdminDashboard
