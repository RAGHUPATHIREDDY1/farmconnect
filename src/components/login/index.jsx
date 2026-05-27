import {useState} from "react"
import {useNavigate, Link} from "react-router-dom"

import "./index.css"

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const onSubmitLogin = event => {
    event.preventDefault()

    setErrorMsg("")

    const users =
      JSON.parse(localStorage.getItem("users")) || []

    const validUser = users.find(
      eachUser =>
        eachUser.email === email &&
        eachUser.password === password
    )

    if (validUser) {

      localStorage.setItem(
        "loggedUser",
        JSON.stringify(validUser)
      )

      navigate("/")
    } else {
      setErrorMsg(
        "Invalid Email or Password"
      )
    }
  }

  return (
    <div className="login-main-container">

      <div className="login-card">

        <div className="login-left-section">

          <h1 className="login-heading">
            Welcome Back
          </h1>

          <p className="login-description">
            Login to explore fresh fruits,
            vegetables, animals and modern
            farming machines.
          </p>

          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854"
            alt="farm"
            className="login-image"
          />

        </div>

        <div className="login-right-section">

          <h1 className="form-heading">
            Login
          </h1>

          <form
            className="login-form"
            onSubmit={onSubmitLogin}
          >

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

            {errorMsg && (
              <p className="error-message">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="login-button"
            >
              Login
            </button>

            <p className="register-text">
              Don't have an account?
              <Link
                to="/register"
                className="link"
              >
                Register
              </Link>
            </p>

          </form>

        </div>

      </div>

    </div>
  )
}

export default Login