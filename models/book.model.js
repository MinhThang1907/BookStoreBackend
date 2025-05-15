import mongoose from "mongoose";
const { Schema } = mongoose;

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedDate: { type: Date },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Book", BookSchema);
