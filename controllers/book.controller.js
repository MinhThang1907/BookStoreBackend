import Book from "../models/book.model.js";

// Lấy danh sách sách với phân trang
export const listBooks = async (req, res) => {
  try {
    const { page = 1, size = 10 } = req.query;
    const books = await Book.find()
      .skip((page - 1) * size)
      .limit(parseInt(size));
    const total = await Book.countDocuments();
    res.json({ total, items: books });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo mới sách
export const createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    const saved = await book.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Lấy sách theo ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.status(404).json({ message: "Not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cập nhật sách
export const updateBook = async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Xóa sách
export const deleteBook = async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.bookId);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
