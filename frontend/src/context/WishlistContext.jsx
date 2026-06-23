import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import API_URL from '../config/api'

const WishlistContext = createContext(null)

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWishlist()
  }, [])

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/wishlist`)
      setWishlist(response.data || [])
    } catch (error) {
      console.error('Error fetching wishlist:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToWishlist = async (productId) => {
    try {
      await axios.post(`${API_URL}/api/wishlist`, { productId })
      await fetchWishlist()
    } catch (error) {
      console.error('Error adding to wishlist:', error)
    }
  }

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`${API_URL}/api/wishlist/${productId}`)
      await fetchWishlist()
    } catch (error) {
      console.error('Error removing from wishlist:', error)
    }
  }

  const isInWishlist = (productId) => wishlist.some(item => item._id === productId)

  return (
    <WishlistContext.Provider value={{ wishlist, loading, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
