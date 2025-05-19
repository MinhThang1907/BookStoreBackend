import mongoose from "mongoose";
const { Schema } = mongoose;

const BookSchema = new Schema(
  {
    // title: { type: String, required: true },
    // author: { type: String, required: true },
    // publishedDate: { type: Date },
    // price: { type: Number, required: true },
    // stock: { type: Number, default: 0 },

    bookName: { type: String, required: true }, // Tên sách
    bookCover: { type: String, required: true }, // Ảnh bìa (URL hoặc filename)
    rating: { type: Number, default: 0 },
    language: { type: String, default: "Eng" },
    pageNo: { type: Number }, // Số trang
    author: { type: String },
    genre: [{ type: String }], // Mảng thể loại
    readed: { type: String }, // Ví dụ: "12k"
    description: { type: String },
    backgroundColor: { type: String },
    navTintColor: { type: String },
    isBookMark: {type: Boolean},
    categories: {type: Array, default: []}
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Book", BookSchema);
