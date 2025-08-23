import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, ChefHat, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // Login logic
        await login(formData.email, formData.password);
        navigate("/"); // Navigate to dashboard after successful login
      } else {
        // Register logic
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match");
        }
        await register(formData.name, formData.email, formData.password);
        navigate("/"); // Navigate to dashboard after successful registration
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError(""); // Clear error when switching modes
    setFormData({ email: "", password: "", name: "", confirmPassword: "" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3 }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4c1d95 0%, #1e3a8a 50%, #312e81 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    backgroundElement1: {
      position: 'absolute',
      top: '80px',
      left: '80px',
      width: '288px',
      height: '288px',
      background: 'rgba(168, 85, 247, 0.1)',
      borderRadius: '50%',
      filter: 'blur(60px)'
    },
    backgroundElement2: {
      position: 'absolute',
      bottom: '80px',
      right: '80px',
      width: '384px',
      height: '384px',
      background: 'rgba(59, 130, 246, 0.1)',
      borderRadius: '50%',
      filter: 'blur(60px)'
    },
    backgroundElement3: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '320px',
      height: '320px',
      background: 'rgba(99, 102, 241, 0.1)',
      borderRadius: '50%',
      filter: 'blur(60px)'
    },
    mainContainer: {
      position: 'relative',
      zIndex: 10,
      width: '100%',
      maxWidth: '448px'
    },
    logoContainer: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    logoIcon: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '64px',
      height: '64px',
      background: 'linear-gradient(to right, #a855f7, #3b82f6)',
      borderRadius: '16px',
      marginBottom: '16px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      cursor: 'pointer',
      transition: 'transform 0.2s ease'
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '8px',
      margin: 0
    },
    subtitle: {
      color: '#c4b5fd',
      margin: 0
    },
    card: {
      backdropFilter: 'blur(16px)',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '24px',
      padding: '32px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },
    toggleContainer: {
      display: 'flex',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      padding: '4px',
      marginBottom: '24px'
    },
    toggleButton: {
      flex: 1,
      padding: '12px 16px',
      borderRadius: '12px',
      fontWeight: '500',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '16px'
    },
    toggleButtonActive: {
      background: 'linear-gradient(to right, #a855f7, #3b82f6)',
      color: 'white',
      boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.1)'
    },
    toggleButtonInactive: {
      background: 'transparent',
      color: '#c4b5fd'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    inputContainer: {
      position: 'relative'
    },
    inputIcon: {
      position: 'absolute',
      left: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#c4b5fd',
      zIndex: 1
    },
    input: {
      width: '100%',
      paddingLeft: '48px',
      paddingRight: '16px',
      paddingTop: '16px',
      paddingBottom: '16px',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '16px',
      color: 'white',
      fontSize: '16px',
      outline: 'none',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box'
    },
    inputWithRightIcon: {
      paddingRight: '48px'
    },
    eyeButton: {
      position: 'absolute',
      right: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      color: '#c4b5fd',
      cursor: 'pointer',
      padding: '4px',
      borderRadius: '4px',
      transition: 'color 0.2s ease'
    },
    forgotPassword: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    forgotLink: {
      color: '#c4b5fd',
      textDecoration: 'none',
      fontSize: '14px',
      transition: 'color 0.2s ease'
    },
    submitButton: {
      width: '100%',
      padding: '16px',
      background: 'linear-gradient(to right, #a855f7, #3b82f6)',
      color: 'white',
      fontWeight: '600',
      borderRadius: '16px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 14px 0 rgba(168, 85, 247, 0.25)'
    },
    toggleText: {
      marginTop: '24px',
      textAlign: 'center'
    },
    toggleTextContent: {
      color: '#c4b5fd',
      fontSize: '14px',
      margin: 0
    },
    toggleTextButton: {
      color: 'white',
      fontWeight: '600',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      textDecoration: 'underline',
      fontSize: '14px',
      transition: 'color 0.2s ease'
    },
    socialSection: {
      marginTop: '24px',
      paddingTop: '24px',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
    },
    socialText: {
      textAlign: 'center',
      color: '#c4b5fd',
      fontSize: '14px',
      marginBottom: '16px',
      margin: '0 0 16px 0'
    },
    socialButtons: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px'
    },
    socialButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: '12px 16px',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '16px',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '14px'
    },
    socialIcon: {
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    googleIcon: {
      background: 'white',
      color: '#4285f4'
    },
    facebookIcon: {
      background: '#1877f2',
      color: 'white'
    },
    errorMessage: {
      color: '#f87171',
      fontSize: '14px',
      textAlign: 'center',
      marginBottom: '16px',
      padding: '8px',
      borderRadius: '8px',
      background: 'rgba(248, 113, 113, 0.1)',
      border: '1px solid rgba(248, 113, 113, 0.2)'
    },
    loadingButton: {
      opacity: 0.7,
      cursor: 'not-allowed'
    }
  };

  return (
    <div style={styles.container}>
      {/* Animated background elements */}
      <div>
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={styles.backgroundElement1}
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{...styles.backgroundElement2, animationDelay: '2s'}}
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{...styles.backgroundElement3, animationDelay: '4s'}}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={styles.mainContainer}
      >
        {/* Logo and Title */}
        <motion.div variants={itemVariants} style={styles.logoContainer}>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            style={styles.logoIcon}
          >
            <ChefHat size={32} color="white" />
          </motion.div>
          <h1 style={styles.title}>Recipe Master</h1>
          <p style={styles.subtitle}>Discover amazing recipes from around the world</p>
        </motion.div>

        {/* Auth Form Card */}
        <motion.div
          variants={itemVariants}
          style={styles.card}
        >
          {/* Toggle Buttons */}
          <div style={styles.toggleContainer}>
            <motion.button
              type="button"
              onClick={() => setIsLogin(true)}
              style={{
                ...styles.toggleButton,
                ...(isLogin ? styles.toggleButtonActive : styles.toggleButtonInactive)
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Login
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setIsLogin(false)}
              style={{
                ...styles.toggleButton,
                ...(!isLogin ? styles.toggleButtonActive : styles.toggleButtonInactive)
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Register
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? "login" : "register"}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handleSubmit}
              style={styles.form}
            >
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={styles.errorMessage}
                >
                  {error}
                </motion.div>
              )}

              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  style={styles.inputContainer}
                >
                  <User size={20} style={styles.inputIcon} />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    style={styles.input}
                  />
                </motion.div>
              )}

              <div style={styles.inputContainer}>
                <Mail size={20} style={styles.inputIcon} />
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.inputContainer}>
                <Lock size={20} style={styles.inputIcon} />
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  style={{...styles.input, ...styles.inputWithRightIcon}}
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </motion.button>
              </div>

              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  style={styles.inputContainer}
                >
                  <Lock size={20} style={styles.inputIcon} />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    style={styles.input}
                  />
                </motion.div>
              )}

              {isLogin && (
                <div style={styles.forgotPassword}>
                  <motion.a
                    href="#"
                    style={styles.forgotLink}
                    whileHover={{ scale: 1.05, color: 'white' }}
                  >
                    Forgot Password?
                  </motion.a>
                </div>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                style={{
                  ...styles.submitButton,
                  ...(loading ? styles.loadingButton : {})
                }}
                whileHover={loading ? {} : { 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)"
                }}
                whileTap={loading ? {} : { scale: 0.98 }}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTop: '2px solid white',
                        borderRadius: '50%'
                      }}
                    />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    {isLogin ? "Sign In" : "Create Account"}
                  </>
                )}
              </motion.button>
            </motion.form>
          </AnimatePresence>

          <motion.div
            variants={itemVariants}
            style={styles.toggleText}
          >
            <p style={styles.toggleTextContent}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <motion.button
                onClick={toggleMode}
                style={styles.toggleTextButton}
                whileHover={{ scale: 1.05, color: '#c4b5fd' }}
                whileTap={{ scale: 0.95 }}
              >
                {isLogin ? "Sign up" : "Sign in"}
              </motion.button>
            </p>
          </motion.div>

          {/* Social Login */}
          <motion.div
            variants={itemVariants}
            style={styles.socialSection}
          >
            <p style={styles.socialText}>Or continue with</p>
            <div style={styles.socialButtons}>
              <motion.button
                style={styles.socialButton}
                whileHover={{ scale: 1.02, y: -2, background: 'rgba(255, 255, 255, 0.2)' }}
                whileTap={{ scale: 0.98 }}
              >
                <div style={{...styles.socialIcon, ...styles.googleIcon}}>
                  G
                </div>
                Google
              </motion.button>
              <motion.button
                style={styles.socialButton}
                whileHover={{ scale: 1.02, y: -2, background: 'rgba(255, 255, 255, 0.2)' }}
                whileTap={{ scale: 0.98 }}
              >
                <div style={{...styles.socialIcon, ...styles.facebookIcon}}>
                  f
                </div>
                Facebook
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}