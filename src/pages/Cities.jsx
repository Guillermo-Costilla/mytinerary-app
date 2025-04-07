import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { Search } from "lucide-react"
import CityCard from "../components/CityCard"
import useCityStore from "../store/cityStore"
import { motion } from "framer-motion"

const Cities = () => {
  const { filteredCities, isLoading, error, fetchCities, searchCities, searchTerm } = useCityStore();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    const searchQuery = searchParams.get("search");
    if (searchQuery?.trim()) {
      searchCities(searchQuery);
    }
  }, [searchParams, searchCities]);

  const handleSearch = (e) => {
    const value = e.target.value.trim();
    searchCities(value);
    setSearchParams(value ? { search: value } : {});
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-primary text-primary-foreground py-12 px-4 mb-8 rounded-lg"
      >
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Explore Cities Around the World</h1>
          <p className="text-xl max-w-2xl mx-auto mb-6">
            Discover beautiful destinations and plan your next adventure with our curated city guides.
          </p>

          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for a city or country..."
                className="w-full py-3 px-4 pl-12 rounded-full text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                value={searchTerm}
                onChange={handleSearch}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            </div>
          </div>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">{error}</div>
      ) : (
        <>
          {!isLoading && !error && (
            <>
              {!filteredCities || filteredCities.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No cities found</h3>
                  <p className="text-muted-foreground">Try adjusting your search criteria</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredCities.map((city, index) => (
                    <CityCard key={city._id} city={city} index={index} />
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Cities

