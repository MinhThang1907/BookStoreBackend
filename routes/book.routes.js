import express from "express";
import {
  listBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/book.controller.js";
import { authenticateJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", listBooks);
router.post("/", authenticateJWT, createBook);
router.get("/:bookId", getBookById);
router.put("/:bookId", authenticateJWT, updateBook);
router.delete("/:bookId", authenticateJWT, deleteBook);

export default router;
