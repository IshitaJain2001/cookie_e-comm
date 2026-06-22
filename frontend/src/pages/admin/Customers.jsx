import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Mail, Phone, MapPin } from 'lucide-react'
import Card from '../../components/ui/Card'
import axios from 'axios'

const Customers = () => {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    setLoading(true)
    try {
      const response = await axios.get('/api/users')
      setCustomers(response.data)
    } catch (error) {
      console.error('Error fetching customers:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCustomers = customers.filter(customer => 
    customer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl font-bold text-brown-900">Customers</h1>

      {/* Search */}
      <Card className="p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brown-400" />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-400"
          />
        </div>
      </Card>

      {/* Customers Grid */}
      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <motion.div
              key={customer._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-brown-200 rounded-full flex items-center justify-center">
                    <span className="font-bold text-brown-900">{customer.name?.charAt(0) || 'U'}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brown-900">{customer.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${customer.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                      {customer.role}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-brown-600">
                    <Mail className="w-4 h-4" />
                    {customer.email}
                  </div>
                  {customer.phone && (
                    <div className="flex items-center gap-2 text-sm text-brown-600">
                      <Phone className="w-4 h-4" />
                      {customer.phone}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-brown-600">
                    <MapPin className="w-4 h-4" />
                    {customer.addresses?.length || 0} addresses
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-brown-200">
                  <p className="text-xs text-brown-500">
                    Joined {new Date(customer.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Customers
