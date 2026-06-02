import { Link } from "react-router-dom";

import "./index.css";

const Footer = () => {
  return (
    <footer className="footer-section">

      <div className="footer-container">

        <div className="footer-brand">

          <h2 className="footer-logo">
            🌾 FarmConnect
          </h2>

          <p className="footer-description">
            Connecting farmers and buyers across India with
            fresh products, trusted livestock, and modern
            farming equipment.
          </p>

        </div>

        <div className="footer-column">

          <h3>Company</h3>

          <Link to="/about" className="footer-link">
            About Us
          </Link>

          <Link to="/contact" className="footer-link">
            Contact
          </Link>

          <Link to="/support" className="footer-link">
            Support
          </Link>

        </div>

        <div className="footer-column">

          <h3>Legal</h3>

          <Link
            to="/privacy-policy"
            className="footer-link"
          >
            Privacy Policy
          </Link>

          <Link
            to="/terms"
            className="footer-link"
          >
            Terms & Conditions
          </Link>

        </div>

        <div className="footer-column">

          <h3>Contact</h3>

          <p>📧 support@farmconnect.com</p>

          <p>📞 +91 93467 70000</p>

          <p>📍 Hyderabad, India</p>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 FarmConnect. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
};

export default Footer;