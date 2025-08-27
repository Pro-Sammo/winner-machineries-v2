import mongoose from "mongoose"

const GalleryImageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Manufacturing", "Products", "Facilities", "Quality", "Team", "Innovation", "Training"],
  },
  image: {
    url: {
      type: String,
      required: true,
    },
    alt: String,
    publicId: String,
  },
  order: {
    type: Number,
    default: 0,
  },
  active: {
    type: Boolean,
    default: true,
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

GalleryImageSchema.pre("save", function (next) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.models.GalleryImage || mongoose.model("GalleryImage", GalleryImageSchema)
