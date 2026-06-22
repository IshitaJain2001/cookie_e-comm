import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-100 via-cream-200 to-beige-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold text-brown-900">Forgot Password?</h1>
          <p className="text-brown-600 mt-2">No worries, we'll send you reset instructions</p>
        </div>

        <Card className="p-8">
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-brown-900 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brown-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-400"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <Button size="lg" className="w-full" type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-brown-900 mb-2">Check your email</h2>
              <p className="text-brown-600 mb-6">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSent(false)
                  setEmail('')
                }}
              >
                Send again
              </Button>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-brown-600 hover:text-brown-900 flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <Link to="/" className="text-sm text-brown-600 hover:text-brown-900">
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default ForgotPassword
