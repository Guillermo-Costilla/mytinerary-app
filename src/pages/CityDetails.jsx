import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { MapPin, Clock, ArrowLeft, User, ThumbsUp } from "lucide-react"
import { motion } from "framer-motion"
import useCityStore from "../store/cityStore"
import CommentSection from "../components/CommentSection"

const CityDetails = () => {
  const { id } = useParams()
  const { currentCity, isLoading, error, fetchCityById } = useCityStore()

  useEffect(() => {
    fetchCityById(id)
  }, [id, fetchCityById])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return <div className="bg-destructive/10 text-destructive p-4 rounded-md">{error}</div>
  }

  if (!currentCity) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">City not found</h2>
        <Link to="/cities" className="btn btn-primary">
          Back to Cities
        </Link>
      </div>
    )
  }

  // Mock itineraries data (replace with actual API call if available)
  const itineraries = [
    {
      id: 1,
      title: "Classic City Tour",
      duration: "4 hours",
      price: "$30",
      rating: 4.7,
      author: "TravelGuide",
      activities: [
        "Visit the main square",
        "Explore the historic district",
        "Lunch at a local restaurant",
        "Shopping at artisan market",
      ],
    },
    {
      id: 2,
      title: "Cultural Experience",
      duration: "6 hours",
      price: "$45",
      rating: 4.9,
      author: "CultureExplorer",
      activities: ["Museum tour", "Traditional dance show", "Cooking class", "Visit to historical monuments"],
    },
  ]

  return (
    <div>
      <Link to="/cities" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
        <ArrowLeft size={20} className="mr-2" />
        Back to Cities
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative h-80 rounded-xl overflow-hidden mb-8"
      >
        <img
          src={currentCity.image || "https://placehold.co/1200x800/3b82f6/ffffff?text=City+Image"}
          alt={currentCity.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h1 className="text-4xl font-bold mb-2">{currentCity.name}</h1>
          <div className="flex items-center">
            <MapPin size={20} className="mr-2" />
            <span className="text-xl">{currentCity.country}</span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <h2 className="text-2xl font-bold mb-4">About {currentCity.name}</h2>
          <p className="text-muted-foreground mb-6">{currentCity.description}</p>

          <div className="bg-primary/5 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold mb-4">City Highlights</h3>
            <ul className="space-y-2">
              {currentCity.highlights?.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-primary text-primary-foreground rounded-full w-6 h-6 text-sm mr-3 mt-0.5">
                    {index + 1}
                  </span>
                  <span>{highlight}</span>
                </li>
              )) || (
                  <>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center bg-primary text-primary-foreground rounded-full w-6 h-6 text-sm mr-3 mt-0.5">
                        1
                      </span>
                      <span>Famous landmarks and monuments</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center bg-primary text-primary-foreground rounded-full w-6 h-6 text-sm mr-3 mt-0.5">
                        2
                      </span>
                      <span>Local cuisine and dining experiences</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center bg-primary text-primary-foreground rounded-full w-6 h-6 text-sm mr-3 mt-0.5">
                        3
                      </span>
                      <span>Cultural events and festivals</span>
                    </li>
                  </>
                )}
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="bg-card p-6 rounded-lg mb-6 border border-border">
            <h3 className="text-xl font-semibold mb-4">City Information</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="font-medium w-24">Population:</span>
                <span className="text-muted-foreground">{currentCity.population || "1.5 million"}</span>
              </li>
              <li className="flex items-start">
                <span className="font-medium w-24">Currency:</span>
                <span className="text-muted-foreground">{currentCity.currency || "Local Currency"}</span>
              </li>
              <li className="flex items-start">
                <span className="font-medium w-24">Language:</span>
                <span className="text-muted-foreground">{currentCity.language || "Local Language"}</span>
              </li>
              <li className="flex items-start">
                <span className="font-medium w-24">Time Zone:</span>
                <span className="text-muted-foreground">{currentCity.timezone || "GMT+0"}</span>
              </li>
            </ul>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-xl font-semibold mb-4">Best Time to Visit</h3>
            <p className="text-muted-foreground mb-4">
              {currentCity.bestTimeToVisit ||
                "Spring and Fall seasons offer the most pleasant weather for exploring the city."}
            </p>
            <div className="flex flex-wrap gap-2">
              {["Spring", "Summer", "Fall", "Winter"].map((season) => (
                <span
                  key={season}
                  className={`px-3 py-1 rounded-full text-sm ${season === "Spring" || season === "Fall"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    : "bg-muted text-muted-foreground"
                    }`}
                >
                  {season}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold mb-6">Popular Itineraries</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {itineraries.map((itinerary, index) => (
            <motion.div
              key={itinerary.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              className="card hover:shadow-md transition-all duration-300"
            >
              <div className="bg-primary text-primary-foreground p-4">
                <h3 className="text-xl font-semibold">{itinerary.title}</h3>
                <div className="flex items-center mt-2">
                  <div className="flex items-center mr-4">
                    <Clock size={16} className="mr-1" />
                    <span>{itinerary.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <ThumbsUp size={16} className="mr-1" />
                    <span>{itinerary.rating}/5</span>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center text-muted-foreground mb-4">
                  <User size={16} className="mr-1" />
                  <span>Created by {itinerary.author}</span>
                </div>

                <h4 className="font-medium mb-2">Activities:</h4>
                <ul className="space-y-1 mb-4">
                  {itinerary.activities.map((activity, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-primary mr-2">•</span>
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">{itinerary.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <CommentSection cityId={id} />
    </div>
  )
}

export default CityDetails

