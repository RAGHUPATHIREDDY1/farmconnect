import {useState} from "react"
import {useNavigate, Link} from "react-router-dom"

import "./index.css"

const Register = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  const onSubmitForm = event => {
    event.preventDefault()

    setErrorMsg("")
    setSuccessMsg("")

    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setErrorMsg("All fields are required")
      return
    }

    if (password.length < 6) {
      setErrorMsg("Password must be minimum 6 characters")
      return
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match")
      return
    }

    const users =
      JSON.parse(localStorage.getItem("users")) || []

    const userExists = users.find(
      eachUser => eachUser.email === email
    )

    if (userExists) {
      setErrorMsg("User already exists")
      return
    }

    const newUser = {
      id: Date.now(),
      username,
      email,
      password
    }

    users.push(newUser)

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    )

    setSuccessMsg("Registration Successful")

    setUsername("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")

    setTimeout(() => {
      navigate("/login")
    }, 1500)
  }

  return (
    <div className="register-main-container">
      <div className="register-card">

        <div className="register-left-section">
          <h1 className="register-heading">
            FarmConnect
          </h1>

          <p className="register-description">
            Create your account and connect
            with farmers, fresh products,
            animals, and farming machines.
          </p>

          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854"
            alt="farm"
            className="register-image"
          />
        </div>

        <div className="register-right-section">

          <h1 className="form-heading">
            Create Account
          </h1>

          <form
            className="register-form"
            onSubmit={onSubmitForm}
          >

            <label className="label">
              Username
            </label>

            <input
              type="text"
              className="input"
              placeholder="Enter Username"
              value={username}
              onChange={e =>
                setUsername(e.target.value)
              }
            />

            <label className="label">
              Email
            </label>

            <input
              type="email"
              className="input"
              placeholder="Enter Email"
              value={email}
              onChange={e =>
                setEmail(e.target.value)
              }
            />

            <label className="label">
              Password
            </label>

            <input
              type="password"
              className="input"
              placeholder="Enter Password"
              value={password}
              onChange={e =>
                setPassword(e.target.value)
              }
            />

            <label className="label">
              Confirm Password
            </label>

            <input
              type="password"
              className="input"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e =>
                setConfirmPassword(
                  e.target.value
                )
              }
            />

            {errorMsg && (
              <p className="error-message">
                {errorMsg}
              </p>
            )}

            {successMsg && (
              <p className="success-message">
                {successMsg}
              </p>
            )}

            <button
              type="submit"
              className="register-button"
            >
              Register
            </button>

            <p className="login-text">
              Already have an account?
              <Link to="/login" className="link">
                Login
              </Link>
            </p>

          </form>

        </div>
      </div>
    </div>
  )
}

export default Register