import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller";

const router = Router();

router.post("/", authenticateToken, createCategory);
router.get("/", authenticateToken, getCategories);
router.put("/:id", authenticateToken, updateCategory);
router.delete("/:id", authenticateToken, deleteCategory);

export default router


