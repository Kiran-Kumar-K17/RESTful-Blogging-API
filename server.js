import express from "express";
import { connectMongoDB } from "./MyDB.js";
import postRoute from "./routes/post.js";
const app = express();
const PORT = 8000;

connectMongoDB("mongodb://127.0.0.1:27017/MyDB").then(() =>
  console.log("MongoDB Connected Successfully"),
);
app.use(express.json());
app.use("/post", postRoute);

app.listen(PORT, () => console.log(`Server Started at Port:${PORT}`));
