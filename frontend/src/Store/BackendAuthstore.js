import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/auth";

const useBackendAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      error: null,
      loading: false,
      notification: null,

      // LOGIN
      login: async (email, password) => {
        set({ loading: true, error: null, notification: null });

        try {
          const res = await axios.post(`${API_URL}/login`, {
            email,
            password,
          });

          const { token, user } = res.data;

          set({
            isAuthenticated: true,
            user,
            token,
            loading: false,
            notification: "Login successful",
          });

          return true;
        } catch (error) {
          set({
            loading: false,
            error: error.response?.data?.message || error.message,
            notification: error.response?.data?.message || error.message,
          });

          return false;
        }
      },

      // SIGNUP
      signup: async (username, email, password) => {
        set({ loading: true, error: null, notification: null });

        try {
          const res = await axios.post(`${API_URL}/signup`, {
            username,
            email,
            password,
          });

          const { token, user } = res.data;

          set({
            isAuthenticated: true,
            user,
            token,
            loading: false,
            notification: "Signup successful",
          });

          return true;
        } catch (error) {
          set({
            loading: false,
            error: error.response?.data?.message || error.message,
            notification: error.response?.data?.message || error.message,
          });

          return false;
        }
      },

      // LOGOUT
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        });
      },
    }),
    {
      name: "backend-auth",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
      }),
    }
  )
);

export default useBackendAuthStore;
