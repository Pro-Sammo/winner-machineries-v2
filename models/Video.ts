import mongoose from "mongoose"

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  youtubeId: {
    type: String,
    required: true,
  },
  thumbnail: {
    url: String,
    alt: String,
    publicId: String,
  },
  category: {
    type: String,
    required: true,
    enum: ["Tutorial", "Factory Tour", "Product Demo", "Case Study", "Maintenance", "Innovation"],
  },
  duration: String,
  views: {
    type: String,
    default: "0",
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

VideoSchema.pre("save", function (next) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.models.Video || mongoose.model("Video", VideoSchema)
