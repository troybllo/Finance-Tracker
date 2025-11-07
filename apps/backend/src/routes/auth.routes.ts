import { Router } from "express";
import { authenticateToken, getMe } from "../middleware/auth.middleware";
import { login, register } from "../controllers/auth.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", authenticateToken, getMe);

export default router;
