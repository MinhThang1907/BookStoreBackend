import Book from "../models/book.model.js";

const BASE_GET_BOOK_IMAGE_URL =
  "http://192.168.1.138:5678/webhook-test/get-book-by-name";

async function getBookImage(bookName) {
  const url = BASE_GET_BOOK_IMAGE_URL;

  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      bookName,
    }),
  });
  try {
    return res;
  } catch (err) {
    console.error(err);
  }
}

// Lấy danh sách sách với phân trang
export const listBooks = async (req, res) => {
  try {
    const { page = 1, size = 10 } = req.query;
    const books = await Book.find()
      .skip((page - 1) * size)
      .limit(parseInt(size));
    const total = await Book.countDocuments();

    res.json({ total, items: books });
    // Promise.all([
    //   books.map(async (book) => ({
    //     ...book,
    //     bookCover: await getBookImage(book.bookName),
    //   })),
    // ]).then((books) => {
    //   res.json({ total, items: books });
    // });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo mới sách
export const createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    // const resBook = await getBookImage(book.bookName);

    // const buffer = await resBook.arrayBuffer();
    // const base64 = Buffer.from(buffer).toString("base64");

    // const base64data = await new Promise((resolve, reject) => {
    //   const reader = new FileReader();
    //   reader.onloadend = () => resolve(reader.result); // data:image/jpeg;base64,...
    //   reader.onerror = reject;
    //   reader.readAsDataURL(blob);
    // });

    book.bookCover = "";

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

export const updateIsMarkBook = async (req, res) => {
  const { bookId, isBookMark } = req.body;
  console.log(bookId, isBookMark)
  try {
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Not found" });

    book.isBookMark = isBookMark;
    await book.save();

    res.status(200).json(book);
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
