import {useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import {
  Menu,
  X,
  User,
  ChevronDown,
  Package,
  LogOut,
  ShoppingCart,
  Store
} from "lucide-react"

import "./index.css"

const Header = () => {
  const navigate = useNavigate()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const user = JSON.parse(
    localStorage.getItem("currentUser")
  )

  const userName =
    user?.full_name ||
    user?.fullName ||
    user?.name ||
    "Buyer"

  const userInitial = userName
    .charAt(0)
    .toUpperCase()

  const onClickLogout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("currentUser")

    navigate("/login")
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="navbar">

      {/* Logo */}

      <Link
        to="/"
        className="logo-link"
        onClick={closeMenu}
      >
        <div className="logo-container">

          <div className="logo-icon">
            🌾
          </div>

          <div className="logo-text">

            <h1>
              FarmConnect
            </h1>

            <p>
              Farm To Home
            </p>

          </div>

        </div>
      </Link>


      {/* Desktop Navigation */}

      <nav className="desktop-navigation">

        <Link to="/">
          Home
        </Link>

        <Link to="/fruits">
          Fruits
        </Link>

        <Link to="/vegetables">
          Vegetables
        </Link>

        <Link to="/animals">
          Animals
        </Link>

        <Link to="/machines">
          Machines
        </Link>

        <Link to="/cart">
          <ShoppingCart size={17} />
          Cart
        </Link>

        <Link to="/orders">
          <Package size={17} />
          Orders
        </Link>

      </nav>


      {/* Right Section */}

      <div className="navbar-right">

        {/* Seller Button */}

        <button
          className="seller-button"
          onClick={() =>
            navigate("/seller/dashboard")
          }
        >
          <Store size={17} />
          <span>
            Seller
          </span>
        </button>


        {/* Profile */}

        <div className="profile-container">

          <button
            className="profile-button"
            onClick={() =>
              setIsProfileOpen(
                !isProfileOpen
              )
            }
          >

            <div className="profile-image">
              {userInitial}
            </div>

            <span className="profile-name">
              {userName}
            </span>

            <ChevronDown
              size={16}
            />

          </button>


          {isProfileOpen && (

            <div className="profile-dropdown">

              <div className="dropdown-user">

                <div className="dropdown-image">
                  {userInitial}
                </div>

                <div>

                  <strong>
                    {userName}
                  </strong>

                  <span>
                    Buyer Account
                  </span>

                </div>

              </div>


              <div className="dropdown-line" />


              <button
                onClick={() =>
                  navigate("/profile")
                }
              >
                <User size={17} />
                Profile
              </button>


              <button
                onClick={() =>
                  navigate("/orders")
                }
              >
                <Package size={17} />
                My Orders
              </button>


              <div className="dropdown-line" />


              <button
                className="logout-button"
                onClick={onClickLogout}
              >
                <LogOut size={17} />
                Logout
              </button>

            </div>

          )}

        </div>


        {/* Mobile Menu Button */}

        <button
          className="menu-button"
          onClick={() =>
            setIsMenuOpen(
              !isMenuOpen
            )
          }
        >

          {isMenuOpen ? (
            <X size={25} />
          ) : (
            <Menu size={25} />
          )}

        </button>

      </div>


      {/* Mobile Navigation */}

      {isMenuOpen && (

        <nav className="mobile-navigation">

          <Link
            to="/"
            onClick={closeMenu}
          >
            Home
          </Link>

          <Link
            to="/fruits"
            onClick={closeMenu}
          >
            Fruits
          </Link>

          <Link
            to="/vegetables"
            onClick={closeMenu}
          >
            Vegetables
          </Link>

          <Link
            to="/animals"
            onClick={closeMenu}
          >
            Animals
          </Link>

          <Link
            to="/machines"
            onClick={closeMenu}
          >
            Machines
          </Link>

          <Link
            to="/cart"
            onClick={closeMenu}
          >
            🛒 Cart
          </Link>

          <Link
            to="/orders"
            onClick={closeMenu}
          >
            📦 Orders
          </Link>
          <Link
    to="/ai-assistant"
    className="flex items-center gap-2"
>
    <Sparkles size={18} />
    FarmConnect AI
</Link>
        </nav>

      )}

    </header>
  )
}

export default Header