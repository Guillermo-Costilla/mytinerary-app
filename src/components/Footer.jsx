"use client"

import { Link } from "react-router-dom"
import { MapPin, Mail, Phone, Instagram, Twitter, Facebook } from "lucide-react"
import { useTheme } from "../context/ThemeContext"

const Footer = () => {
  const { theme } = useTheme()

  return (
    <footer className={`${theme === "dark" ? "bg-gray-900" : "bg-gray-800"} text-white py-8`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <MapPin className="mr-2" />
              MyTinerary
            </h3>
            <p className="text-gray-300 mb-4">
              Discover amazing cities and create your perfect itinerary for your next adventure.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cities" className="text-gray-300 hover:text-white transition-colors">
                  Cities
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-white transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <MapPin size={18} className="text-gray-400" />
                <span className="text-gray-300">123 Travel Street, World</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} className="text-gray-400" />
                <a href="mailto:info@mytinerary.com" className="text-gray-300 hover:text-white transition-colors">
                  info@mytinerary.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={18} className="text-gray-400" />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-white transition-colors">
                  +123 456 7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} MyTinerary. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

