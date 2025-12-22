import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    imdbID: { type: String, required: true },
    title: String,
    year: String,
    poster: String,

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Movies", movieSchema);
