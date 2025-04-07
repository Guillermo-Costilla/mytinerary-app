import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Menu, X, LogOut, Moon, Sun, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import useAuthStore from "../store/authStore"
import { useTheme } from "../context/ThemeContext"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuthStore()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  // Cierra el menu mobile cuando las rutas cambian
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold flex items-center">
            <MapPin className="mr-2" />
            <span>MyTinerary</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="hover:text-primary-foreground/80 transition-colors">
              Home
            </Link>
            <Link to="/cities" className="hover:text-primary-foreground/80 transition-colors">
              Cities
            </Link>
            {user && (
              <Link to="/create-city" className="hover:text-primary-foreground/80 transition-colors">
                Create City
              </Link>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 hover:text-primary-foreground/80 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary-foreground/20">
                    <img
                      src={user.photo || `https://ui-avatars.com/api/?name=${user.name || user.email}`}
                      alt={user.name || user.email}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="hidden lg:inline">{user.name || user.email}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:text-primary-foreground/80 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="hover:text-primary-foreground/80 transition-colors">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-primary px-3 py-1 rounded-md hover:bg-primary-foreground/90 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button className="p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden py-4 space-y-3"
          >
            <Link to="/" className="block hover:bg-primary-foreground/10 px-3 py-2 rounded-md">
              Home
            </Link>
            <Link to="/cities" className="block hover:bg-primary-foreground/10 px-3 py-2 rounded-md">
              Cities
            </Link>
            {user && (
              <Link to="/create-city" className="block hover:bg-primary-foreground/10 px-3 py-2 rounded-md">
                Create City
              </Link>
            )}

            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 hover:bg-primary-foreground/10 px-3 py-2 rounded-md"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary-foreground/20">
                    <img
                      src={user.photo || `https://ui-avatars.com/api/?name=${user.name || user.email}`}
                      alt={user.name || user.email}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span>{user.name || user.email}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center space-x-2 hover:bg-primary-foreground/10 px-3 py-2 rounded-md"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block hover:bg-primary-foreground/10 px-3 py-2 rounded-md">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-white text-primary px-3 py-2 rounded-md hover:bg-primary-foreground/90 mx-3"
                >
                  Register
                </Link>
              </>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar

