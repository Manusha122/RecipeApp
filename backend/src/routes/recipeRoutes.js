import { Router } from "express";
import { categories, byCategory, getById } from "../controllers/recipeController.js";
const router = Router();

router.get("/categories", categories);
router.get("/by-category", byCategory);      // ?c=Beef
router.get("/:id", getById);

export default router;
