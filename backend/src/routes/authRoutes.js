import { Router } from "express";
import { body } from "express-validator";
import { login, me, register, logout } from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";
const router = Router();

const email = body("email").isEmail().withMessage("Valid email required");
const password = body("password").isLength({ min: 6 }).withMessage("Min 6 chars");

router.post("/register", [body("name").notEmpty(), email, password], register);
router.post("/login", [email, password], login);
router.get("/me", requireAuth, me);
router.post("/logout", logout);

export default router;
