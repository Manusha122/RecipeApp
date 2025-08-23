import axios from "axios";

const API = "https://www.themealdb.com/api/json/v1/1";

export const categories = async (_req, res) => {
  const { data } = await axios.get(`${API}/categories.php`);
  // pick first 5 categories for UI (you can change)
  const five = (data.categories || []).slice(0, 5).map(c => ({
    id: c.idCategory,
    name: c.strCategory,
    thumb: c.strCategoryThumb,
    description: c.strCategoryDescription
  }));
  res.json(five);
};

export const byCategory = async (req, res) => {
  const c = req.query.c;
  if (!c) return res.status(400).json({ message: "Missing category (?c=)" });
  const { data } = await axios.get(`${API}/filter.php?c=${encodeURIComponent(c)}`);
  res.json(data.meals || []);
};

export const getById = async (req, res) => {
  const { id } = req.params;
  const { data } = await axios.get(`${API}/lookup.php?i=${id}`);
  res.json(data.meals?.[0] || null);
};
