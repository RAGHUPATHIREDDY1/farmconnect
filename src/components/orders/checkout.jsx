import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import {
  MapPin,
  CreditCard,
  Banknote,
  ArrowLeft,
  ShoppingBag,
  CheckCircle,
  Loader,
  ShieldCheck,
  Truck,
  AlertCircle
} from "lucide-react"
import Header from "../header"
import Footer from "../Footer"
import API_BASE_URL from "../../config/api"
import "./index.css"

const API_URL = `${API_BASE_URL}/api/orders`

const Checkout = () => {
  const navigate = useNavigate()

  const [cart, setCart] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    payment_method: "COD"
  })

  const getAccessToken = () => {
    return localStorage.getItem("accessToken")
  }

  const logoutUser = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("user")

    navigate("/login")
  }

  const loadUserDetails = () => {
    const storedUser =
      localStorage.getItem("currentUser") ||
      localStorage.getItem("user")

    if (!storedUser) {
      return
    }

    try {
      const user = JSON.parse(storedUser)

      setFormData(previousData => ({
        ...previousData,

        full_name:
          user.full_name ||
          user.fullName ||
          user.name ||
          "",

        phone_number:
          user.phone_number ||
          user.phoneNumber ||
          user.phone ||
          "",

        address:
          user.address ||
          user.delivery_address ||
          "",

        city: user.city || "",

        state: user.state || "",

        pincode:
          user.pincode ||
          user.pin_code ||
          ""
      }))
    } catch (error) {
      console.error(
        "User data error:",
        error
      )
    }
  }

  const fetchCart = async () => {
    const accessToken = getAccessToken()

    if (!accessToken) {
      navigate("/login")
      return
    }

    try {
      setIsLoading(true)
      setErrorMessage("")

      const response = await fetch(
        `${API_URL}/cart/`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        }
      )

      const data = await response.json()

      if (response.status === 401) {
        logoutUser()
        return
      }

      if (!response.ok) {
        setErrorMessage(
          data.detail ||
            data.error ||
            "Unable to load your cart."
        )

        return
      }

      if (
        !data.items ||
        data.items.length === 0
      ) {
        navigate("/cart")
        return
      }

      setCart(data)
      loadUserDetails()
    } catch (error) {
      console.error(
        "Fetch cart error:",
        error
      )

      setErrorMessage(
        "Unable to connect to the server."
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  const handleChange = event => {
    const {
      name,
      value
    } = event.target

    setFormData(previousData => ({
      ...previousData,
      [name]: value
    }))

    setErrorMessage("")
  }

  const validateForm = () => {
    const phoneRegex =
      /^[6-9]\d{9}$/

    const pincodeRegex =
      /^\d{6}$/

    if (
      !formData.full_name.trim()
    ) {
      return "Please enter your full name."
    }

    if (
      !phoneRegex.test(
        formData.phone_number.trim()
      )
    ) {
      return "Please enter a valid 10-digit Indian phone number."
    }

    if (
      !formData.address.trim()
    ) {
      return "Address is required."
    }

    if (
      !formData.city.trim()
    ) {
      return "Please enter your city."
    }

    if (
      !formData.state.trim()
    ) {
      return "Please enter your state."
    }

    if (
      !pincodeRegex.test(
        formData.pincode.trim()
      )
    ) {
      return "Please enter a valid 6-digit pincode."
    }

    return null
  }

  const handleSubmit = async event => {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    const validationError =
      validateForm()

    if (validationError) {
      setErrorMessage(
        validationError
      )

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })

      return
    }

    const accessToken =
      getAccessToken()

    if (!accessToken) {
      navigate("/login")
      return
    }

    try {
      setIsSubmitting(true)
      setErrorMessage("")

      const orderData = {
        full_name:
          formData.full_name.trim(),

        phone_number:
          formData.phone_number.trim(),

        address:
          formData.address.trim(),

        city:
          formData.city.trim(),

        state:
          formData.state.trim(),

        pincode:
          formData.pincode.trim(),

        payment_method:
          formData.payment_method
      }

      console.log(
        "Sending Order Data:",
        orderData
      )

      const response = await fetch(
        `${API_URL}/checkout/`,
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            Accept: "application/json"
          },

          body: JSON.stringify(
            orderData
          )
        }
      )

      const data =
        await response.json()

      console.log(
        "Checkout Response:",
        data
      )

      if (response.status === 401) {
        logoutUser()
        return
      }

      if (!response.ok) {
        let message =
          "Unable to place order."

        if (data.detail) {
          message =
            data.detail
        } else if (data.error) {
          message =
            data.error
        } else {
          message =
            Object.entries(data)
              .map(
                ([
                  field,
                  errors
                ]) => {
                  const errorText =
                    Array.isArray(
                      errors
                    )
                      ? errors.join(
                          ", "
                        )
                      : errors

                  return `${field}: ${errorText}`
                }
              )
              .join(" | ")
        }

        setErrorMessage(message)
        return
      }

      const createdOrder =
        data.order || data

      localStorage.setItem(
        "latestOrder",
        JSON.stringify(
          createdOrder
        )
      )

      navigate("/orders")
    } catch (error) {
      console.error(
        "Place order error:",
        error
      )

      setErrorMessage(
        "Unable to connect to FarmConnect server."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <>
        <Header />

        <main className="checkout-loading">
          <Loader
            size={40}
            className="loading-icon"
          />

          <h2>
            Preparing Checkout
          </h2>

          <p>
            Please wait while we load your cart.
          </p>
        </main>

        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />

      <main className="checkout-page">
        <section className="checkout-top">
          <button
            className="back-button"
            onClick={() =>
              navigate("/cart")
            }
          >
            <ArrowLeft size={18} />
            Back to Cart
          </button>

          <div className="checkout-title">
            <div className="checkout-title-icon">
              <ShoppingBag size={27} />
            </div>

            <div>
              <h1>
                Checkout
              </h1>

              <p>
                Complete your order securely
              </p>
            </div>
          </div>
        </section>

        {errorMessage && (
          <div className="checkout-error">
            <AlertCircle size={20} />

            <span>
              {errorMessage}
            </span>
          </div>
        )}

        <div className="checkout-layout">
          <section className="checkout-form-card">
            <div className="checkout-card-heading">
              <MapPin size={23} />

              <div>
                <h2>
                  Delivery Information
                </h2>

                <p>
                  Where should we deliver your order?
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
            >
              <div className="form-grid">
                <div className="form-group">
                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="full_name"
                    value={
                      formData.full_name
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label>
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone_number"
                    value={
                      formData.phone_number
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="10-digit phone number"
                    maxLength="10"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>
                  Complete Address
                </label>

                <textarea
                  name="address"
                  value={
                    formData.address
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="House number, street, village or area"
                  rows="4"
                />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={
                      formData.city
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter city"
                  />
                </div>

                <div className="form-group">
                  <label>
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={
                      formData.state
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter state"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  value={
                    formData.pincode
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="6-digit pincode"
                  maxLength="6"
                />
              </div>

              <div className="payment-section">
                <div className="checkout-card-heading">
                  <CreditCard size={23} />

                  <div>
                    <h2>
                      Payment Method
                    </h2>

                    <p>
                      Select your preferred payment option
                    </p>
                  </div>
                </div>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment_method"
                    value="COD"
                    checked={
                      formData.payment_method ===
                      "COD"
                    }
                    onChange={
                      handleChange
                    }
                  />

                  <Banknote size={25} />

                  <div>
                    <strong>
                      Cash on Delivery
                    </strong>

                    <span>
                      Pay when your order arrives
                    </span>
                  </div>

                  <CheckCircle
                    size={20}
                    className="selected-icon"
                  />
                </label>
              </div>

              <button
                type="submit"
                className="place-order-button"
                disabled={
                  isSubmitting
                }
              >
                {isSubmitting ? (
                  <>
                    <Loader
                      size={19}
                      className="button-loader"
                    />

                    Placing Order...
                  </>
                ) : (
                  <>
                    Place Order

                    <CheckCircle
                      size={19}
                    />
                  </>
                )}
              </button>

              <div className="checkout-security">
                <ShieldCheck size={17} />

                <span>
                  Your information is securely protected
                </span>
              </div>
            </form>
          </section>

          <aside className="checkout-summary-card">
            <div className="summary-header">
              <h2>
                Order Summary
              </h2>

              <span>
                {cart?.items?.length ||
                  0}{" "}
                items
              </span>
            </div>

            <div className="checkout-items">
              {cart?.items?.map(
                item => (
                  <div
                    className="checkout-item"
                    key={item.id}
                  >
                    <img
                      src={
                        item.product
                          .image_url
                      }
                      alt={
                        item.product
                          .name
                      }
                    />

                    <div className="checkout-item-info">
                      <strong>
                        {
                          item.product
                            .name
                        }
                      </strong>

                      <span>
                        Qty:{" "}
                        {
                          item.quantity
                        }
                      </span>
                    </div>

                    <strong>
                      ₹
                      {Number(
                        item.subtotal ||
                          0
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </strong>
                  </div>
                )
              )}
            </div>

            <div className="summary-line">
              <span>
                Subtotal
              </span>

              <strong>
                ₹
                {Number(
                  cart?.total_amount ||
                    0
                ).toLocaleString(
                  "en-IN"
                )}
              </strong>
            </div>

            <div className="summary-line">
              <span>
                Delivery
              </span>

              <strong className="free">
                FREE
              </strong>
            </div>

            <div className="summary-total">
              <span>
                Total
              </span>

              <strong>
                ₹
                {Number(
                  cart?.total_amount ||
                    0
                ).toLocaleString(
                  "en-IN"
                )}
              </strong>
            </div>

            <div className="delivery-note">
              <Truck size={19} />

              <span>
                Free delivery to your address
              </span>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default Checkout