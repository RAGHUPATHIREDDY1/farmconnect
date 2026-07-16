import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

import {
  Menu,
  X,
  Package,
  ShoppingBag,
  User,
  LogOut,
  ChevronDown,
  Store
} from "lucide-react"

import "./seller.css"

const SellerHeader = () => {

  const navigate = useNavigate()

  const location = useLocation()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [isProfileOpen, setIsProfileOpen] = useState(false)


  const seller =
    JSON.parse(
      localStorage.getItem("currentSeller")
    )


  const sellerName =
    seller?.fullName ||
    seller?.name ||
    "Seller"


  const sellerImage =
    seller?.profileImage ||
    ""


  const onLogout = () => {

    localStorage.removeItem(
      "currentSeller"
    )

    navigate("/seller/login")

  }


  const goToBuyer = () => {

    navigate("/")

  }


  return (

    <header className="seller-header">

      <div className="seller-header-container">


        {/* Logo */}

        <Link
          to="/seller/dashboard"
          className="seller-header-logo"
        >

          <div className="seller-header-logo-icon">
            🌾
          </div>

          <div>

            <h1>
              FarmConnect
            </h1>

            <p>
              Seller Center
            </p>

          </div>

        </Link>


        {/* Desktop Navigation */}

        <nav className="seller-header-nav">


          <Link
            to="/seller/dashboard"
            className={
              location.pathname ===
              "/seller/dashboard"
                ? "seller-nav-active"
                : ""
            }
          >

            Home

          </Link>


          <Link
            to="/seller/products"
            className={
              location.pathname.includes(
                "/seller/products"
              )
                ? "seller-nav-active"
                : ""
            }
          >

            <Package size={17} />

            My Products

          </Link>


          <Link
            to="/seller/orders"
            className={
              location.pathname.includes(
                "/seller/orders"
              )
                ? "seller-nav-active"
                : ""
            }
          >

            <ShoppingBag size={17} />

            Orders

          </Link>


          <Link
            to="/seller/add-product"
            className={
              location.pathname.includes(
                "/seller/add-product"
              )
                ? "seller-nav-active"
                : ""
            }
          >

            Add Product

          </Link>

        </nav>


        {/* Right Side */}

        <div className="seller-header-right">


          {/* Switch To Buyer */}

          <button
            className="seller-switch-buyer"
            onClick={goToBuyer}
          >

            🛒 Buyer

          </button>


          {/* Profile */}

          <div className="seller-profile-container">

            <button
              className="seller-profile-button"
              onClick={() =>
                setIsProfileOpen(
                  !isProfileOpen
                )
              }
            >

              <div className="seller-profile-image">

                {sellerImage ? (

                  <img
                    src={sellerImage}
                    alt={sellerName}
                  />

                ) : (

                  <User size={18} />

                )}

              </div>


              <span>
                {sellerName}
              </span>


              <ChevronDown size={15} />

            </button>


            {isProfileOpen && (

              <div className="seller-profile-dropdown">


                <div className="seller-dropdown-user">

                  <div className="seller-dropdown-image">

                    {sellerImage ? (

                      <img
                        src={sellerImage}
                        alt={sellerName}
                      />

                    ) : (

                      <User size={20} />

                    )}

                  </div>


                  <div>

                    <strong>
                      {sellerName}
                    </strong>

                    <span>
                      Seller Account
                    </span>

                  </div>

                </div>


                <div className="seller-dropdown-line" />


                <button
                  onClick={() =>
                    navigate(
                      "/seller/profile"
                    )
                  }
                >

                  <User size={17} />

                  Profile

                </button>


                <button
                  onClick={() =>
                    navigate(
                      "/seller/products"
                    )
                  }
                >

                  <Package size={17} />

                  My Products

                </button>


                <div className="seller-dropdown-line" />


                <button
                  className="seller-logout-button"
                  onClick={onLogout}
                >

                  <LogOut size={17} />

                  Logout

                </button>

              </div>

            )}

          </div>


          {/* Mobile Menu */}

          <button
            className="seller-mobile-menu"
            onClick={() =>
              setIsMenuOpen(
                !isMenuOpen
              )
            }
          >

            {isMenuOpen ? (

              <X size={24} />

            ) : (

              <Menu size={24} />

            )}

          </button>

        </div>

      </div>


      {/* Mobile Navigation */}

      {isMenuOpen && (

        <div className="seller-mobile-navigation">


          <Link
            to="/seller/dashboard"
            onClick={() =>
              setIsMenuOpen(false)
            }
          >

            🏠 Dashboard

          </Link>


          <Link
            to="/seller/products"
            onClick={() =>
              setIsMenuOpen(false)
            }
          >

            📦 My Products

          </Link>


          <Link
            to="/seller/orders"
            onClick={() =>
              setIsMenuOpen(false)
            }
          >

            🛒 Orders

          </Link>


          <Link
            to="/seller/add-product"
            onClick={() =>
              setIsMenuOpen(false)
            }
          >

            ➕ Add Product

          </Link>


          <button
            onClick={goToBuyer}
          >

            🛍️ Switch To Buyer

          </button>


          <button
            className="seller-mobile-logout"
            onClick={onLogout}
          >

            🚪 Logout

          </button>

        </div>

      )}

    </header>

  )

}

export default SellerHeader