import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    mealId: { type: String, required: true },
    name: { type: String, required: true },
    thumb: { type: String }
  },
  { timestamps: true }
);

// avoid duplicates per user + meal
favoriteSchema.index({ user: 1, mealId: 1 }, { unique: true });

export default mongoose.model("Favorite", favoriteSchema);
