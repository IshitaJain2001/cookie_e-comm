const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['chocolate', 'fruit', 'nut', 'sugar-free', 'seasonal', 'classic']
  },
  images: [{
    type: String
  }],
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  ingredients: {
    type: String,
    default: 'Premium flour, butter, sugar, eggs, vanilla extract'
  },
  nutrition: {
    calories: { type: String, default: '450 kcal' },
    protein: { type: String, default: '6g' },
    carbs: { type: String, default: '55g' },
    fat: { type: String, default: '22g' }
  },
  featured: {
    type: Boolean,
    default: false
  },
  bestseller: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
