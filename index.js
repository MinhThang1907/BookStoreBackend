import express from "express";
const app = express();
import mongoose from "mongoose";
app.use(express.json());
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import bookRoutes from "./routes/book.routes.js";
import authRoutes from "./routes/auth.routes.js";
// Generate a jwt secret key
// node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
import cors from "cors"

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });

const swaggerJsDocOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bookstore API",
      version: "1.0.0",
      description: "A simple CRUD API for a bookstore",
    },
  },
  apis: ["./swaggers/*.yaml"],
};
const apiSpec = swaggerJsDoc(swaggerJsDocOptions);

app.use(cors({
  origin: '*'
}));

app.use(express.json()); // 👈 Thêm dòng này

app.get("/swagger.json", (_req, res) => res.json(apiSpec));
app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(null, { swaggerOptions: { url: "/swagger.json" } })
);

app.get("/", (req, res) => {
  res.send({ status: "Started" });
});
app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
