import { motion } from "framer-motion";

export default function RecipeCard({ meal, onOpen, onFav, isFav }) {
  return (
    <motion.div className="card"
      whileHover={{ y: -4 }} transition={{ type:"spring", stiffness: 300, damping: 20 }}>
      <img src={meal.strMealThumb} alt={meal.strMeal} style={{width:"100%",borderRadius:12}}/>
      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:8}}>
        <div style={{fontWeight:400}}>{meal.strMeal}</div>
        <div style={{display:"flex", gap:8}}>
          <button className="secondary" onClick={() => onOpen(meal.idMeal)}>Details</button>
          <button onClick={() => onFav(meal)}>{isFav ? "★" : "☆"}</button>
        </div>
      </div>
    </motion.div>
  );
}
