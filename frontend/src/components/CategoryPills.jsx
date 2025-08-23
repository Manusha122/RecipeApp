import { motion } from "framer-motion";

export default function CategoryPills({ categories, active, onChange }) {
  return (
    <div className="pills">
      {categories.map(c => (
        <motion.button
          key={c.name}
          onClick={() => onChange(c.name)}
          className={`pill ${active === c.name ? "active" : ""}`}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          {c.name}
        </motion.button>
      ))}
    </div>
  );
}
