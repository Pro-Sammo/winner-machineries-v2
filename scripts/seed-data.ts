import dbConnect from "../lib/mongodb"
import Video from "../models/Video"
import HeroImage from "../models/HeroImage"
import GalleryImage from "../models/GalleryImage"
import Product from "../models/Product"
import Category from "../models/Category"
import { sampleVideos, sampleHeroImages, sampleGalleryImages } from "../lib/api-utils"

const sampleCategories = [
  { name: "CNC Machines", description: "Computer-controlled precision machines" },
  { name: "Lathes", description: "High-precision turning machines" },
  { name: "Presses", description: "Hydraulic and mechanical presses" },
  { name: "Robotics", description: "Industrial robotic solutions" },
  { name: "Grinding", description: "Surface and cylindrical grinding machines" },
  { name: "Cutting", description: "Laser and plasma cutting machines" }
];

const sampleProducts = [
  {
    name: "CNC Milling Machine X200",
    description: "High-precision CNC milling machine for industrial applications.",
    category: "CNC Machines",
    images: [
      { url: "/placeholder.svg?height=400&width=600", alt: "CNC Milling Machine" }
    ],
    specifications: { Power: "5kW", Weight: "1200kg", Voltage: "380V" },
    features: ["Touchscreen control", "Automatic tool changer", "High-speed spindle"],
    applications: ["Metalworking", "Prototyping"],
    tags: ["CNC", "Milling", "Precision"],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: 12
  },
  {
    name: "Hydraulic Press H500",
    description: "Robust hydraulic press for heavy-duty manufacturing.",
    category: "Presses",
    images: [
      { url: "/placeholder.svg?height=400&width=600", alt: "Hydraulic Press" }
    ],
    specifications: { Force: "500T", Stroke: "300mm", TableSize: "1200x800mm" },
    features: ["Safety interlock", "Digital pressure gauge"],
    applications: ["Sheet metal forming", "Component assembly"],
    tags: ["Press", "Hydraulic"],
    inStock: true,
    featured: false,
    rating: 4.5,
    reviews: 8
  },
  {
    name: "Industrial Lathe L300",
    description: "Versatile lathe for precision turning and threading.",
    category: "Lathes",
    images: [
      { url: "/placeholder.svg?height=400&width=600", alt: "Industrial Lathe" }
    ],
    specifications: { MaxSwing: "300mm", DistanceBetweenCenters: "1000mm" },
    features: ["Variable speed", "Digital readout"],
    applications: ["Turning", "Threading"],
    tags: ["Lathe", "Turning"],
    inStock: true,
    featured: false,
    rating: 4.7,
    reviews: 5
  }
];

async function seedData() {
  try {
    await dbConnect()
    console.log("Connected to database")

    // Clear existing data
    await Video.deleteMany({})
    await HeroImage.deleteMany({})
    await GalleryImage.deleteMany({})
    await Product.deleteMany({})
    await Category.deleteMany({})
    console.log("Cleared existing data")

    // Seed categories
    const categories = await Category.insertMany(sampleCategories)
    console.log(`Seeded ${categories.length} categories`)

    // Seed products
    const products = await Product.insertMany(sampleProducts)
    console.log(`Seeded ${products.length} products`)

    // Seed videos
    const videos = await Video.insertMany(sampleVideos)
    console.log(`Seeded ${videos.length} videos`)

    // Seed hero images
    const heroImages = await HeroImage.insertMany(sampleHeroImages)
    console.log(`Seeded ${heroImages.length} hero images`)

    // Seed gallery images
    const galleryImages = await GalleryImage.insertMany(sampleGalleryImages)
    console.log(`Seeded ${galleryImages.length} gallery images`)

    console.log("Database seeding completed successfully!")
    process.exit(0)
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

seedData() 