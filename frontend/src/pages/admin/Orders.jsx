import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Eye } from 'lucide-react'
import Card from '../../components/ui/Card'
import Modal from '../../components/ui/Modal'
import axios from 'axios'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const statuses = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled']

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const response = await axios.get('/api/orders')
      setOrders(response.data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await axios.put(`/api/orders/${orderId}/status`, { status: newStatus })
      fetchOrders()
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  const handleViewOrder = (order) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

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

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shippingAddress?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shippingAddress?.email?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl font-bold text-brown-900">Orders</h1>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brown-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-brown-600" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-400"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Orders Table */}
      <Card className="p-6">
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-brown-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-brown-900">Order ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-brown-900">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-brown-900">Items</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-brown-900">Total</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-brown-900">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-brown-900">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-brown-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="border-b border-brown-100 hover:bg-cream-50">
                    <td className="py-3 px-4 text-sm font-semibold text-brown-900">
                      #{order._id.slice(-8).toUpperCase()}
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-semibold text-brown-900">{order.shippingAddress?.fullName}</p>
                        <p className="text-sm text-brown-600">{order.shippingAddress?.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-brown-600">{order.items.length} items</td>
                    <td className="py-3 px-4 text-sm font-semibold text-brown-900">₹{order.total}</td>
                    <td className="py-3 px-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)} border-0 cursor-pointer`}
                      >
                        {statuses.filter(s => s !== 'all').map(status => (
                          <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4 text-sm text-brown-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="p-2 hover:bg-cream-200 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4 text-brown-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Order Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Order #${selectedOrder?._id?.slice(-8).toUpperCase()}`}
      >
        {selectedOrder && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-brown-600">Customer</p>
                <p className="font-semibold text-brown-900">{selectedOrder.shippingAddress?.fullName}</p>
                <p className="text-sm text-brown-600">{selectedOrder.shippingAddress?.email}</p>
                <p className="text-sm text-brown-600">{selectedOrder.shippingAddress?.phone}</p>
              </div>
              <div>
                <p className="text-sm text-brown-600">Shipping Address</p>
                <p className="font-semibold text-brown-900">{selectedOrder.shippingAddress?.address}</p>
                <p className="text-sm text-brown-600">{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state}</p>
                <p className="text-sm text-brown-600">{selectedOrder.shippingAddress?.zipCode}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-brown-900 mb-3">Order Items</h3>
              <div className="space-y-3">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-cream-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-brown-900">{item.name}</p>
                      <p className="text-sm text-brown-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-brown-900">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-brown-200 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-brown-600">Subtotal</span>
                <span className="font-semibold text-brown-900">₹{selectedOrder.subtotal}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-brown-600">Shipping</span>
                <span className="font-semibold text-brown-900">₹{selectedOrder.shipping}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span className="text-brown-900">Total</span>
                <span className="text-brown-900">₹{selectedOrder.total}</span>
              </div>
            </div>

            {selectedOrder.specialInstructions && (
              <div>
                <h3 className="font-semibold text-brown-900 mb-2">Special Instructions</h3>
                <p className="text-sm text-brown-600">{selectedOrder.specialInstructions}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Orders
