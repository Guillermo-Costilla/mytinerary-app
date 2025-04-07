import { createContext, useState, useEffect, useContext } from "react"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      setError(null)
      const response = await fetch("https://mytinerary-backend-dun.vercel.app/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to login")
      }

      localStorage.setItem("user", JSON.stringify(data))
      setCurrentUser(data)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const googleLogin = async (tokenId) => {
    try {
      setError(null)
      const response = await fetch("https://mytinerary-backend-dun.vercel.app/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tokenId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to login with Google")
      }

      localStorage.setItem("user", JSON.stringify(data))
      setCurrentUser(data)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const register = async (userData) => {
    try {
      setError(null)
      const response = await fetch("https://mytinerary-backend-dun.vercel.app/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to register")
      }

      return data
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const logout = () => {
    localStorage.removeItem("user")
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    loading,
    error,
    login,
    googleLogin,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

