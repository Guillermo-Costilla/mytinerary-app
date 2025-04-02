"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import useAuthStore from "../store/authStore"
import useCityStore from "../store/cityStore"
import toast from "react-hot-toast"

const CreateCity = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { createCity, isLoading, error } = useCityStore()

  const [formData, setFormData] = useState({
    city: '',
    country: '',
    currency: '',
    language: '',
    image: '',
    description: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const newCity = await createCity(formData, user.token)
      toast.success("City created successfully!")
      navigate(`/cities/${newCity._id}`)
    } catch (err) {
      // Error is handled in the store
      console.error(err)
    }
  }

  return (
    <div>
      <button onClick={() => navigate(-1)} className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
        <ArrowLeft size={20} className="mr-2" />
        Go Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="card"
      >
        <div className="bg-primary text-primary-foreground p-6">
          <h1 className="text-2xl font-bold">Create New City</h1>
          <p className="mt-2">Add a new city to our collection</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-6">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="city" className="block font-medium mb-2">
                City Name *
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="input"
                placeholder="e.g. Paris"
              />
            </div>

            <div>
              <label htmlFor="country" className="block font-medium mb-2">
                Country *
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="input"
                placeholder="e.g. France"
              />
            </div>
            <div>
              <label htmlFor="currency" className="block font-medium mb-2">
                Currency *
              </label>
              <input
                type="text"
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                required
                className="input"
                placeholder="USD"
              />
            </div>
            <div>
              <label htmlFor="language" className="block font-medium mb-2">
                Language *
              </label>
              <input
                type="text"
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
                className="input"
                placeholder="e.g. Español"
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="image" className="block font-medium mb-2">
              Image URL (optional)
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="input"
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Provide a URL to an image of the city (recommended size: 1200x800px)
            </p>
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block font-medium mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="input"
              placeholder="Provide a detailed description of the city..."
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary" disabled={isLoading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary-foreground"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating...
                </span>
              ) : (
                "Create City"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default CreateCity

