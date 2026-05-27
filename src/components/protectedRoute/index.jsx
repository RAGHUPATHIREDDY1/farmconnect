import {Navigate} from "react-router-dom"

const ProtectedRoute = props => {

  const loggedUser =
    localStorage.getItem("loggedUser")

  if (loggedUser === null) {
    return <Navigate to="/login" />
  }

  return props.children
}

export default ProtectedRoute