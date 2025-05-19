import express from "express";
import {
  listBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
  updateIsMarkBook,
} from "../controllers/book.controller.js";
import { authenticateJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", listBooks);
router.post("/",  createBook);
router.get("/:bookId", getBookById);
router.put("/:bookId", authenticateJWT, updateBook);
router.post("/setIsMark", updateIsMarkBook);
router.delete("/:bookId", authenticateJWT, deleteBook);

export default router;