import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { ThemeProvider } from "./context/ThemeContext"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Cities from "./pages/Cities"
import CityDetails from "./pages/CityDetails"
import CreateCity from "./pages/CreateCity"
import Login from "./pages/login"
import Register from "./pages/register"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import UserProfile from "./pages/UserProfile"

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="cities" element={<Cities />} />
            <Route path="cities/:id" element={<CityDetails />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="create-city"
              element={
                <ProtectedRoute>
                  <CreateCity />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

