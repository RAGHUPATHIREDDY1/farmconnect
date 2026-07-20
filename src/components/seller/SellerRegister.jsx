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

const SellerRegister = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [sellerData, setSellerData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    password: "",
    farm_name: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  })

  const onChangeInput = (event) => {
    const { name, value } = event.target
    setSellerData((previousData) => ({
      ...previousData,
      [name]: value
    }))
    setErrorMessage("")
  }

  const onSubmitRegister = async (event) => {
    event.preventDefault()
    setErrorMessage("")
    setSuccessMessage("")
    setIsLoading(true)

    try {
      const response = await fetch("https://farmconnectbackend.onrender.com/api/accounts/seller/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sellerData)
      })

      const data = await response.json()

      if (!response.ok) {
        const firstError = Object.values(data)[0]
        if (Array.isArray(firstError)) {
          setErrorMessage(firstError[0])
        } else if (typeof firstError === "string") {
          setErrorMessage(firstError)
        } else {
          setErrorMessage("Registration failed. Please check your details.")
        }
        return
      }

      setSuccessMessage("Seller account created successfully!")
      setSellerData({
        full_name: "",
        email: "",
        phone_number: "",
        password: "",
        farm_name: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
      })

      setTimeout(() => {
        navigate("/seller/login")
      }, 1500)
    } catch (error) {
      console.error("Registration Error:", error)
      setErrorMessage(error.message || "Unable to connect to the server. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="seller-register-page">
      <div className="seller-register-top">
        <div className="seller-auth-brand">
          <div className="seller-auth-logo">🌾</div>
          <div>
            <h2>FarmConnect</h2>
            <p>Farm To Home</p>
          </div>
        </div>
        <p>Already have an account? <Link to="/seller/login">Login</Link></p>
      </div>

      <div className="seller-register-container">
        <div className="seller-register-heading">
          <div className="seller-auth-icon"><Store size={27} /></div>
          <span>🌱 JOIN FARMCONNECT</span>
          <h1>Start Selling With Us</h1>
          <p>Create your seller account and connect your products with buyers across India.</p>
        </div>

        {errorMessage && <div className="seller-error-message">{errorMessage}</div>}
        {successMessage && <div className="seller-success-message">{successMessage}</div>}

        <form className="seller-register-form" onSubmit={onSubmitRegister}>
          <section className="seller-register-section">
            <div className="seller-register-section-title">
              <User size={21} />
              <div>
                <h2>Personal Information</h2>
                <p>Tell us about yourself.</p>
              </div>
            </div>

            <div className="seller-register-grid">
              <div className="seller-auth-input-group">
                <label>Full Name</label>
                <div className="seller-auth-input-wrapper">
                  <User size={18} />
                  <input type="text" name="full_name" placeholder="Your full name" value={sellerData.full_name} onChange={onChangeInput} required />
                </div>
              </div>

              <div className="seller-auth-input-group">
                <label>Email Address</label>
                <div className="seller-auth-input-wrapper">
                  <Mail size={18} />
                  <input type="email" name="email" placeholder="Your email address" value={sellerData.email} onChange={onChangeInput} required />
                </div>
              </div>

              <div className="seller-auth-input-group">
                <label>Phone Number</label>
                <div className="seller-auth-input-wrapper">
                  <Phone size={18} />
                  <input type="tel" name="phone_number" placeholder="9876543210" value={sellerData.phone_number} onChange={onChangeInput} pattern="[0-9]{10}" required />
                </div>
              </div>

              <div className="seller-auth-input-group">
                <label>Farm / Business Name</label>
                <div className="seller-auth-input-wrapper">
                  <Building2 size={18} />
                  <input type="text" name="farm_name" placeholder="Example: Raghupathi Farms" value={sellerData.farm_name} onChange={onChangeInput} required />
                </div>
              </div>

              <div className="seller-auth-input-group seller-register-full-width">
                <label>Password</label>
                <div className="seller-auth-input-wrapper">
                  <Lock size={18} />
                  <input type={showPassword ? "text" : "password"} name="password" placeholder="Create a strong password" value={sellerData.password} onChange={onChangeInput} minLength="8" required />
                  <button type="button" className="seller-password-toggle" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <small>Password must contain at least 8 characters.</small>
              </div>
            </div>
          </section>

          <section className="seller-register-section">
            <div className="seller-register-section-title">
              <MapPin size={21} />
              <div>
                <h2>Farm & Business Location</h2>
                <p>Tell us where your farm or business is located.</p>
              </div>
            </div>

            <div className="seller-register-grid">
              <div className="seller-auth-input-group seller-register-full-width">
                <label>Complete Address</label>
                <textarea name="address" placeholder="House number, street, farm address..." value={sellerData.address} onChange={onChangeInput} rows="4" required />
              </div>

              <div className="seller-auth-input-group">
                <label>City</label>
                <input type="text" name="city" placeholder="Hyderabad" value={sellerData.city} onChange={onChangeInput} required />
              </div>

              <div className="seller-auth-input-group">
                <label>State</label>
                <input type="text" name="state" placeholder="Telangana" value={sellerData.state} onChange={onChangeInput} required />
              </div>

              <div className="seller-auth-input-group">
                <label>Pincode</label>
                <input type="text" name="pincode" placeholder="500001" value={sellerData.pincode} onChange={onChangeInput} pattern="[0-9]{6}" required />
              </div>
            </div>
          </section>

          <button type="submit" className="seller-register-submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <LoaderCircle size={19} className="seller-loading-icon" />
                Creating Account...
              </>
            ) : (
              <>
                Create Seller Account
                <ArrowRight size={19} />
              </>
            )}
          </button>
          <p className="seller-register-note">By creating an account, you agree to FarmConnect's terms and seller guidelines.</p>
        </form>
      </div>
    </div>
  )
}

export default SellerRegister