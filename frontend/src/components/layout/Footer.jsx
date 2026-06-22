import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-brown-900 text-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center">
                <span className="text-brown-900 font-serif font-bold text-xl">C</span>
              </div>
              <span className="font-serif font-bold text-2xl text-white">Cookie Tin</span>
            </div>
            <p className="text-cream-200 mb-6">
              Handcrafted artisan cookies made with love and the finest ingredients. Every bite tells a story of tradition and excellence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-cream-100 rounded-full hover:bg-gold-500 transition-colors">
                <Facebook className="w-5 h-5 text-brown-900" />
              </a>
              <a href="#" className="p-2 bg-cream-100 rounded-full hover:bg-gold-500 transition-colors">
                <Instagram className="w-5 h-5 text-brown-900" />
              </a>
              <a href="#" className="p-2 bg-cream-100 rounded-full hover:bg-gold-500 transition-colors">
                <Twitter className="w-5 h-5 text-brown-900" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-6 text-gold-400">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-cream-200 hover:text-gold-400 transition-colors">Home</Link></li>
              <li><Link to="/shop" className="text-cream-200 hover:text-gold-400 transition-colors">Shop</Link></li>
              <li><Link to="/about" className="text-cream-200 hover:text-gold-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-cream-200 hover:text-gold-400 transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="text-cream-200 hover:text-gold-400 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-6 text-gold-400">Customer Service</h3>
            <ul className="space-y-3">
              <li><Link to="/shipping" className="text-cream-200 hover:text-gold-400 transition-colors">Shipping Info</Link></li>
              <li><Link to="/returns" className="text-cream-200 hover:text-gold-400 transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/privacy" className="text-cream-200 hover:text-gold-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-cream-200 hover:text-gold-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/track-order" className="text-cream-200 hover:text-gold-400 transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-6 text-gold-400">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold-400 mt-1 flex-shrink-0" />
                <span className="text-cream-200">123 Bakery Street, Sweet Town, ST 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <span className="text-cream-200">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <span className="text-cream-200">hello@cookietin.com</span>
              </li>
            </ul>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3 text-gold-400">Subscribe to our newsletter</h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l-lg bg-cream-100 text-brown-900 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
                <button className="px-4 py-2 bg-gold-500 text-brown-900 font-semibold rounded-r-lg hover:bg-gold-400 transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-brown-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-cream-300 text-sm">
              © 2024 Cookie Tin. All rights reserved.
            </p>
            <p className="text-cream-300 text-sm mt-4 md:mt-0 flex items-center">
              Made with <Heart className="w-4 h-4 text-gold-400 mx-1 fill-current" /> for cookie lovers
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
