import { MapPin } from "lucide-react"
import { motion } from "framer-motion"

const HomeCard = ({ city, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="card group hover:shadow-md transition-all duration-300"
        >
            <div className="relative overflow-hidden">
                <img
                    src={city.image || "https://placehold.co/600x400/3b82f6/ffffff?text=City+Image"}
                    alt={city.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-bold">{city.name}</h3>
                    <div className="flex items-center mt-1">
                        <MapPin size={16} className="mr-1" />
                        <span>{city.country}</span>
                    </div>
                </div>
            </div>
            <div className="p-4">
                <p className="text-muted-foreground line-clamp-2 mb-4">{city.description}</p>
            </div>
        </motion.div>
    )
}

export default HomeCard