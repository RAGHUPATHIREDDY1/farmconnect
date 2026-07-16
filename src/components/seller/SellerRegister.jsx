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
  Image,
  ArrowRight
} from "lucide-react"

import "./seller.css"

const SellerRegister = () => {

  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)

  const [sellerData, setSellerData] = useState({

    fullName: "",
    email: "",
    phone: "",
    password: "",

    profileImage: "",

    farmName: "",
    sellerType: "",
    experience: "",

    address: "",
    village: "",
    city: "",
    state: "",
    pincode: "",

    farmLocation: ""

  })


  const onChangeInput = event => {

    const { name, value } = event.target

    setSellerData(previousData => ({

      ...previousData,

      [name]: value

    }))

  }


  const onSubmitRegister = event => {

    event.preventDefault()


    const existingSellers =
      JSON.parse(
        localStorage.getItem("farmConnectSellers")
      ) || []


    const sellerAlreadyExists =
      existingSellers.some(
        seller =>
          seller.email === sellerData.email
      )


    if (sellerAlreadyExists) {

      alert(
        "Seller account already exists with this email"
      )

      return

    }


    const newSeller = {

      id: Date.now(),

      ...sellerData,

      role: "seller",

      createdAt: new Date().toISOString()

    }


    localStorage.setItem(

      "farmConnectSellers",

      JSON.stringify([

        ...existingSellers,

        newSeller

      ])

    )


    localStorage.setItem(

      "currentSeller",

      JSON.stringify(newSeller)

    )


    alert(
      "Seller account created successfully!"
    )


    navigate("/seller/dashboard")

  }


  return (

    <div className="seller-register-page">


      {/* Top Brand */}

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


        {/* Heading */}

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
            Create your seller account and connect your
            products with buyers across India.
          </p>

        </div>


        <form
          className="seller-register-form"
          onSubmit={onSubmitRegister}
        >


          {/* Personal Information */}

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
                    name="fullName"
                    placeholder="Your full name"
                    value={sellerData.fullName}
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
                    name="phone"
                    placeholder="Your phone number"
                    value={sellerData.phone}
                    onChange={onChangeInput}
                    required
                  />

                </div>

              </div>


              <div className="seller-auth-input-group">

                <label>
                  Profile Image URL
                </label>

                <div className="seller-auth-input-wrapper">

                  <Image size={18} />

                  <input
                    type="url"
                    name="profileImage"
                    placeholder="https://image-url.com/profile.jpg"
                    value={sellerData.profileImage}
                    onChange={onChangeInput}
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
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Create a strong password"
                    value={sellerData.password}
                    onChange={onChangeInput}
                    minLength="6"
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

            </div>

          </section>


          {/* Farm Information */}

          <section className="seller-register-section">

            <div className="seller-register-section-title">

              <Building2 size={21} />

              <div>

                <h2>
                  Farm & Business Information
                </h2>

                <p>
                  Tell buyers about your farm or business.
                </p>

              </div>

            </div>


            <div className="seller-register-grid">


              <div className="seller-auth-input-group">

                <label>
                  Farm / Business Name
                </label>

                <div className="seller-auth-input-wrapper">

                  <Store size={18} />

                  <input
                    type="text"
                    name="farmName"
                    placeholder="Example: Raghupathi Farms"
                    value={sellerData.farmName}
                    onChange={onChangeInput}
                    required
                  />

                </div>

              </div>


              <div className="seller-auth-input-group">

                <label>
                  Seller Type
                </label>

                <select
                  name="sellerType"
                  value={sellerData.sellerType}
                  onChange={onChangeInput}
                  required
                >

                  <option value="">
                    Select seller type
                  </option>

                  <option value="farmer">
                    👨‍🌾 Farmer
                  </option>

                  <option value="farm-business">
                    🌾 Farm Business
                  </option>

                  <option value="supplier">
                    📦 Supplier
                  </option>

                  <option value="equipment-dealer">
                    🚜 Equipment Dealer
                  </option>

                </select>

              </div>


              <div className="seller-auth-input-group">

                <label>
                  Years of Experience
                </label>

                <input
                  type="number"
                  name="experience"
                  placeholder="Example: 5"
                  value={sellerData.experience}
                  onChange={onChangeInput}
                  min="0"
                  required
                />

              </div>

            </div>

          </section>


          {/* Address */}

          <section className="seller-register-section">

            <div className="seller-register-section-title">

              <MapPin size={21} />

              <div>

                <h2>
                  Farm & Business Location
                </h2>

                <p>
                  This helps buyers know where your products come from.
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
                  rows="3"
                  required
                />

              </div>


              <div className="seller-auth-input-group">

                <label>
                  Village / Area
                </label>

                <input
                  type="text"
                  name="village"
                  placeholder="Village or area"
                  value={sellerData.village}
                  onChange={onChangeInput}
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
                  placeholder="City"
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
                  placeholder="State"
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
                  placeholder="6-digit pincode"
                  value={sellerData.pincode}
                  onChange={onChangeInput}
                  pattern="[0-9]{6}"
                  required
                />

              </div>


              <div className="seller-auth-input-group seller-register-full-width">

                <label>
                  Farm Location
                </label>

                <div className="seller-auth-input-wrapper">

                  <MapPin size={18} />

                  <input
                    type="text"
                    name="farmLocation"
                    placeholder="Example: Near Hyderabad, Telangana"
                    value={sellerData.farmLocation}
                    onChange={onChangeInput}
                    required
                  />

                </div>

              </div>

            </div>

          </section>


          {/* Submit */}

          <button
            type="submit"
            className="seller-register-submit"
          >

            Create Seller Account

            <ArrowRight size={19} />

          </button>


          <p className="seller-register-note">

            By creating an account, you agree to FarmConnect's
            terms and seller guidelines.

          </p>

        </form>

      </div>

    </div>

  )

}

export default SellerRegister