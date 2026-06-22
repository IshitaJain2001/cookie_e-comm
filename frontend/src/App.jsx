import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider, CartProvider, WishlistProvider, ThemeProvider } from './context'
import { Toaster } from './components/ui/Toaster'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Pages
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import UserDashboard from './pages/user/Dashboard'
import AdminDashboard from './pages/admin/Dashboard'
import AdminProducts from './pages/admin/Products'
import AdminOrders from './pages/admin/Orders'
import AdminCustomers from './pages/admin/Customers'
import AdminAnalytics from './pages/admin/Analytics'
import AdminSettings from './pages/admin/Settings'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/dashboard" element={<UserDashboard />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/products" element={<AdminDashboard><AdminProducts /></AdminDashboard>} />
                    <Route path="/admin/orders" element={<AdminDashboard><AdminOrders /></AdminDashboard>} />
                    <Route path="/admin/customers" element={<AdminDashboard><AdminCustomers /></AdminDashboard>} />
                    <Route path="/admin/analytics" element={<AdminDashboard><AdminAnalytics /></AdminDashboard>} />
                    <Route path="/admin/settings" element={<AdminDashboard><AdminSettings /></AdminDashboard>} />
                  </Routes>
                </main>
                <Footer />
              </div>
              <Toaster />
            </Router>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
