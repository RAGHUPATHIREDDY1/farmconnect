import { Link } from "react-router-dom";
import Header from "../header";

import "./index.css";

const Home = () => {
  return (
    <>
      <Header />

      <div className="home-container">

        {/* Hero Section */}

        <section className="hero-section">

          <div className="hero-content">

            <h1 className="hero-heading">
              Fresh From Farms To Your Doorstep
            </h1>

            <p className="hero-description">
              Buy fresh fruits, vegetables, livestock and farming
              equipment directly from trusted farmers across India.
              Quality products, fair prices and direct farm connections.
            </p>

            <div className="buttons-container">

              <Link to="/fruits">
                <button className="shop-button">
                  Shop Now
                </button>
              </Link>

              <Link to="/about">
                <button className="learn-button">
                  Learn More
                </button>
              </Link>

            </div>

            <div className="hero-stats">

              <div>
                <h3>1000+</h3>
                <p>Farmers</p>
              </div>

              <div>
                <h3>5000+</h3>
                <p>Products</p>
              </div>

              <div>
                <h3>2500+</h3>
                <p>Orders</p>
              </div>

            </div>

          </div>

          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1000"
            alt="farm"
            className="hero-image"
          />

        </section>

        {/* Statistics */}

        <section className="stats-section">

          <div className="stat-card">
            <h1>1000+</h1>
            <p>Verified Farmers</p>
          </div>

          <div className="stat-card">
            <h1>5000+</h1>
            <p>Products Listed</p>
          </div>

          <div className="stat-card">
            <h1>2500+</h1>
            <p>Happy Customers</p>
          </div>

          <div className="stat-card">
            <h1>24/7</h1>
            <p>Customer Support</p>
          </div>

        </section>

        {/* Categories */}

        <h1 className="section-heading">
          Explore Categories
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

        {/* Why Choose Us */}

        <section className="features-section">

          <h1 className="section-heading">
            Why Choose FarmConnect?
          </h1>

          <div className="features-container">

            <div className="feature-card">
              <h2>🌱 Fresh Products</h2>
              <p>
                Directly sourced from farms for guaranteed freshness.
              </p>
            </div>

            <div className="feature-card">
              <h2>🤝 Trusted Farmers</h2>
              <p>
                Verified sellers providing quality products.
              </p>
            </div>

            <div className="feature-card">
              <h2>🚚 Fast Delivery</h2>
              <p>
                Quick and secure transportation nationwide.
              </p>
            </div>

            <div className="feature-card">
              <h2>💰 Best Prices</h2>
              <p>
                Direct farmer-to-buyer pricing without middlemen.
              </p>
            </div>

          </div>

        </section>

        {/* Reviews */}

        <section className="reviews-section">

          <h1 className="section-heading">
            What Customers Say
          </h1>

          <div className="reviews-container">

            <div className="review-card">
              <h3>⭐⭐⭐⭐⭐</h3>
              <p>
                Fresh products and fast delivery. FarmConnect
                has become my preferred marketplace.
              </p>
            </div>

            <div className="review-card">
              <h3>⭐⭐⭐⭐⭐</h3>
              <p>
                Great platform connecting farmers directly with
                customers. Excellent quality products.
              </p>
            </div>

            <div className="review-card">
              <h3>⭐⭐⭐⭐⭐</h3>
              <p>
                Easy ordering process and transparent pricing.
                Highly recommended.
              </p>
            </div>

          </div>

        </section>

        {/* Offer Banner */}

        <section className="offer-section">

          <div className="offer-card">

            <h2>
              🎉 Special Seasonal Offer
            </h2>

            <p>
              Get up to 20% discount on selected fruits and
              vegetables this week.
            </p>

            <Link to="/fruits">
              <button className="shop-button">
                Shop Offers
              </button>
            </Link>

          </div>

        </section>

        {/* Footer */}

        <section className="footer-section">

          <div className="footer-top">

            <div>

              <h2 className="footer-logo">
                🌾 FarmConnect
              </h2>

              <p className="footer-description">
                Connecting Farmers & Buyers Across India.
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
  );
};

export default Home;