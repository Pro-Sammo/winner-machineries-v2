import mongoose from "mongoose";

const QuoteRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  product: { type: String },
  message: { type: String },
  status: { type: String, default: "new", enum: ["new", "viewed", "responded"] },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.QuoteRequest || mongoose.model("QuoteRequest", QuoteRequestSchema); 