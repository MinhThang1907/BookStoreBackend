import express from "express";
import {
  listBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/book.controller.js";

const router = express.Router();

router.get("/", listBooks);
router.post("/", createBook);
router.get("/:bookId", getBookById);
router.put("/:bookId", updateBook);
router.delete("/:bookId", deleteBook);

export default router;
