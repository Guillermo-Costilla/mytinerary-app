import { Navigate } from "react-router-dom"
import useAuthStore from "../store/authStore"

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuthStore()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute

