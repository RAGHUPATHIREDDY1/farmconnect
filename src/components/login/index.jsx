import {useState} from "react"
import {useNavigate, Link} from "react-router-dom"
import "./index.css"

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const onSubmitLogin = async event => {
    event.preventDefault()

    setErrorMsg("")

    if (!email || !password) {
      setErrorMsg("Please enter email and password.")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(
        "https://farmconnectbackend.onrender.com/api/accounts/buyer/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email.toLowerCase().trim(),
            password
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        const backendError =
          Object.values(data)
            .flat()
            .join(" ")

        setErrorMsg(
          backendError ||
          "Invalid email or password."
        )

        return
      }

      localStorage.setItem(
        "accessToken",
        data.access
      )

      localStorage.setItem(
        "refreshToken",
        data.refresh
      )

      localStorage.setItem(
        "currentUser",
        JSON.stringify(data.user)
      )

      navigate("/", {replace: true})

    } catch (error) {
      console.error("Login Error:", error)

      setErrorMsg(
        "Unable to connect to the server. Make sure Django is running."
      )

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-left">

          <h1>
            🌾 FarmConnect
          </h1>

          <p>
            Connecting Farmers & Buyers
            Across India.
          </p>

          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1000"
            alt="Farm"
            className="login-image"
          />

        </div>

        <div className="login-right">

          <h2>
            Welcome Back 👋
          </h2>

          <p className="subtitle">
            Login to your buyer account
          </p>

          <form
            onSubmit={onSubmitLogin}
            className="login-form"
          >

            <label className="label">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={event =>
                setEmail(event.target.value)
              }
              className="input-field"
            />

            <label className="label">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={event =>
                setPassword(event.target.value)
              }
              className="input-field"
            />

            {errorMsg && (
              <p className="error-message">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="login-btn"
              disabled={isLoading}
            >
              {isLoading
                ? "Logging in..."
                : "Login"}
            </button>

            <p className="register-text">
              Don't have an account?

              <Link
                to="/register"
                className="register-link"
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