import mongoose from "mongoose"

const AnalyticsSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["page_view", "product_view", "video_view", "contact_form", "newsletter_signup"],
  },
  path: String,
  referrer: String,
  userAgent: String,
  ip: String,
  sessionId: String,
  userId: String,
  metadata: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 90, // Auto-delete after 90 days
  },
})

AnalyticsSchema.index({ type: 1, createdAt: -1 })
AnalyticsSchema.index({ path: 1, createdAt: -1 })

export default mongoose.models.Analytics || mongoose.model("Analytics", AnalyticsSchema)
