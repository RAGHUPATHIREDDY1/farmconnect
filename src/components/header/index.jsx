import { Link, useNavigate } from "react-router-dom";
import "./index.css";

const Header = () => {
  const navigate = useNavigate();

  const onClickLogout = () => {
    localStorage.removeItem("loggedUser");
    navigate("/login");
  };

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
        type="button"
        className="logout-button"
        onClick={onClickLogout}
      >
        Logout
      </button>

    </nav>
  );
};

export default Header;