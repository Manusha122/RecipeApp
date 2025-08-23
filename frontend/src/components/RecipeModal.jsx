import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Tag, Clock, ChefHat } from "lucide-react";

export default function RecipeModal({ open, onClose, meal }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          style={{
            position: "fixed", 
            inset: 0, 
            background: "rgba(0, 0, 0, 0.75)", 
            backdropFilter: "blur(8px)",
            display: "grid", 
            placeItems: "center", 
            zIndex: 50,
            padding: "1rem"
          }}
          onClick={onClose}
        >
          <motion.div
            onClick={e => e.stopPropagation()}
            initial={{ y: 50, opacity: 0, scale: 0.9 }} 
            animate={{ y: 0, opacity: 1, scale: 1 }} 
            exit={{ y: 50, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            style={{
              maxWidth: "800px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "24px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              position: "relative"
            }}
          >
            {!meal ? (
              <div style={{
                padding: "3rem",
                textAlign: "center",
                color: "white"
              }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  style={{ display: "inline-block" }}
                >
                  <ChefHat size={48} />
                </motion.div>
                <p style={{ marginTop: "1rem", fontSize: "1.1rem" }}>Loading delicious recipe...</p>
              </div>
            ) : (
              <div>
                {/* Header with close button */}
                <div style={{
                  position: "sticky",
                  top: 0,
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  padding: "1rem 2rem",
                  borderRadius: "24px 24px 0 0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  zIndex: 10
                }}>
                  <motion.h2 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{
                      margin: 0,
                      color: "white",
                      fontSize: "clamp(1.5rem, 4vw, 2rem)",
                      fontWeight: "700",
                      textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                      flex: 1,
                      paddingRight: "1rem"
                    }}
                  >
                    {meal.strMeal}
                  </motion.h2>
                  
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    style={{
                      background: "rgba(255, 255, 255, 0.2)",
                      border: "none",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <X size={20} />
                  </motion.button>
                </div>

                {/* Content */}
                <div style={{ padding: "0 2rem 2rem" }}>
                  {/* Image and info section */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "2rem",
                    marginBottom: "2rem"
                  }}>
                    {/* Image */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      style={{
                        position: "relative",
                        borderRadius: "20px",
                        overflow: "hidden",
                        boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)"
                      }}
                    >
                      <img 
                        src={meal.strMealThumb} 
                        alt={meal.strMeal}
                        style={{
                          width: "100%",
                          height: "500px",
                          objectFit: "cover",
                          display: "block"
                        }} 
                      />
                      <div style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                        height: "100px"
                      }} />
                    </motion.div>

                    {/* Info cards */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "1rem"
                      }}
                    >
                      <div style={{
                        background: "rgba(255, 255, 255, 0.15)",
                        backdropFilter: "blur(10px)",
                        padding: "1.5rem",
                        borderRadius: "16px",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        color: "white"
                      }}>
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
                          <Tag size={20} style={{ marginRight: "0.5rem", opacity: 0.8 }} />
                          <strong style={{ fontSize: "0.9rem", opacity: 0.8 }}>Category</strong>
                        </div>
                        <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: "600" }}>{meal.strCategory}</p>
                      </div>

                      <div style={{
                        background: "rgba(255, 255, 255, 0.15)",
                        backdropFilter: "blur(10px)",
                        padding: "1.5rem",
                        borderRadius: "16px",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        color: "white"
                      }}>
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
                          <MapPin size={20} style={{ marginRight: "0.5rem", opacity: 0.8 }} />
                          <strong style={{ fontSize: "0.9rem", opacity: 0.8 }}>Cuisine</strong>
                        </div>
                        <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: "600" }}>{meal.strArea}</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Instructions */}
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      padding: "2rem",
                      borderRadius: "20px",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      marginBottom: "2rem"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                      <Clock size={24} style={{ marginRight: "0.75rem", color: "white", opacity: 0.8 }} />
                      <h3 style={{ 
                        margin: 0, 
                        color: "white", 
                        fontSize: "1.3rem", 
                        fontWeight: "600" 
                      }}>Instructions</h3>
                    </div>
                    <p style={{
                      margin: 0,
                      color: "rgba(255, 255, 255, 0.9)",
                      fontSize: "1rem",
                      lineHeight: "1.6",
                      letterSpacing: "0.025em"
                    }}>
                      {meal.strInstructions}
                    </p>
                  </motion.div>

                  {/* Close button */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    style={{ textAlign: "center" }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onClose}
                      style={{
                        background: "linear-gradient(135deg, #ff6b6b, #feca57)",
                        border: "none",
                        borderRadius: "50px",
                        padding: "0.875rem 2rem",
                        color: "white",
                        fontSize: "1rem",
                        fontWeight: "600",
                        cursor: "pointer",
                        boxShadow: "0 8px 25px rgba(255, 107, 107, 0.3)",
                        transition: "all 0.3s ease"
                      }}
                    >
                      Got it, thanks!
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}