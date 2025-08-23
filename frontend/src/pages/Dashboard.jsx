import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import API from "../api";
import CategoryPills from "../components/CategoryPills";
import RecipeModal from "../components/RecipeModal";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

// Updated RecipeCard Component
function RecipeCard({ meal, onOpen, onFav, isFav }) {
  return (
    <motion.div 
      className="recipe-card"
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="recipe-image-container">
        <img 
          src={meal.strMealThumb} 
          alt={meal.strMeal}
          className="recipe-image"
        />
        <div className="recipe-overlay"></div>
      </div>
      
      <div className="recipe-content">
        <h3 className="recipe-title">{meal.strMeal}</h3>
        
        <div className="recipe-actions">
          <button 
            className="details-btn"
            onClick={() => onOpen(meal.idMeal)}
          >
            Details
          </button>
          
          <button 
            className={`favorite-btn ${isFav ? 'favorited' : ''}`}
            onClick={() => onFav(meal)}
          >
            {isFav ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState("");
  const [meals, setMeals] = useState([]);
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(null);
  const [selected, setSelected] = useState(null);
  const [loadingMeals, setLoadingMeals] = useState(false);
  const [favs, setFavs] = useState([]);
  const { logout } = useAuth();

  // fetch categories
  useEffect(() => {
    (async () => {
      const { data } = await API.get("/api/recipes/categories");
      setCategories(data);
      setActive(data?.[0]?.name || "");
    })();
  }, []);

  // fetch meals by category
  useEffect(() => {
    if (!active) return;
    (async () => {
      setLoadingMeals(true);
      const { data } = await API.get(`/api/recipes/by-category?c=${encodeURIComponent(active)}`);
      setMeals(data || []);
      setLoadingMeals(false);
    })();
  }, [active]);

  // favorites
  useEffect(() => {
    (async () => {
      try { const { data } = await API.get("/api/favorites"); setFavs(data); } catch {}
    })();
  }, []);

  const isFav = (mealId) => favs.some(f => f.mealId === mealId);

  const addFav = async (meal) => {
    try {
      const { data } = await API.post("/api/favorites", {
        mealId: meal.idMeal, name: meal.strMeal, thumb: meal.strMealThumb
      });
      setFavs(prev => [data, ...prev]);
    } catch (e) {
      alert(e.response?.data?.message || "Could not add favorite");
    }
  };

  const openModal = async (id) => {
    setOpenId(id); setSelected(null);
    const { data } = await API.get(`/api/recipes/${id}`);
    setSelected(data);
  };

  const filtered = useMemo(() => {
    if (!query) return meals;
    return meals.filter(m => m.strMeal.toLowerCase().includes(query.toLowerCase()));
  }, [meals, query]);

  return (
    <div className="dashboard-container">
      {/* Background Elements */}
      <div className="dashboard-bg">
        <div className="bg-gradient"></div>
        <div className="bg-pattern"></div>
      </div>

      {/* Header */}
      <motion.header 
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-content">
          <motion.div 
            className="header-title"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1>Recipe Discovery</h1>
            <p>Explore culinary delights from around the world</p>
          </motion.div>
          
          <motion.nav 
            className="header-nav"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Link to="/favorites" className="nav-link">
              <span className="nav-icon">♥</span>
              Favorites
            </Link>
            <button className="logout-btn" onClick={logout}>
              <span className="nav-icon">→</span>
              Logout
            </button>
          </motion.nav>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Sidebar */}
        <motion.aside 
          className="sidebar"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="sidebar-content">
            <h3>Categories</h3>
            <CategoryPills
              categories={categories}
              active={active}
              onChange={setActive}
            />
          </div>
        </motion.aside>

        {/* Content Area */}
        <motion.main 
          className="content-area"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {/* Search Bar */}
          <motion.div 
            className="search-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="search-wrapper">
              <span className="search-icon">🔍</span>
              <input 
                className="search-input"
                placeholder="Search recipes (e.g., Italian, Pasta, Chicken...)" 
                value={query} 
                onChange={e => setQuery(e.target.value)} 
              />
              {query && (
                <button 
                  className="search-clear"
                  onClick={() => setQuery("")}
                >
                  ✕
                </button>
              )}
            </div>
          </motion.div>

          {/* Results */}
          <div className="results-section">
            {loadingMeals ? (
              <motion.div 
                className="loading-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="loading-spinner"></div>
                <p>Discovering delicious recipes...</p>
              </motion.div>
            ) : (
              <motion.div 
                className="recipes-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <motion.div className="grid-header">
                  <h2>
                    {query ? `Search Results (${filtered.length})` : `${active} Recipes (${filtered.length})`}
                  </h2>
                </motion.div>
                
                <div className="cards-grid">
                  {filtered.map((meal, index) => (
                    <motion.div
                      key={meal.idMeal}
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        delay: 0.8 + (index * 0.1), 
                        duration: 0.6,
                        type: "spring",
                        stiffness: 100
                      }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <RecipeCard
                        meal={meal}
                        onOpen={openModal}
                        onFav={addFav}
                        isFav={isFav(meal.idMeal)}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.main>
      </div>

      <RecipeModal open={!!openId} onClose={() => setOpenId(null)} meal={selected} />

      <style jsx>{`
        .dashboard-container {
          min-height: 100vh;
          position: relative;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          overflow-x: hidden;
        }

        .dashboard-bg {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
        }

        .bg-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, 
            rgba(102, 126, 234, 0.8) 0%, 
            rgba(118, 75, 162, 0.8) 50%,
            rgba(255, 154, 158, 0.6) 100%
          );
        }

        .bg-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
          background-size: 100px 100px;
        }

        .dashboard-header {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          padding: 1.5rem 2rem;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-content {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-title h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: white;
          margin: 0;
          background: linear-gradient(45deg, #fff, #f0f0f0);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .header-title p {
          color: rgba(255, 255, 255, 0.8);
          margin: 0.5rem 0 0 0;
          font-size: 1.1rem;
          font-weight: 300;
        }

        .header-nav {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .nav-link, .logout-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          font-size: 1rem;
        }

        .nav-link {
          background: rgba(255, 255, 255, 0.15);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .logout-btn {
          background: linear-gradient(45deg, #ff6b6b, #ee5a52);
          color: white;
          border: 2px solid transparent;
        }

        .logout-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(238, 90, 82, 0.4);
        }

        .nav-icon {
          font-size: 1.2rem;
        }

        .dashboard-main {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 2rem;
          min-height: calc(100vh - 200px);
        }

        .sidebar {
          position: sticky;
          top: 120px;
          height: fit-content;
        }

        .sidebar-content {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .sidebar-content h3 {
          margin: 0 0 1.5rem 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: #333;
          background: linear-gradient(45deg, #667eea, #764ba2);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .content-area {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .search-container {
          position: sticky;
          top: 120px;
          z-index: 50;
        }

        .search-wrapper {
          position: relative;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 25px;
          padding: 1rem 1.5rem;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .search-icon {
          font-size: 1.2rem;
          color: #667eea;
        }

        .search-input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 1.1rem;
          color: #333;
          outline: none;
        }

        .search-input::placeholder {
          color: #aaa;
        }

        .search-clear {
          background: #ff6b6b;
          color: white;
          border: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          transition: all 0.3s ease;
        }

        .search-clear:hover {
          background: #ee5a52;
          transform: scale(1.1);
        }

        .results-section {
          flex: 1;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(102, 126, 234, 0.2);
          border-top: 4px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        .loading-container p {
          color: #667eea;
          font-size: 1.1rem;
          font-weight: 500;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .recipes-grid {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .grid-header h2 {
          margin: 0 0 2rem 0;
          font-size: 1.8rem;
          font-weight: 700;
          color: #333;
          background: linear-gradient(45deg, #667eea, #764ba2);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 3rem;
        }

        /* Recipe Card Styles */
        .recipe-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .recipe-card:hover {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .recipe-image-container {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .recipe-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .recipe-card:hover .recipe-image {
          transform: scale(1.05);
        }

        .recipe-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent);
          pointer-events: none;
        }

        .recipe-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .recipe-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #333;
          margin: 0;
          line-height: 1.3;
          background: linear-gradient(45deg, #667eea, #764ba2);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .recipe-actions {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .details-btn {
          flex: 1;
          background: linear-gradient(45deg, #ff6b6b, #ee5a52);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
        }

        .details-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(238, 90, 82, 0.4);
        }

        .favorite-btn {
          background: rgba(255, 255, 255, 0.9);
          border: 2px solid #ddd;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .favorite-btn:hover {
          transform: scale(1.1);
          border-color: #ff6b6b;
        }

        .favorite-btn.favorited {
          background: #ff6b6b;
          border-color: #ff6b6b;
          color: white;
        }

        .favorite-btn.favorited:hover {
          background: #ee5a52;
          border-color: #ee5a52;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .dashboard-main {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .sidebar {
            position: static;
          }
          
          .search-container {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .dashboard-header {
            padding: 1rem;
          }
          
          .header-content {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
          
          .header-title h1 {
            font-size: 2rem;
          }
          
          .header-nav {
            flex-wrap: wrap;
            justify-content: center;
          }
          
          .dashboard-main {
            padding: 1rem;
          }
          
          .cards-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .sidebar-content,
          .recipes-grid {
            padding: 1.5rem;
          }

          .recipe-content {
            padding: 1.25rem;
          }
          
          .recipe-title {
            font-size: 1.1rem;
          }
          
          .details-btn {
            padding: 0.65rem 1.25rem;
            font-size: 0.9rem;
          }
          
          .favorite-btn {
            width: 44px;
            height: 44px;
            font-size: 1.1rem;
          }
        }

        @media (max-width: 480px) {
          .header-title h1 {
            font-size: 1.8rem;
          }
          
          .nav-link,
          .logout-btn {
            padding: 0.6rem 1.2rem;
            font-size: 0.9rem;
          }
          
          .search-wrapper {
            padding: 0.8rem 1.2rem;
          }
          
          .search-input {
            font-size: 1rem;
          }

          .recipe-image-container {
            height: 180px;
          }
          
          .recipe-content {
            padding: 1rem;
          }
          
          .recipe-title {
            font-size: 1rem;
          }
          
          .details-btn {
            padding: 0.6rem 1rem;
            font-size: 0.85rem;
          }
          
          .favorite-btn {
            width: 40px;
            height: 40px;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}