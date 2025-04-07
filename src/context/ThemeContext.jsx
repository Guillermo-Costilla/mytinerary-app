import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext()

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Check if theme is stored in localStorage
        const storedTheme = localStorage.getItem("theme")
        // Check user preference
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

        return storedTheme || (prefersDark ? "dark" : "light")
    })

    useEffect(() => {
        // Update localStorage and document class when theme changes
        localStorage.setItem("theme", theme)

        if (theme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [theme])

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
    }

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}