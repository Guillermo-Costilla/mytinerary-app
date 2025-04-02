import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "https://mytinerary-backend-dun.vercel.app/api";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      // Login with email and password
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/auth/signin`, {
            email,
            password,
          });

          const { user, token } = response.data.response;

          set({ user, token, isLoading: false });
          toast.success("Logged in successfully!");
          return { user, token };
        } catch (error) {
          const errorMessage = error.response?.data?.message || "Failed to login";
          set({ error: errorMessage, isLoading: false });
          toast.error(errorMessage);
          throw new Error(errorMessage);
        }
      },

      // Register new user
      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/auth/signup`, userData);
          toast.success("Registration successful! Please log in.");
          set({ isLoading: false });
          return response.data;
        } catch (error) {
          const errorMessage = error.response?.data?.message || "Failed to register";
          set({ error: errorMessage, isLoading: false });
          toast.error(errorMessage);
          throw new Error(errorMessage);
        }
      },

      // Google login
      googleLogin: async (tokenId) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/auth/google`, { tokenId });

          const { user, token } = response.data.response;

          set({ user, token, isLoading: false });
          toast.success("Logged in with Google successfully!");
          return { user, token };
        } catch (error) {
          const errorMessage = error.response?.data?.message || "Failed to login with Google";
          set({ error: errorMessage, isLoading: false });
          toast.error(errorMessage);
          throw new Error(errorMessage);
        }
      },

      // Logout
      logout: () => {
        set({ user: null, token: null, error: null });
        toast.success("Logged out successfully!");
      },

      // Update user profile
      updateProfile: async (userData) => {
        const { user, token } = get();
        if (!user) return;

        set({ isLoading: true, error: null });
        try {
          const response = await axios.put(`${API_URL}/users/profile`, userData, {
            headers: { Authorization: `Bearer ${token}` },
          });

          set({ user: response.data.response.user, isLoading: false });
          toast.success("Profile updated successfully!");
          return response.data.response.user;
        } catch (error) {
          const errorMessage = error.response?.data?.message || "Failed to update profile";
          set({ error: errorMessage, isLoading: false });
          toast.error(errorMessage);
          throw new Error(errorMessage);
        }
      },
    }),
    {
      name: "auth-storage", // name of the item in localStorage
      partialize: (state) => ({ user: state.user, token: state.token }), // Persist user and token
    }
  )
);

export default useAuthStore;
