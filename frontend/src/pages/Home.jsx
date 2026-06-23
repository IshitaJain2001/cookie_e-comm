import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Truck, Shield, Leaf, Award, Heart } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { useEffect, useState } from 'react'
import axios from 'axios'
import API_URL from '../config/api'

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/products?featured=true&limit=8`)
      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Food Blogger',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      text: 'The best cookies I\'ve ever tasted! The chocolate chip cookies are absolutely divine. Perfectly crispy on the outside and chewy on the inside.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Loyal Customer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      text: 'Cookie Tin has become our family\'s go-to for special occasions. The quality and taste are unmatched. Highly recommend!',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Pastry Chef',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      text: 'As a professional pastry chef, I\'m very particular about cookies. Cookie Tin exceeds my expectations every single time.',
      rating: 5
    }
  ]

  const features = [
    { icon: Truck, title: 'Free Shipping', description: 'On orders over ₹500' },
    { icon: Shield, title: 'Quality Guaranteed', description: '100% satisfaction guarantee' },
    { icon: Leaf, title: 'Natural Ingredients', description: 'No artificial preservatives' },
    { icon: Award, title: 'Award Winning', description: 'Best artisan cookies 2024' }
  ]

  const instagramImages = [
    'https://images.unsplash.com/photo-1499636138751-48d05c912cb4?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=300&h=300&fit=crop'
  ]

  const faqs = [
    {
      question: 'What makes your cookies special?',
      answer: 'Our cookies are handcrafted using traditional recipes passed down through generations. We use only the finest ingredients, including premium Belgian chocolate, pure vanilla extract, and locally sourced butter.'
    },
    {
      question: 'How long do the cookies stay fresh?',
      answer: 'Our cookies stay fresh for up to 2 weeks when stored in an airtight container at room temperature. For longer storage, you can freeze them for up to 3 months.'
    },
    {
      question: 'Do you offer custom orders?',
      answer: 'Yes! We offer custom cookie orders for special occasions, corporate events, and gifts. Contact us at least 48 hours in advance for custom orders.'
    },
    {
      question: 'Are your cookies nut-free?',
      answer: 'While we offer some nut-free options, our kitchen handles nuts and other allergens. Please check individual product descriptions and contact us if you have severe allergies.'
    }
  ]

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-cream-100 via-cream-200 to-beige-200">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gold-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-brown-400 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="gold" className="mb-6">Premium Artisan Cookies</Badge>
              <h1 className="font-serif text-5xl md:text-7xl font-bold text-brown-900 mb-6 leading-tight">
                Handcrafted with
                <span className="text-brown-600"> Love</span>
              </h1>
              <p className="text-xl text-brown-700 mb-8 leading-relaxed">
                Experience the perfect blend of tradition and innovation. Every cookie tells a story of passion, quality, and the finest ingredients.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/shop">
                  <Button size="lg" className="w-full sm:w-auto">
                    Shop Now <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Our Story
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-8 mt-12">
                <div>
                  <p className="text-3xl font-bold text-brown-900">50K+</p>
                  <p className="text-brown-600">Happy Customers</p>
                </div>
                <div className="w-px h-12 bg-brown-300" />
                <div>
                  <p className="text-3xl font-bold text-brown-900">4.9</p>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-gold-500 fill-current" />
                    <span className="text-brown-600 ml-1">Rating</span>
                  </div>
                </div>
                <div className="w-px h-12 bg-brown-300" />
                <div>
                  <p className="text-3xl font-bold text-brown-900">20+</p>
                  <p className="text-brown-600">Varieties</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1499636138751-48d05c912cb4?w=600&h=600&fit=crop"
                  alt="Premium Cookies"
                  className="rounded-3xl shadow-2xl w-full max-w-lg mx-auto transform rotate-2 hover:rotate-0 transition-transform duration-500"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-brown-900 fill-current" />
                    </div>
                    <div>
                      <p className="font-bold text-brown-900">Made with Love</p>
                      <p className="text-sm text-brown-600">Since 2020</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-4">Our Best Sellers</Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-brown-900 mb-4">
              Featured Cookies
            </h2>
            <p className="text-xl text-brown-600 max-w-2xl mx-auto">
              Discover our most loved creations, crafted to perfection
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="skeleton h-96 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link to="/shop">
              <Button variant="outline" size="lg">
                View All Products <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="gold" className="mb-4">Why Choose Us</Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-brown-900 mb-4">
              The Cookie Tin Difference
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 text-center h-full hover:scale-105 transition-transform">
                  <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-brown-900" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-brown-900 mb-3">{feature.title}</h3>
                  <p className="text-brown-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-brown-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="gold" className="mb-4">Testimonials</Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              What Our Customers Say
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-gold-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-brown-700 mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold text-brown-900">{testimonial.name}</p>
                      <p className="text-sm text-brown-600">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-4">Follow Us</Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-brown-900 mb-4">
              @cookietin
            </h2>
            <p className="text-xl text-brown-600">Join our community on Instagram</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {instagramImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-xl aspect-square cursor-pointer"
              >
                <img
                  src={image}
                  alt={`Instagram ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brown-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white fill-current" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="gold" className="mb-4">FAQ</Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-brown-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-brown-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Get Sweet Deals
          </h2>
          <p className="text-xl text-cream-100 mb-8">
            Subscribe to our newsletter and get 10% off your first order
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
            <Button variant="gold" size="lg" className="w-full sm:w-auto">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <Card className="overflow-hidden group cursor-pointer">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.images?.[0] || 'https://images.unsplash.com/photo-1499636138751-48d05c912cb4?w=400&h=400&fit=crop'}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 right-4">
            <Badge variant="gold">{product.category}</Badge>
          </div>
        </div>
        <div className="p-6">
          <h3 className="font-serif text-lg font-bold text-brown-900 mb-2">{product.name}</h3>
          <p className="text-brown-600 text-sm mb-4 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-brown-900">₹{product.price}</p>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-gold-500 fill-current" />
              <span className="text-sm text-brown-600">{product.rating}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-cream-50 transition-colors"
      >
        <span className="font-semibold text-brown-900">{question}</span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-brown-600">
          {answer}
        </div>
      )}
    </div>
  )
}

export default Home
