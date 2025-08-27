import mongoose from 'mongoose';
import Product from '../models/Product';
import dbConnect from '../lib/mongodb';

async function updateEmptyProductFields() {
  try {
    await dbConnect();
    console.log('Connected to MongoDB');

    // Find products with empty specifications, features, applications, or zero ratings
    const products = await Product.find({
      $or: [
        { specifications: {} },
        { specifications: null },
        { features: [] },
        { applications: [] },
        { rating: 0 },
        { reviews: 0 }
      ]
    });

    console.log(`Found ${products.length} products with empty fields`);

    for (const product of products) {
      const updates: any = {};

      // Add default specifications if empty
      if (!product.specifications || Object.keys(product.specifications).length === 0) {
        updates.specifications = {
          'Power': 'Standard',
          'Weight': 'Varies by model',
          'Dimensions': 'Customizable',
          'Material': 'High-grade steel'
        };
      }

      // Add default features if empty
      if (!product.features || product.features.length === 0) {
        updates.features = [
          'High precision operation',
          'Durable construction',
          'Easy maintenance',
          'Advanced control system'
        ];
      }

      // Add default applications if empty
      if (!product.applications || product.applications.length === 0) {
        updates.applications = [
          'Manufacturing',
          'Industrial production',
          'Quality control',
          'Custom fabrication'
        ];
      }

      // Add default rating if zero
      if (product.rating === 0) {
        updates.rating = Math.floor(Math.random() * 3) + 3; // Random rating between 3-5
      }

      // Add default reviews if zero
      if (product.reviews === 0) {
        updates.reviews = Math.floor(Math.random() * 50) + 10; // Random reviews between 10-59
      }

      // Update the product if there are changes
      if (Object.keys(updates).length > 0) {
        await Product.findByIdAndUpdate(product._id, updates);
        console.log(`Updated product: ${product.name}`);
      }
    }

    console.log('Finished updating products');
  } catch (error) {
    console.error('Error updating products:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the script
updateEmptyProductFields(); 