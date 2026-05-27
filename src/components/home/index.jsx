import {Link} from "react-router-dom"

import Header from "../header"

import "./index.css"

const Home = () => {
  return (
    <>
      <Header />

      <div className="home-container">

        <section className="hero-section">

          <div className="hero-content">

            <h1 className="hero-heading">
              Welcome To FarmConnect
            </h1>

            <p className="hero-description">
              Connecting Farmers and Buyers
              Across India. Buy fresh fruits,
              vegetables, animals and farming
              machines directly from trusted
              farmers.
            </p>

            <div className="buttons-container">

              <Link to="/fruits">
                <button className="shop-button">
                  Explore Products
                </button>
              </Link>

            </div>

          </div>

          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1000"
            alt="farm"
            className="hero-image"
          />

        </section>

        <section className="stats-section">

          <div className="stat-card">
            <h1>1000+</h1>
            <p>Farmers</p>
          </div>

          <div className="stat-card">
            <h1>5000+</h1>
            <p>Products</p>
          </div>

          <div className="stat-card">
            <h1>2500+</h1>
            <p>Orders</p>
          </div>

          <div className="stat-card">
            <h1>24/7</h1>
            <p>Support</p>
          </div>

        </section>

        <h1 className="section-heading">
          Our Categories
        </h1>

        <div className="categories-container">

          <Link to="/fruits" className="category-link">
            <div className="category-card">
              <h1>🍎</h1>
              <h2>Fruits</h2>
            </div>
          </Link>

          <Link to="/vegetables" className="category-link">
            <div className="category-card">
              <h1>🥕</h1>
              <h2>Vegetables</h2>
            </div>
          </Link>

          <Link to="/animals" className="category-link">
            <div className="category-card">
              <h1>🐄</h1>
              <h2>Animals</h2>
            </div>
          </Link>

          <Link to="/machines" className="category-link">
            <div className="category-card">
              <h1>🚜</h1>
              <h2>Machines</h2>
            </div>
          </Link>

        </div>

        <section className="features-section">

          <h1 className="section-heading">
            Why Choose FarmConnect?
          </h1>

          <div className="features-container">

            <div className="feature-card">
              <h2>🌱 Fresh Products</h2>
              <p>
                Directly sourced from farms.
              </p>
            </div>

            <div className="feature-card">
              <h2>🤝 Trusted Farmers</h2>
              <p>
                Buy directly from verified sellers.
              </p>
            </div>

            <div className="feature-card">
              <h2>🚚 Fast Delivery</h2>
              <p>
                Quick and secure transportation.
              </p>
            </div>

            <div className="feature-card">
              <h2>💰 Best Prices</h2>
              <p>
                No middlemen, better savings.
              </p>
            </div>

          </div>

        </section>

        <section className="reviews-section">

          <h1 className="section-heading">
            Customer Reviews
          </h1>

          <div className="reviews-container">

            <div className="review-card">
              <h3>⭐⭐⭐⭐⭐</h3>
              <p>
                Fresh products and easy ordering
                process. Highly recommended.
              </p>
            </div>

            <div className="review-card">
              <h3>⭐⭐⭐⭐⭐</h3>
              <p>
                Excellent platform for connecting
                farmers and buyers.
              </p>
            </div>

            <div className="review-card">
              <h3>⭐⭐⭐⭐⭐</h3>
              <p>
                Great experience purchasing
                farming equipment.
              </p>
            </div>

          </div>

        </section>
   

      <section className="footer-section">

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

            <Link
              to="/about"
              className="footer-link"
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className="footer-link"
            >
              Contact
            </Link>

            <Link
              to="/support"
              className="footer-link"
            >
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

      </section>

      </div>
    </>
  )
}

export default Home
