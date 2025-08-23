import { Router } from "express";
import { body } from "express-validator";
import { requireAuth } from "../middleware/auth.js";
import { addFavorite, listFavorites, removeFavorite } from "../controllers/favoriteController.js";
const router = Router();

router.use(requireAuth);
router.get("/", listFavorites);
router.post("/", [body("mealId").notEmpty(), body("name").notEmpty()], addFavorite);
router.delete("/:id", removeFavorite); // :id = mealId

export default router;
