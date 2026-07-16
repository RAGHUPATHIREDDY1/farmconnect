import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  User,
  ChevronDown,
  Package,
  LogOut
} from "lucide-react"
import "./index.css";

const Header = () => {
  const navigate = useNavigate();
  const [
  isProfileOpen,
  setIsProfileOpen
] = useState(false)
  const onClickLogout = () => {
    localStorage.removeItem("loggedUser");
    navigate("/login");
  };
   const user =
    JSON.parse(
      localStorage.getItem("currentUser")
    )


  const userName =
  user?.fullName ||
  user?.name ||
  "Buyer"

const userInitial =
  userName
    .charAt(0)
    .toUpperCase()


  return (
    <nav className="navbar">

      <Link to="/" className="logo-link">
        <div className="logo-container">
          <span className="logo-icon">🌾</span>

          <div>
            <h1 className="logo-heading">
              FarmConnect
            </h1>

            <p className="logo-tagline">
              Farm To Home
            </p>
          </div>
        </div>
      </Link>

      <ul className="nav-items-container">

        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li>
          <Link to="/fruits" className="nav-link">
            Fruits
          </Link>
        </li>

        <li>
          <Link to="/vegetables" className="nav-link">
            Vegetables
          </Link>
        </li>

        <li>
          <Link to="/animals" className="nav-link">
            Animals
          </Link>
        </li>

        <li>
          <Link to="/machines" className="nav-link">
            Machines
          </Link>
        </li>

        <li>
          <Link to="/cart" className="nav-link">
            🛒 Cart
          </Link>
        </li>

        <li>
          <Link to="/orders" className="nav-link">
            Orders
          </Link>
        </li>

      </ul>
      <button
          className="account-switch-btn"
          onClick={() => navigate("/seller/dashboard")}
         >
          <span>🌾</span>
          <span>Seller</span>
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


    <span>
      {userName}
    </span>


    <ChevronDown size={15} />

  </button>


  {isProfileOpen && (

    <div className="profile-dropdown">


      {/* User Information */}

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


      {/* Profile */}

      <button
        onClick={() =>
          navigate(
            "/profile"
          )
        }
      >

        <User size={17} />

        Profile

      </button>


      {/* My Orders */}

      <button
        onClick={() =>
          navigate(
            "/orders"
          )
        }
      >

        <Package size={17} />

        My Orders

      </button>


      <div className="dropdown-line" />


      {/* Logout */}

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

    </nav>
  );
};

export default Header;