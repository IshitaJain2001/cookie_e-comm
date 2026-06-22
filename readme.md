# Cookie Tin - Premium E-Commerce Website

A luxury, full-stack e-commerce website for a premium cookie brand called "Cookie Tin". Built with modern technologies and designed for a high-end shopping experience.

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Framer Motion** - Animations
- **Lucide React** - Icon library
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## ✨ Features

### Customer Features
- **Home Page** - Hero section, featured products, testimonials, FAQ, newsletter
- **Shop Page** - Product grid with search, category filters, sorting, quick view
- **Product Detail Page** - Multiple images, descriptions, reviews, related products
- **Cart** - Quantity management, coupon codes, price breakdown
- **Checkout** - Address form, order summary, dummy payment gateway
- **Authentication** - Login, register, forgot password
- **User Dashboard** - Profile, order history, wishlist, addresses
- **Wishlist** - Save favorite products
- **Dark Mode** - Theme toggle
- **Toast Notifications** - User feedback
- **Responsive Design** - Mobile, tablet, desktop

### Admin Features
- **Dashboard** - Analytics overview, recent orders, stats
- **Product Management** - CRUD operations for products
- **Order Management** - View and update order status
- **Customer Management** - View customer information
- **Analytics** - Sales overview, top products
- **Settings** - Site configuration, notifications, security

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd cookie_tin
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

4. **Configure Environment Variables**

Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cookietin
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

5. **Seed the Database**
```bash
cd backend
npm run seed
```

This will create:
- 20 realistic cookie products
- 1 admin user (email: admin@cookietin.com, password: admin123)

## 🏃 Running the Application

### Start Backend
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

### Start Frontend
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

### Access the Application
- **Customer Site**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin
  - Login with: admin@cookietin.com / admin123

## 📁 Project Structure

```
cookie_tin/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── Cart.js
│   │   └── Wishlist.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   ├── cart.js
│   │   ├── wishlist.js
│   │   └── users.js
│   ├── seed.js
│   ├── server.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   └── ui/
│   │   │       ├── Button.jsx
│   │   │       ├── Card.jsx
│   │   │       ├── Modal.jsx
│   │   │       ├── Toaster.jsx
│   │   │       ├── Skeleton.jsx
│   │   │       └── Badge.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── CartContext.jsx
│   │   │   ├── WishlistContext.jsx
│   │   │   ├── ThemeContext.jsx
│   │   │   └── index.js
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Shop.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   └── ForgotPassword.jsx
│   │   │   ├── user/
│   │   │   │   └── Dashboard.jsx
│   │   │   └── admin/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── Products.jsx
│   │   │       ├── Orders.jsx
│   │   │       ├── Customers.jsx
│   │   │       ├── Analytics.jsx
│   │   │       └── Settings.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── index.html
│   └── package.json
└── README.md
```

## 🎨 Design Features

- **Premium Color Palette**: Cream, beige, brown, gold accents
- **Warm Bakery Theme**: Elegant and inviting
- **Smooth Animations**: Framer Motion for micro-interactions
- **Modern Typography**: Playfair Display (serif) + Inter (sans-serif)
- **Responsive Layout**: Mobile-first approach
- **Loading States**: Skeleton screens
- **Empty States**: User-friendly empty states

## 🔐 Authentication

- JWT-based authentication
- Secure password hashing with bcryptjs
- Protected routes for admin panel
- User context for authentication state

## 🛒 E-Commerce Features

- **Product Management**: Categories, ratings, stock, featured/bestseller flags
- **Shopping Cart**: Add/remove items, quantity management
- **Checkout Flow**: Address form, delivery options, dummy payment
- **Order Management**: Status tracking (pending, processing, shipped, delivered)
- **Coupon Codes**: Discount system (WELCOME10, SWEET20)
- **Wishlist**: Save favorite products

## 📊 Admin Panel

- **Dashboard**: Revenue, orders, customers, products stats
- **Products**: Full CRUD with image support
- **Orders**: View details, update status
- **Customers**: View customer information
- **Analytics**: Sales overview, top products
- **Settings**: Site configuration, notifications

## 🧪 Testing

The application includes:
- Form validation
- Error handling
- Loading states
- Empty state handling
- Toast notifications for user feedback

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
```
Deploy the `dist` folder

### Backend (Heroku/Railway/Render)
```bash
cd backend
npm start
```
Set environment variables in your hosting platform

### Database (MongoDB Atlas)
Update `MONGODB_URI` in `.env` with your MongoDB Atlas connection string

## 📝 API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Products
- GET `/api/products` - Get all products (with filters)
- GET `/api/products/:id` - Get single product
- POST `/api/products` - Create product (admin)
- PUT `/api/products/:id` - Update product (admin)
- DELETE `/api/products/:id` - Delete product (admin)

### Orders
- POST `/api/orders` - Create order
- GET `/api/orders/my-orders` - Get user's orders
- GET `/api/orders` - Get all orders (admin)
- PUT `/api/orders/:id/status` - Update order status (admin)

### Cart
- GET `/api/cart` - Get user's cart
- POST `/api/cart` - Add to cart
- PUT `/api/cart/:productId` - Update quantity
- DELETE `/api/cart/:productId` - Remove from cart
- DELETE `/api/cart` - Clear cart

### Wishlist
- GET `/api/wishlist` - Get user's wishlist
- POST `/api/wishlist` - Add to wishlist
- DELETE `/api/wishlist/:productId` - Remove from wishlist

## 🎯 Coupon Codes

- `WELCOME10` - 10% discount
- `SWEET20` - 20% discount

## 👥 Admin Credentials

- **Email**: admin@cookietin.com
- **Password**: admin123

## 📄 License

This project is for demonstration purposes.

## 🤝 Contributing

This is a demo project. Feel free to fork and customize for your needs.

## 📞 Support

For issues or questions, please open an issue in the repository.

---

Built with ❤️ for cookie lovers
