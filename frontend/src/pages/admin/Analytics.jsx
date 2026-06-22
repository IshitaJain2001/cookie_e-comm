import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from 'lucide-react'
import Card from '../../components/ui/Card'
import axios from 'axios'

const Analytics = () => {
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    customers: 0,
    products: 0,
    revenueGrowth: 0,
    ordersGrowth: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const [ordersRes, productsRes, usersRes] = await Promise.all([
        axios.get('/api/orders'),
        axios.get('/api/products'),
        axios.get('/api/users')
      ])
      
      const totalRevenue = ordersRes.data.reduce((sum, order) => sum + order.total, 0)
      const totalOrders = ordersRes.data.length
      
      setStats({
        revenue: totalRevenue,
        orders: totalOrders,
        customers: usersRes.data.length,
        products: productsRes.data.length,
        revenueGrowth: 12.5,
        ordersGrowth: 8.2
      })
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const StatCard = ({ title, value, icon: Icon, color, growth, positive }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className={`flex items-center gap-1 ${positive ? 'text-green-600' : 'text-red-600'}`}>
            {positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="text-sm font-semibold">{growth}%</span>
          </div>
        </div>
        <p className="text-sm text-brown-600 mb-1">{title}</p>
        <p className="text-3xl font-bold text-brown-900">{typeof value === 'number' ? value.toLocaleString() : value}</p>
      </Card>
    </motion.div>
  )

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl font-bold text-brown-900">Analytics</h1>

      {loading ? (
        <div className="text-center py-12">Loading analytics...</div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Revenue"
              value={`₹${stats.revenue}`}
              icon={DollarSign}
              color="bg-green-500"
              growth={stats.revenueGrowth}
              positive={true}
            />
            <StatCard
              title="Total Orders"
              value={stats.orders}
              icon={ShoppingCart}
              color="bg-blue-500"
              growth={stats.ordersGrowth}
              positive={true}
            />
            <StatCard
              title="Total Customers"
              value={stats.customers}
              icon={Users}
              color="bg-purple-500"
              growth={15.3}
              positive={true}
            />
            <StatCard
              title="Total Products"
              value={stats.products}
              icon={Package}
              color="bg-orange-500"
              growth={2}
              positive={true}
            />
          </div>

          {/* Sales Overview Chart Placeholder */}
          <Card className="p-6">
            <h2 className="font-serif text-xl font-bold text-brown-900 mb-6">Sales Overview</h2>
            <div className="h-64 flex items-center justify-center bg-cream-50 rounded-lg">
              <p className="text-brown-400">Chart visualization would go here</p>
            </div>
          </Card>

          {/* Top Products Placeholder */}
          <Card className="p-6">
            <h2 className="font-serif text-xl font-bold text-brown-900 mb-6">Top Selling Products</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-cream-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 bg-brown-200 rounded-full flex items-center justify-center font-bold text-brown-900">
                      {i}
                    </span>
                    <div>
                      <p className="font-semibold text-brown-900">Product {i}</p>
                      <p className="text-sm text-brown-600">{100 - i * 10} sold</p>
                    </div>
                  </div>
                  <p className="font-semibold text-brown-900">₹{(1000 - i * 100).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  )
}

export default Analytics
