import { Router } from "express";
import {
  getAllData,
  postData,
  getById,
  deleteData,
  updateData,
} from "../controllers/post.js";
const router = Router();

router.route("/").get(getAllData).post(postData);
router
  .route("/:id")
  .get(getById)
  .delete(deleteData)
  .patch(updateData)
  .put(updateData);

export default router;
