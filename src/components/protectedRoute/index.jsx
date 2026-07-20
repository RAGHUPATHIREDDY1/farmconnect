import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const accessToken =
    localStorage.getItem("accessToken")

  const currentUser =
    JSON.parse(
      localStorage.getItem("currentUser")
    )

  if (
    !accessToken ||
    !currentUser ||
    currentUser.role !== "BUYER"
  ) {
    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }

  return children
}

export default ProtectedRoute