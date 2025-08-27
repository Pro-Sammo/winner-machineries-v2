import mongoose from "mongoose"

const HeroImageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: String,
  description: String,
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

HeroImageSchema.pre("save", function (next) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.models.HeroImage || mongoose.model("HeroImage", HeroImageSchema)
