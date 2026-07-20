import { Navigate } from "react-router-dom"

const SellerProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken")
  const user = JSON.parse(localStorage.getItem("user"))

  if (!accessToken) {
    return <Navigate to="/seller/login" replace />
  }

  if (!user || user.role !== "SELLER") {
    return <Navigate to="/seller/login" replace />
  }

  return children
}

export default SellerProtectedRoute