import {useState} from "react"
import {useNavigate, Link} from "react-router-dom"
import API_BASE_URL from "../../config/api"
import "./index.css"

const INITIAL_FORM_DATA = {
  full_name: "",
  email: "",
  password: "",
  confirm_password: "",
  phone_number: "",
  address: "",
  city: "",
  state: "",
  pincode: ""
}

const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] =
    useState(INITIAL_FORM_DATA)

  const [errorMsg, setErrorMsg] =
    useState("")

  const [successMsg, setSuccessMsg] =
    useState("")

  const [isLoading, setIsLoading] =
    useState(false)

  const onChangeInput = event => {
    const {
      name,
      value
    } = event.target

    setFormData(previousData => ({
      ...previousData,
      [name]: value
    }))
  }

  const getBackendError = data => {
    if (!data) {
      return ""
    }

    if (typeof data === "string") {
      return data
    }

    return Object.values(data)
      .flat()
      .join(" ")
  }

  const onSubmitForm = async event => {
    event.preventDefault()

    setErrorMsg("")
    setSuccessMsg("")

    const {
      full_name,
      email,
      password,
      confirm_password,
      phone_number,
      address,
      city,
      state,
      pincode
    } = formData

    if (
      !full_name.trim() ||
      !email.trim() ||
      !password ||
      !confirm_password ||
      !phone_number.trim() ||
      !address.trim() ||
      !city.trim() ||
      !state.trim() ||
      !pincode.trim()
    ) {
      setErrorMsg(
        "Please fill all fields."
      )

      return
    }

    if (password.length < 8) {
      setErrorMsg(
        "Password must contain at least 8 characters."
      )

      return
    }

    if (password !== confirm_password) {
      setErrorMsg(
        "Passwords do not match."
      )

      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/accounts/buyer/register/`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Accept:
              "application/json"
          },

          body: JSON.stringify({
            full_name:
              full_name.trim(),

            email:
              email.toLowerCase().trim(),

            password,

            phone_number:
              phone_number.trim(),

            address:
              address.trim(),

            city:
              city.trim(),

            state:
              state.trim(),

            pincode:
              pincode.trim()
          })
        }
      )

      const data =
        await response.json()

      if (!response.ok) {
        const backendError =
          getBackendError(data)

        setErrorMsg(
          backendError ||
            "Registration failed. Please try again."
        )

        return
      }

      setSuccessMsg(
        "Buyer account created successfully! Redirecting to login..."
      )

      setFormData(
        INITIAL_FORM_DATA
      )

      setTimeout(() => {
        navigate("/login")
      }, 1500)
    } catch (error) {
      console.error(
        "Registration Error:",
        error
      )

      setErrorMsg(
        "Unable to connect to the FarmConnect server. Please try again."
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="register-main-container">
      <div className="register-card">
        <div className="register-left-section">
          <h1 className="register-heading">
            🌾 FarmConnect
          </h1>

          <p className="register-description">
            Create your buyer account and purchase
            fresh products directly from trusted farmers.
          </p>

          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1000"
            alt="Farm"
            className="register-image"
          />
        </div>

        <div className="register-right-section">
          <h1 className="form-heading">
            Create Buyer Account
          </h1>

          <p>
            Join FarmConnect today
          </p>

          <form
            className="register-form"
            onSubmit={onSubmitForm}
          >
            <label className="label">
              Full Name
            </label>

            <input
              type="text"
              name="full_name"
              className="input"
              placeholder="Enter your full name"
              value={
                formData.full_name
              }
              onChange={
                onChangeInput
              }
            />

            <label className="label">
              Email
            </label>

            <input
              type="email"
              name="email"
              className="input"
              placeholder="Enter your email"
              value={
                formData.email
              }
              onChange={
                onChangeInput
              }
            />

            <label className="label">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone_number"
              className="input"
              placeholder="Enter phone number"
              value={
                formData.phone_number
              }
              onChange={
                onChangeInput
              }
            />

            <label className="label">
              Address
            </label>

            <input
              type="text"
              name="address"
              className="input"
              placeholder="Enter your address"
              value={
                formData.address
              }
              onChange={
                onChangeInput
              }
            />

            <label className="label">
              City
            </label>

            <input
              type="text"
              name="city"
              className="input"
              placeholder="Enter city"
              value={
                formData.city
              }
              onChange={
                onChangeInput
              }
            />

            <label className="label">
              State
            </label>

            <input
              type="text"
              name="state"
              className="input"
              placeholder="Enter state"
              value={
                formData.state
              }
              onChange={
                onChangeInput
              }
            />

            <label className="label">
              Pincode
            </label>

            <input
              type="text"
              name="pincode"
              className="input"
              placeholder="Enter pincode"
              value={
                formData.pincode
              }
              onChange={
                onChangeInput
              }
            />

            <label className="label">
              Password
            </label>

            <input
              type="password"
              name="password"
              className="input"
              placeholder="Enter password"
              value={
                formData.password
              }
              onChange={
                onChangeInput
              }
            />

            <label className="label">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirm_password"
              className="input"
              placeholder="Confirm password"
              value={
                formData.confirm_password
              }
              onChange={
                onChangeInput
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
              disabled={isLoading}
            >
              {isLoading
                ? "Creating Account..."
                : "Create Account"}
            </button>

            <p className="login-text">
              Already have an account?

              <Link
                to="/login"
                className="link"
              >
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