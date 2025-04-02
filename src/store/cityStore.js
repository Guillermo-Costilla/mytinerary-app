import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import useAuthStore from "../store/authStore"; // Importamos el store de autenticación

const API_URL = "https://mytinerary-backend-dun.vercel.app/api";

const useCityStore = create((set, get) => ({
  cities: [],
  filteredCities: [],
  currentCity: null,
  isLoading: false,
  error: null,
  searchTerm: "",

  // Fetch all cities
  fetchCities: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/cities`);
      set({
        cities: response.data.cities, 
        filteredCities: response.data.cities,
        isLoading: false,
      });
      return response.data.cities;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch cities";
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // Fetch a single city by ID
  fetchCityById: async (id) => {
    set({ isLoading: true, error: null, currentCity: null });
    try {
      const response = await axios.get(`${API_URL}/cities/${id}`);
      set({ currentCity: response.data.city, isLoading: false }); 
      return response.data.city;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch city details";
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // Create a new city (Usando el token almacenado)
  createCity: async (cityData) => {
    const { token } = useAuthStore.getState(); // Obtiene el token del usuario

    if (!token) {
      toast.error("You must be logged in to create a city.");
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/users/cities`, cityData, {
        headers: {
          Authorization: `Bearer ${token}`, // Se usa el token del usuario
        },
      });

      const newCity = response.data.city;

      set((state) => ({
        cities: [...state.cities, newCity],
        filteredCities: [...state.filteredCities, newCity],
        isLoading: false,
      }));

      toast.success("City created successfully!");
      return newCity;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to create city";
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // Search cities locally
  searchCities: (term) => {
    const { cities } = get();
    set({ searchTerm: term });

    if (!term.trim()) {
      set({ filteredCities: cities });
      return;
    }

    const filtered = cities.filter(
      (city) =>
        city.city.toLowerCase().includes(term.toLowerCase()) ||
        city.country.toLowerCase().includes(term.toLowerCase())
    );

    set({ filteredCities: filtered });
  },

  // Reset search
  resetSearch: () => {
    const { cities } = get();
    set({ searchTerm: "", filteredCities: cities });
  },
}));

export default useCityStore;
