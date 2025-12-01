import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import {
  createExpense,
  getAllExpenses,
  getExpense,
  updateExpense,
  deleteExpense,
} from "../controllers/expense.controller";

const router = Router();

router.post("/", authenticateToken, createExpense);
router.get("/", authenticateToken, getAllExpenses);
router.get("/:id", authenticateToken, getExpense);
router.put("/:id", authenticateToken, updateExpense);
router.delete("/:id", authenticateToken, deleteExpense);

export default router;
