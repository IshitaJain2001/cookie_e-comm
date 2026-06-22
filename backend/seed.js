const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');

require('dotenv').config();

const products = [
  {
    name: 'Classic Chocolate Chip',
    description: 'Our signature chocolate chip cookies loaded with premium Belgian chocolate chunks. Perfectly crispy edges with a soft, chewy center.',
    price: 299,
    category: 'chocolate',
    images: ['https://images.unsplash.com/photo-1499636138751-48d05c912cb4?w=600&h=600&fit=crop'],
    rating: 4.9,
    stock: 50,
    ingredients: 'Premium flour, butter, Belgian chocolate chunks, brown sugar, eggs, vanilla extract, sea salt',
    nutrition: { calories: '480 kcal', protein: '6g', carbs: '58g', fat: '24g' },
    featured: true,
    bestseller: true
  },
  {
    name: 'Double Fudge Brownie Cookie',
    description: 'Rich, fudgy cookies that taste like a brownie with a crispy exterior. Made with dark cocoa and extra chocolate.',
    price: 349,
    category: 'chocolate',
    images: ['https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=600&h=600&fit=crop'],
    rating: 4.8,
    stock: 40,
    ingredients: 'Dark cocoa powder, butter, dark chocolate, flour, sugar, eggs',
    nutrition: { calories: '520 kcal', protein: '5g', carbs: '62g', fat: '28g' },
    featured: true,
    bestseller: true
  },
  {
    name: 'White Chocolate Macadamia',
    description: 'Buttery cookies studded with creamy white chocolate chunks and roasted macadamia nuts. A tropical delight.',
    price: 379,
    category: 'nut',
    images: ['https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=600&h=600&fit=crop'],
    rating: 4.7,
    stock: 35,
    ingredients: 'Butter, white chocolate chunks, macadamia nuts, flour, sugar, vanilla',
    nutrition: { calories: '510 kcal', protein: '5g', carbs: '60g', fat: '30g' },
    featured: true
  },
  {
    name: 'Oatmeal Raisin Classic',
    description: 'Wholesome oatmeal cookies loaded with plump raisins and a hint of cinnamon. Perfect with a cup of tea.',
    price: 279,
    category: 'classic',
    images: ['https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=600&h=600&fit=crop'],
    rating: 4.6,
    stock: 45,
    ingredients: 'Rolled oats, raisins, cinnamon, butter, brown sugar, eggs, flour',
    nutrition: { calories: '420 kcal', protein: '7g', carbs: '65g', fat: '18g' },
    featured: false
  },
  {
    name: 'Salted Caramel Pecan',
    description: 'Decadent cookies with gooey salted caramel and roasted pecans. Sweet and salty perfection.',
    price: 399,
    category: 'nut',
    images: ['https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=600&h=600&fit=crop'],
    rating: 4.9,
    stock: 30,
    ingredients: 'Caramel sauce, pecans, butter, flour, sea salt, vanilla',
    nutrition: { calories: '540 kcal', protein: '4g', carbs: '58g', fat: '32g' },
    featured: true,
    bestseller: true
  },
  {
    name: 'Raspberry Almond Shortbread',
    description: 'Delicate shortbread cookies with almond flour and tangy raspberry jam center. Elegant and delicious.',
    price: 329,
    category: 'fruit',
    images: ['https://images.unsplash.com/photo-1493770348161-369560ae357d?w=600&h=600&fit=crop'],
    rating: 4.7,
    stock: 40,
    ingredients: 'Almond flour, butter, sugar, raspberry jam, vanilla extract',
    nutrition: { calories: '460 kcal', protein: '5g', carbs: '55g', fat: '26g' },
    featured: true
  },
  {
    name: 'Matcha Green Tea Cookie',
    description: 'Japanese-inspired cookies with premium matcha powder and white chocolate. Subtle, earthy, and delightful.',
    price: 349,
    category: 'seasonal',
    images: ['https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=600&fit=crop'],
    rating: 4.5,
    stock: 25,
    ingredients: 'Matcha powder, white chocolate, butter, flour, sugar',
    nutrition: { calories: '440 kcal', protein: '4g', carbs: '52g', fat: '24g' },
    featured: false
  },
  {
    name: 'Peanut Butter Bliss',
    description: 'Rich peanut butter cookies with a peanut butter cup in the center. A peanut lover\'s dream.',
    price: 319,
    category: 'nut',
    images: ['https://images.unsplash.com/photo-1572057470819-68eb4b4c5e91?w=600&h=600&fit=crop'],
    rating: 4.8,
    stock: 50,
    ingredients: 'Peanut butter, peanut butter cups, butter, flour, brown sugar',
    nutrition: { calories: '490 kcal', protein: '12g', carbs: '48g', fat: '28g' },
    featured: true,
    bestseller: true
  },
  {
    name: 'Lemon Zest Poppy Seed',
    description: 'Bright and refreshing lemon cookies with poppy seeds. Perfect for spring and summer.',
    price: 289,
    category: 'fruit',
    images: ['https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=600&fit=crop'],
    rating: 4.4,
    stock: 35,
    ingredients: 'Lemon zest, lemon juice, poppy seeds, butter, flour, sugar',
    nutrition: { calories: '410 kcal', protein: '4g', carbs: '56g', fat: '20g' },
    featured: false
  },
  {
    name: 'Dark Chocolate Sea Salt',
    description: 'Intense dark chocolate cookies with sea salt crystals. Sophisticated and addictive.',
    price: 329,
    category: 'chocolate',
    images: ['https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=600&fit=crop'],
    rating: 4.8,
    stock: 40,
    ingredients: 'Dark chocolate 70%, sea salt, butter, flour, brown sugar',
    nutrition: { calories: '470 kcal', protein: '5g', carbs: '54g', fat: '26g' },
    featured: true
  },
  {
    name: 'Cinnamon Snickerdoodle',
    description: 'Classic snickerdoodles rolled in cinnamon sugar. Soft, buttery, and perfectly spiced.',
    price: 269,
    category: 'classic',
    images: ['https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=600&fit=crop'],
    rating: 4.6,
    stock: 55,
    ingredients: 'Cinnamon, sugar, butter, cream of tartar, flour, vanilla',
    nutrition: { calories: '430 kcal', protein: '4g', carbs: '60g', fat: '20g' },
    featured: false,
    bestseller: true
  },
  {
    name: 'Coconut Macaroon',
    description: 'Chewy coconut macaroons with a chocolate drizzle. Tropical and indulgent.',
    price: 299,
    category: 'seasonal',
    images: ['https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=600&fit=crop'],
    rating: 4.5,
    stock: 30,
    ingredients: 'Shredded coconut, sweetened condensed milk, egg whites, chocolate',
    nutrition: { calories: '380 kcal', protein: '3g', carbs: '45g', fat: '22g' },
    featured: false
  },
  {
    name: 'Ginger Molasses Spice',
    description: 'Warm and spicy ginger cookies with molasses. Perfect for the holiday season.',
    price: 279,
    category: 'seasonal',
    images: ['https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=600&fit=crop'],
    rating: 4.7,
    stock: 40,
    ingredients: 'Ginger, molasses, cinnamon, cloves, butter, brown sugar',
    nutrition: { calories: '400 kcal', protein: '4g', carbs: '58g', fat: '18g' },
    featured: true
  },
  {
    name: 'Sugar-Free Chocolate Chip',
    description: 'Delicious chocolate chip cookies sweetened with stevia. Same great taste, no sugar.',
    price: 349,
    category: 'sugar-free',
    images: ['https://images.unsplash.com/photo-1499636138751-48d05c912cb4?w=600&h=600&fit=crop'],
    rating: 4.3,
    stock: 25,
    ingredients: 'Almond flour, stevia, sugar-free chocolate chips, butter, eggs',
    nutrition: { calories: '380 kcal', protein: '8g', carbs: '22g', fat: '32g' },
    featured: false
  },
  {
    name: 'Almond Joy Cookie',
    description: 'Coconut and almond cookies with a chocolate coating. Like the candy bar in cookie form.',
    price: 339,
    category: 'nut',
    images: ['https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=600&fit=crop'],
    rating: 4.6,
    stock: 35,
    ingredients: 'Coconut, almonds, dark chocolate, butter, condensed milk',
    nutrition: { calories: '450 kcal', protein: '5g', carbs: '48g', fat: '28g' },
    featured: false
  },
  {
    name: 'Cranberry Orange Bliss',
    description: 'Zesty orange cookies with dried cranberries. A perfect balance of sweet and tart.',
    price: 289,
    category: 'fruit',
    images: ['https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=600&fit=crop'],
    rating: 4.5,
    stock: 40,
    ingredients: 'Dried cranberries, orange zest, orange juice, butter, flour',
    nutrition: { calories: '420 kcal', protein: '4g', carbs: '58g', fat: '20g' },
    featured: false
  },
  {
    name: 'Toffee Crunch Cookie',
    description: 'Buttery cookies loaded with crunchy toffee bits and chocolate chunks. Irresistible texture.',
    price: 319,
    category: 'chocolate',
    images: ['https://images.unsplash.com/photo-1499636138751-48d05c912cb4?w=600&h=600&fit=crop'],
    rating: 4.7,
    stock: 45,
    ingredients: 'Toffee bits, chocolate chunks, butter, brown sugar, flour',
    nutrition: { calories: '490 kcal', protein: '4g', carbs: '62g', fat: '26g' },
    featured: true,
    bestseller: true
  },
  {
    name: 'Pistachio Rosewater',
    description: 'Elegant Middle Eastern-inspired cookies with pistachios and rosewater. Fragrant and beautiful.',
    price: 379,
    category: 'seasonal',
    images: ['https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=600&fit=crop'],
    rating: 4.4,
    stock: 20,
    ingredients: 'Pistachios, rosewater, cardamom, butter, flour, powdered sugar',
    nutrition: { calories: '440 kcal', protein: '6g', carbs: '52g', fat: '24g' },
    featured: false
  },
  {
    name: 'Espresso Chocolate Chip',
    description: 'Coffee-infused chocolate chip cookies for caffeine lovers. Rich and energizing.',
    price: 329,
    category: 'chocolate',
    images: ['https://images.unsplash.com/photo-1499636138751-48d05c912cb4?w=600&h=600&fit=crop'],
    rating: 4.6,
    stock: 35,
    ingredients: 'Espresso powder, chocolate chips, butter, flour, coffee extract',
    nutrition: { calories: '460 kcal', protein: '5g', carbs: '56g', fat: '24g' },
    featured: false
  },
  {
    name: 'Birthday Confetti',
    description: 'Funfetti cookies with colorful sprinkles. Perfect for celebrations and parties.',
    price: 279,
    category: 'seasonal',
    images: ['https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=600&fit=crop'],
    rating: 4.5,
    stock: 50,
    ingredients: 'Vanilla buttercream, rainbow sprinkles, butter, flour, vanilla',
    nutrition: { calories: '440 kcal', protein: '3g', carbs: '62g', fat: '20g' },
    featured: false
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cookietin');
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log('Inserted 20 products');

    // Create admin user
    const existingAdmin = await User.findOne({ email: 'admin@cookietin.com' });
    if (!existingAdmin) {
      await User.create({
        name: 'Admin User',
        email: 'admin@cookietin.com',
        phone: '+91 98765 43210',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Created admin user (admin@cookietin.com / admin123)');
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
