import { validationResult } from "express-validator";
import Favorite from "../models/Favorite.js";

export const listFavorites = async (req, res) => {
  const items = await Favorite.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json(items);
};

export const addFavorite = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { mealId, name, thumb } = req.body;
  try {
    const fav = await Favorite.create({ user: req.userId, mealId, name, thumb });
    res.status(201).json(fav);
  } catch (e) {
    if (e.code === 11000) return res.status(409).json({ message: "Already in favorites" });
    throw e;
  }
};

export const removeFavorite = async (req, res) => {
  const { id } = req.params; // mealId
  const del = await Favorite.findOneAndDelete({ user: req.userId, mealId: id });
  if (!del) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Removed" });
};
