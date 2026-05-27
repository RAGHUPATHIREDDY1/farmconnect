// src/components/Footer/index.jsx

import {Link} from "react-router-dom"

import "./index.css"

const Footer = () => {
  return (
    <footer className="footer-section">

      <div className="footer-top">

        <div>

          <h2 className="footer-logo">
            FarmConnect
          </h2>

          <p className="footer-description">
            Connecting Farmers & Buyers
            Across India
          </p>

        </div>

        <div className="footer-links">

          <Link to="/about" className="footer-link">
            About Us
          </Link>

          <Link to="/contact" className="footer-link">
            Contact
          </Link>

          <Link to="/support" className="footer-link">
            Support
          </Link>

          <Link
            to="/privacy-policy"
            className="footer-link"
          >
            Privacy Policy
          </Link>

        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 FarmConnect. All Rights Reserved.
      </p>

    </footer>
  )
}

export default Footer