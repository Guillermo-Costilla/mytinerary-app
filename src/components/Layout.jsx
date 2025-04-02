"use client"

import { Outlet } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useLocation } from "react-router-dom"

const Layout = () => {
  const location = useLocation()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-grow container mx-auto px-4 py-8"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

export default Layout

