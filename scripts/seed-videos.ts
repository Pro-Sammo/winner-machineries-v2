import mongoose from 'mongoose';
import Video from '../models/Video';
import dbConnect from '../lib/mongodb';

const sampleVideos = [
  {
    title: "Industrial Machinery Overview",
    description: "A comprehensive overview of our latest industrial machinery line, showcasing advanced features and capabilities for modern manufacturing.",
    youtubeId: "dQw4w9WgXcQ", // Rick Roll for testing
    thumbnail: {
      url: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      alt: "Industrial Machinery Overview"
    },
    category: "Product Demo",
    duration: "3:33",
    views: "1.2M",
    featured: true
  },
  {
    title: "Factory Tour - Behind the Scenes",
    description: "Take a virtual tour of our state-of-the-art manufacturing facility and see how we build quality machinery.",
    youtubeId: "jNQXAC9IVRw", // Me at the zoo (first YouTube video)
    thumbnail: {
      url: "https://img.youtube.com/vi/jNQXAC9IVRw/hqdefault.jpg",
      alt: "Factory Tour"
    },
    category: "Factory Tour",
    duration: "0:19",
    views: "45.2K",
    featured: false
  },
  {
    title: "Maintenance Guide for CNC Machines",
    description: "Learn essential maintenance procedures to keep your CNC machines running at peak performance.",
    youtubeId: "9bZkp7q19f0", // PSY - GANGNAM STYLE
    thumbnail: {
      url: "https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg",
      alt: "CNC Maintenance Guide"
    },
    category: "Maintenance",
    duration: "4:12",
    views: "89.7K",
    featured: true
  },
  {
    title: "Innovation in Manufacturing Technology",
    description: "Discover the latest innovations in manufacturing technology and how they're revolutionizing the industry.",
    youtubeId: "kJQP7kiw5Fk", // Luis Fonsi - Despacito
    thumbnail: {
      url: "https://img.youtube.com/vi/kJQP7kiw5Fk/hqdefault.jpg",
      alt: "Manufacturing Innovation"
    },
    category: "Innovation",
    duration: "4:41",
    views: "156.3K",
    featured: false
  },
  {
    title: "Case Study: Automotive Manufacturing",
    description: "See how our machinery helped a major automotive manufacturer increase production efficiency by 40%.",
    youtubeId: "y6120QOlsfU", // Sandstorm
    thumbnail: {
      url: "https://img.youtube.com/vi/y6120QOlsfU/hqdefault.jpg",
      alt: "Automotive Case Study"
    },
    category: "Case Study",
    duration: "3:45",
    views: "67.8K",
    featured: false
  },
  {
    title: "Tutorial: Setting Up Your First Machine",
    description: "Step-by-step tutorial for setting up and calibrating your first industrial machine for optimal performance.",
    youtubeId: "ZZ5LpwO-An4", // Never Gonna Give You Up (different version)
    thumbnail: {
      url: "https://img.youtube.com/vi/ZZ5LpwO-An4/hqdefault.jpg",
      alt: "Machine Setup Tutorial"
    },
    category: "Tutorial",
    duration: "8:15",
    views: "234.1K",
    featured: true
  }
];

async function seedVideos() {
  try {
    await dbConnect();
    console.log('Connected to MongoDB');

    // Clear existing videos
    await Video.deleteMany({});
    console.log('Cleared existing videos');

    // Insert sample videos
    const insertedVideos = await Video.insertMany(sampleVideos);
    console.log(`Inserted ${insertedVideos.length} sample videos`);

    console.log('Sample videos:');
    insertedVideos.forEach(video => {
      console.log(`- ${video.title} (${video.category})`);
    });

    console.log('Video seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding videos:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the script
seedVideos(); 