import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Store
} from "lucide-react"

import "./seller.css"

const SellerLogin = () => {

  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const onChangeInput = event => {

    const { name, value } = event.target

    setLoginData(previousData => ({
      ...previousData,
      [name]: value
    }))

  }

  const onSubmitLogin = event => {

    event.preventDefault()

    const sellers =
      JSON.parse(
        localStorage.getItem("farmConnectSellers")
      ) || []

    const seller = sellers.find(
      eachSeller =>
        eachSeller.email === loginData.email &&
        eachSeller.password === loginData.password
    )

    if (!seller) {

      alert("Invalid seller email or password")

      return
    }

    localStorage.setItem(
      "currentSeller",
      JSON.stringify(seller)
    )

    navigate("/seller/dashboard")

  }

  return (

    <div className="seller-auth-page">

      {/* Left Side */}

      <div className="seller-auth-visual">

        <div className="seller-auth-brand">

          <div className="seller-auth-logo">
            🌾
          </div>

          <div>

            <h2>
              FarmConnect
            </h2>

            <p>
              Farm To Home
            </p>

          </div>

        </div>


        <div className="seller-auth-visual-content">

          <span>
            🌱 SELLER CENTER
          </span>

          <h1>
            Grow Your Farm.
            <br />
            Reach More Buyers.
          </h1>

          <p>
            Sell your fresh farm products directly to customers
            and build your business with FarmConnect.
          </p>

        </div>


        <div className="seller-auth-farm-illustration">
          🌾 🚜 🥕 🍎
        </div>

      </div>


      {/* Right Side */}

      <div className="seller-auth-form-container">

        <div className="seller-auth-form-box">

          <div className="seller-auth-icon">
            <Store size={27} />
          </div>

          <h1>
            Seller Login
          </h1>

          <p className="seller-auth-subtitle">
            Welcome back! Manage your FarmConnect store.
          </p>


          <form
            onSubmit={onSubmitLogin}
          >

            {/* Email */}

            <div className="seller-auth-input-group">

              <label>
                Email Address
              </label>

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


            {/* Password */}

            <div className="seller-auth-input-group">

              <label>
                Password
              </label>

              <div className="seller-auth-input-wrapper">

                <Lock size={18} />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={onChangeInput}
                  required
                />

                <button
                  type="button"
                  className="seller-password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >

                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}

                </button>

              </div>

            </div>


            <div className="seller-forgot-password">

              <button
                type="button"
              >
                Forgot Password?
              </button>

            </div>


            <button
              type="submit"
              className="seller-auth-submit-button"
            >

              Login to Seller Account

              <ArrowRight size={19} />

            </button>

          </form>


          <p className="seller-auth-switch">

            Don't have a seller account?

            <Link to="/seller/register">
              Create Seller Account
            </Link>

          </p>


          <button
            className="seller-back-to-buyer"
            onClick={() =>
              navigate("/login")
            }
          >
            ← Login as Buyer
          </button>

        </div>

      </div>

    </div>

  )

}

export default SellerLogin