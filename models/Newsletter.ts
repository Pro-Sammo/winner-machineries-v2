import mongoose from "mongoose"

const NewsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["active", "unsubscribed", "bounced"],
    default: "active",
  },
  source: {
    type: String,
    default: "website",
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
  unsubscribedAt: Date,
  lastEmailSent: Date,
  preferences: {
    productUpdates: {
      type: Boolean,
      default: true,
    },
    newsletters: {
      type: Boolean,
      default: true,
    },
    promotions: {
      type: Boolean,
      default: true,
    },
  },
})

export default mongoose.models.Newsletter || mongoose.model("Newsletter", NewsletterSchema)
