const express = require('express');
const Wishlist = require('../models/Wishlist');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Helper to get user ID from token
const getUserIdFromToken = (req) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_super_secret_jwt_key');
    return decoded.userId;
  } catch (error) {
    return null;
  }
};

// Get wishlist
router.get('/', async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    let wishlist = await Wishlist.findOne({ user: userId }).populate('items');
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: userId, items: [] });
    }
    
    res.json(wishlist.items);
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add to wishlist
router.post('/', async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const { productId } = req.body;
    
    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: userId, items: [] });
    }
    
    // Check if product already in wishlist
    if (!wishlist.items.includes(productId)) {
      wishlist.items.push(productId);
      await wishlist.save();
    }
    
    await wishlist.populate('items');
    res.json(wishlist.items);
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove from wishlist
router.delete('/:productId', async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
    
    wishlist.items = wishlist.items.filter(
      item => item.toString() !== req.params.productId
    );
    
    await wishlist.save();
    await wishlist.populate('items');
    res.json(wishlist.items);
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
