import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, ShoppingBag, Heart, User, Moon, Sun, Search } from 'lucide-react'
import { useAuth } from '../../context'
import { useCart } from '../../context'
import { useWishlist } from '../../context'
import { useTheme } from '../../context'
import Button from '../ui/Button'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { cartCount } = useCart()
  const { wishlist } = useWishlist()
  const { isDark, toggleTheme } = useTheme()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/shop?search=${searchQuery}`)
      setSearchQuery('')
    }
  }

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-brown-600 rounded-full flex items-center justify-center">
              <span className="text-white font-serif font-bold text-xl">C</span>
            </div>
            <span className="font-serif font-bold text-2xl text-brown-900">Cookie Tin</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-brown-800 hover:text-brown-600 font-medium transition-colors">Home</Link>
            <Link to="/shop" className="text-brown-800 hover:text-brown-600 font-medium transition-colors">Shop</Link>
            <Link to="/about" className="text-brown-800 hover:text-brown-600 font-medium transition-colors">About</Link>
            <Link to="/contact" className="text-brown-800 hover:text-brown-600 font-medium transition-colors">Contact</Link>
            <button onClick={toggleTheme} className="p-2 hover:bg-cream-200 rounded-full transition-colors">
              {isDark ? <Sun className="w-5 h-5 text-brown-600" /> : <Moon className="w-5 h-5 text-brown-600" />}
            </button>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cookies..."
                className="w-64 pl-10 pr-4 py-2 border border-brown-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brown-400"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brown-400" />
            </div>
          </form>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-cream-200 rounded-full transition-colors"
            >
              {isDark ? <Sun className="w-6 h-6 text-brown-600" /> : <Moon className="w-6 h-6 text-brown-600" />}
            </button>
            
            <Link to="/wishlist" className="p-2 hover:bg-cream-200 rounded-full transition-colors relative">
              <Heart className="w-6 h-6 text-brown-600" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-500 text-brown-900 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>
            
            <Link to="/cart" className="p-2 hover:bg-cream-200 rounded-full transition-colors relative">
              <ShoppingBag className="w-6 h-6 text-brown-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brown-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="relative group">
                <button className="p-2 hover:bg-cream-200 rounded-full transition-colors">
                  <User className="w-6 h-6 text-brown-600" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link to="/dashboard" className="block px-4 py-2 hover:bg-cream-100">Dashboard</Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="block px-4 py-2 hover:bg-cream-100">Admin Panel</Link>
                  )}
                  <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-cream-100">Logout</button>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="primary" size="sm">Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-cream-200 rounded-full transition-colors"
          >
            {isOpen ? <X className="w-6 h-6 text-brown-600" /> : <Menu className="w-6 h-6 text-brown-600" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-cream-200">
          <div className="px-4 py-4 space-y-3">
            <form onSubmit={handleSearch} className="flex items-center mb-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cookies..."
                  className="w-full pl-10 pr-4 py-2 border border-brown-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brown-400"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brown-400" />
              </div>
            </form>
            
            <Link to="/" className="block py-2 text-brown-800 hover:text-brown-600 font-medium">Home</Link>
            <Link to="/shop" className="block py-2 text-brown-800 hover:text-brown-600 font-medium">Shop</Link>
            <Link to="/about" className="block py-2 text-brown-800 hover:text-brown-600 font-medium">About</Link>
            <Link to="/contact" className="block py-2 text-brown-800 hover:text-brown-600 font-medium">Contact</Link>
            
            <div className="flex items-center space-x-4 pt-4 border-t border-cream-200">
              <button onClick={toggleTheme} className="p-2 hover:bg-cream-200 rounded-full">
                {isDark ? <Sun className="w-6 h-6 text-brown-600" /> : <Moon className="w-6 h-6 text-brown-600" />}
              </button>
              <Link to="/wishlist" className="p-2 hover:bg-cream-200 rounded-full relative">
                <Heart className="w-6 h-6 text-brown-600" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold-500 text-brown-900 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="p-2 hover:bg-cream-200 rounded-full relative">
                <ShoppingBag className="w-6 h-6 text-brown-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brown-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
            
            {user ? (
              <div className="pt-4 border-t border-cream-200">
                <Link to="/dashboard" className="block py-2 text-brown-800 hover:text-brown-600">Dashboard</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="block py-2 text-brown-800 hover:text-brown-600">Admin Panel</Link>
                )}
                <button onClick={logout} className="block w-full text-left py-2 text-brown-800 hover:text-brown-600">Logout</button>
              </div>
            ) : (
              <div className="pt-4 border-t border-cream-200">
                <Link to="/login" className="block py-2 text-brown-800 hover:text-brown-600">Login</Link>
                <Link to="/register" className="block py-2 text-brown-800 hover:text-brown-600">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
