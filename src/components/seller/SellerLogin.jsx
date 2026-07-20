import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Mail, Lock, Eye, EyeOff, ArrowRight, Store } from "lucide-react"
import "./seller.css"

const SellerLogin = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const onChangeInput = event => {
    const { name, value } = event.target
    setLoginData(previousData => ({
      ...previousData,
      [name]: value
    }))
    setErrorMessage("")
  }

  const onSubmitLogin = async event => {
    event.preventDefault()
    setErrorMessage("")
    setIsLoading(true)

    try {
      const response = await fetch(
        "https://farmconnectbackend.onrender.com/api/accounts/seller/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: loginData.email,
            password: loginData.password
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        if (data.non_field_errors) {
          setErrorMessage(data.non_field_errors[0])
        } else {
          setErrorMessage("Invalid seller email or password.")
        }
        return
      }

      if (data.user.role !== "SELLER") {
        setErrorMessage("This account is not a seller account.")
        return
      }

      localStorage.setItem("accessToken", data.access)
      localStorage.setItem("refreshToken", data.refresh)
      localStorage.setItem("user", JSON.stringify(data.user))

      alert("Seller login successful!")
      navigate("/seller/dashboard")
    } catch (error) {
      console.error("Seller Login Error:", error)
      setErrorMessage("Unable to connect to the server. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="seller-auth-page">
      {/* LEFT SIDE */}
      <div className="seller-auth-visual">
        <div className="seller-auth-brand">
          <div className="seller-auth-logo">🌾</div>
          <div>
            <h2>FarmConnect</h2>
            <p>Farm To Home</p>
          </div>
        </div>

        <div className="seller-auth-visual-content">
          <span>🌱 SELLER CENTER</span>
          <h1>
            Grow Your Farm.<br />
            Reach More Buyers.
          </h1>
          <p>
            Sell your fresh farm products directly to customers
            and build your business with FarmConnect.
          </p>
        </div>
        <div className="seller-auth-farm-illustration">🌾 🚜 🥕 🍎</div>
      </div>

      {/* RIGHT SIDE */}
      <div className="seller-auth-form-container">
        <div className="seller-auth-form-box">
          <div className="seller-auth-icon">
            <Store size={27} />
          </div>
          <h1>Seller Login</h1>
          <p className="seller-auth-subtitle">
            Welcome back! Manage your FarmConnect store.
          </p>

          {errorMessage && (
            <div className="seller-login-error">
              {errorMessage}
            </div>
          )}

          <form onSubmit={onSubmitLogin}>
            {/* EMAIL */}
            <div className="seller-auth-input-group">
              <label>Email Address</label>
              <div className="seller-auth-input-wrapper">
                <Mail size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={loginData.email}
                  onChange={onChangeInput}
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="seller-auth-input-group">
              <label>Password</label>
              <div className="seller-auth-input-wrapper">
                <Lock size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={onChangeInput}
                  required
                />
                <button
                  type="button"
                  className="seller-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* FORGOT PASSWORD */}
            <div className="seller-forgot-password">
              <button type="button">Forgot Password?</button>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="seller-auth-submit-button"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login to Seller Account"}
              {!isLoading && <ArrowRight size={19} />}
            </button>
          </form>

          <p className="seller-auth-switch">
            Don't have a seller account?
            <Link to="/seller/register">Create Seller Account</Link>
          </p>

          <button
            className="seller-back-to-buyer"
            onClick={() => navigate("/login")}
          >
            ← Login as Buyer
          </button>
        </div>
      </div>
    </div>
  )
}

export default SellerLogin