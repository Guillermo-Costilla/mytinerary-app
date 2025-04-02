"use client"

import { Link } from "react-router-dom"
import { MapPin, Search } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/cities?search=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <div className="relative">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
          alt="Travel destinations"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 dark:bg-black/70"></div>
      </div>

      <div className="relative py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          Discover Your Perfect Itinerary
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl max-w-3xl mb-8"
        >
          Explore amazing cities around the world and plan your next adventure with our curated itineraries.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          onSubmit={handleSearch}
          className="w-full max-w-md bg-white rounded-full overflow-hidden flex items-center p-1 mb-8"
        >
          <div className="flex-shrink-0 pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for a city..."
            className="w-full py-2 px-3 text-gray-700 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-colors"
          >
            Search
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link to="/cities" className="btn btn-primary">
            Explore Cities
          </Link>
          <Link to="/register" className="btn bg-white text-primary hover:bg-primary-foreground/90">
            Sign Up Now
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-6 mt-12"
        >
          {["Paris", "Tokyo", "New York", "Rome"].map((city, index) => (
            <motion.div
              key={city}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              className="flex items-center"
            >
              <MapPin className="text-primary mr-2" />
              <span>{city}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Hero

