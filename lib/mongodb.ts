import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.warn("MONGODB_URI not found, using mock connection")
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  // If no MongoDB URI, return a mock connection
  if (!MONGODB_URI) {
    console.warn("No MongoDB URI provided, using mock connection")
    cached.conn = { readyState: 0 } // Mock disconnected state
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    console.error("MongoDB connection error:", e)
    // Return mock connection on error
    cached.conn = { readyState: 0 }
  }

  return cached.conn
}

export default dbConnect
