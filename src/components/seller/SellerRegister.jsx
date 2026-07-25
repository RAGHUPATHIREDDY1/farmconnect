import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Store,
  MapPin,
  Building2,
  ArrowRight,
  LoaderCircle
} from "lucide-react"
import "./seller.css"

const API_URL =
  "https://farmconnectbackend.onrender.com/api/accounts/seller/register/"

const initialSellerData = {
  full_name: "",
  email: "",
  phone_number: "",
  password: "",
  farm_name: "",
  address: "",
  city: "",
  state: "",
  pincode: ""
}

const SellerRegister = () => {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [sellerData, setSellerData] = useState(initialSellerData)

  const onChangeInput = event => {
    const { name, value } = event.target

    setSellerData(previousData => ({
      ...previousData,
      [name]: value
    }))

    setErrorMessage("")
    setSuccessMessage("")
  }

  const getBackendError = data => {
    if (!data) {
      return "Registration failed. Please try again."
    }

    if (typeof data === "string") {
      return data
    }

    if (data.detail) {
      return data.detail
    }

    if (data.error) {
      return data.error
    }

    if (data.non_field_errors) {
      return data.non_field_errors[0]
    }

    const errors = Object.values(data)

    for (const error of errors) {
      if (Array.isArray(error) && error.length > 0) {
        return error[0]
      }

      if (typeof error === "string") {
        return error
      }
    }

    return "Registration failed. Please check your details."
  }

  const onSubmitRegister = async event => {
    event.preventDefault()

    setErrorMessage("")
    setSuccessMessage("")

    const trimmedData = {
      full_name: sellerData.full_name.trim(),
      email: sellerData.email.trim().toLowerCase(),
      phone_number: sellerData.phone_number.trim(),
      password: sellerData.password,
      farm_name: sellerData.farm_name.trim(),
      address: sellerData.address.trim(),
      city: sellerData.city.trim(),
      state: sellerData.state.trim(),
      pincode: sellerData.pincode.trim()
    }

    if (
      !trimmedData.full_name ||
      !trimmedData.email ||
      !trimmedData.phone_number ||
      !trimmedData.password ||
      !trimmedData.farm_name ||
      !trimmedData.address ||
      !trimmedData.city ||
      !trimmedData.state ||
      !trimmedData.pincode
    ) {
      setErrorMessage("Please fill in all fields.")
      return
    }

    if (trimmedData.phone_number.length !== 10) {
      setErrorMessage("Phone number must contain exactly 10 digits.")
      return
    }

    if (!/^[0-9]{10}$/.test(trimmedData.phone_number)) {
      setErrorMessage("Please enter a valid 10-digit phone number.")
      return
    }

    if (trimmedData.pincode.length !== 6) {
      setErrorMessage("Pincode must contain exactly 6 digits.")
      return
    }

    if (!/^[0-9]{6}$/.test(trimmedData.pincode)) {
      setErrorMessage("Please enter a valid 6-digit pincode.")
      return
    }

    if (trimmedData.password.length < 8) {
      setErrorMessage("Password must contain at least 8 characters.")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(trimmedData)
      })

      const responseText = await response.text()

      let data

      try {
        data = JSON.parse(responseText)
      } catch {
        data = responseText
      }

      if (!response.ok) {
        setErrorMessage(getBackendError(data))
        return
      }

      setSuccessMessage(
        "Seller account created successfully. Redirecting to login..."
      )

      setSellerData(initialSellerData)

      setTimeout(() => {
        navigate("/seller/login", { replace: true })
      }, 1500)
    } catch (error) {
      console.error("Seller Registration Error:", error)

      setErrorMessage(
        "Unable to connect to the server. Please check your internet connection and try again."
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="seller-register-page">
      <div className="seller-register-top">
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

        <p>
          Already have an account?

          <Link to="/seller/login">
            Login
          </Link>
        </p>
      </div>

      <div className="seller-register-container">
        <div className="seller-register-heading">
          <div className="seller-auth-icon">
            <Store size={27} />
          </div>

          <span>
            🌱 JOIN FARMCONNECT
          </span>

          <h1>
            Start Selling With Us
          </h1>

          <p>
            Create your seller account and connect your products with buyers across India.
          </p>
        </div>

        {errorMessage && (
          <div className="seller-error-message">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="seller-success-message">
            {successMessage}
          </div>
        )}

        <form
          className="seller-register-form"
          onSubmit={onSubmitRegister}
        >
          <section className="seller-register-section">
            <div className="seller-register-section-title">
              <User size={21} />

              <div>
                <h2>
                  Personal Information
                </h2>

                <p>
                  Tell us about yourself.
                </p>
              </div>
            </div>

            <div className="seller-register-grid">
              <div className="seller-auth-input-group">
                <label>
                  Full Name
                </label>

                <div className="seller-auth-input-wrapper">
                  <User size={18} />

                  <input
                    type="text"
                    name="full_name"
                    placeholder="Your full name"
                    value={sellerData.full_name}
                    onChange={onChangeInput}
                    required
                  />
                </div>
              </div>

              <div className="seller-auth-input-group">
                <label>
                  Email Address
                </label>

                <div className="seller-auth-input-wrapper">
                  <Mail size={18} />

                  <input
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    value={sellerData.email}
                    onChange={onChangeInput}
                    required
                  />
                </div>
              </div>

              <div className="seller-auth-input-group">
                <label>
                  Phone Number
                </label>

                <div className="seller-auth-input-wrapper">
                  <Phone size={18} />

                  <input
                    type="tel"
                    name="phone_number"
                    placeholder="9876543210"
                    value={sellerData.phone_number}
                    onChange={onChangeInput}
                    maxLength="10"
                    required
                  />
                </div>
              </div>

              <div className="seller-auth-input-group">
                <label>
                  Farm / Business Name
                </label>

                <div className="seller-auth-input-wrapper">
                  <Building2 size={18} />

                  <input
                    type="text"
                    name="farm_name"
                    placeholder="Example: Raghupathi Farms"
                    value={sellerData.farm_name}
                    onChange={onChangeInput}
                    required
                  />
                </div>
              </div>

              <div className="seller-auth-input-group seller-register-full-width">
                <label>
                  Password
                </label>

                <div className="seller-auth-input-wrapper">
                  <Lock size={18} />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a strong password"
                    value={sellerData.password}
                    onChange={onChangeInput}
                    minLength="8"
                    required
                  />

                  <button
                    type="button"
                    className="seller-password-toggle"
                    onClick={() => setShowPassword(previous => !previous)}
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                <small>
                  Password must contain at least 8 characters.
                </small>
              </div>
            </div>
          </section>

          <section className="seller-register-section">
            <div className="seller-register-section-title">
              <MapPin size={21} />

              <div>
                <h2>
                  Farm & Business Location
                </h2>

                <p>
                  Tell us where your farm or business is located.
                </p>
              </div>
            </div>

            <div className="seller-register-grid">
              <div className="seller-auth-input-group seller-register-full-width">
                <label>
                  Complete Address
                </label>

                <textarea
                  name="address"
                  placeholder="House number, street, farm address..."
                  value={sellerData.address}
                  onChange={onChangeInput}
                  rows="4"
                  required
                />
              </div>

              <div className="seller-auth-input-group">
                <label>
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  placeholder="Hyderabad"
                  value={sellerData.city}
                  onChange={onChangeInput}
                  required
                />
              </div>

              <div className="seller-auth-input-group">
                <label>
                  State
                </label>

                <input
                  type="text"
                  name="state"
                  placeholder="Telangana"
                  value={sellerData.state}
                  onChange={onChangeInput}
                  required
                />
              </div>

              <div className="seller-auth-input-group">
                <label>
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  placeholder="500001"
                  value={sellerData.pincode}
                  onChange={onChangeInput}
                  maxLength="6"
                  required
                />
              </div>
            </div>
          </section>

          <button
            type="submit"
            className="seller-register-submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoaderCircle
                  size={19}
                  className="seller-loading-icon"
                />

                Creating Account...
              </>
            ) : (
              <>
                Create Seller Account

                <ArrowRight size={19} />
              </>
            )}
          </button>

          <p className="seller-register-note">
            By creating an account, you agree to FarmConnect's terms and seller guidelines.
          </p>
        </form>
      </div>
    </div>
  )
}

export default SellerRegister