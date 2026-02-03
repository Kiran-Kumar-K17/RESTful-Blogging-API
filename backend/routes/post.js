import { Router } from "express";
import {
  getAllData,
  postData,
  getById,
  deleteData,
  updateData,
} from "../controllers/post.js";
import { protect } from "../controllers/authController.js";
import {
  uploadPostImage,
  resizePostImage,
} from "../controllers/postController.js";
const router = Router();

router.get("/", getAllData);

// Only logged-in users can Create, Update, or Delete!
router.post("/", protect, uploadPostImage, resizePostImage, postData);
router.patch("/:id", protect, updateData);
router.delete("/:id", protect, deleteData);
router.get("/:id", protect, getById);

export default router;
