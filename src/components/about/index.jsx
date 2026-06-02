import Header from "../header"
import Footer from "../Footer"

import "./index.css"

const About = () => (
  <>
    <Header />

    <div className="about-container">

      <section className="about-hero">

        <h1 className="about-heading">
          🌾 About FarmConnect
        </h1>

        <p className="about-subtitle">
          Bridging the gap between farmers and buyers across India.
        </p>

      </section>

      <section className="about-content">

        <div className="about-card">

          <h2>Our Mission</h2>

          <p>
            FarmConnect is dedicated to empowering farmers by
            connecting them directly with customers. We help
            eliminate unnecessary middlemen, ensuring fair prices
            for farmers and fresh products for buyers.
          </p>

        </div>

        <div className="about-card">

          <h2>Our Vision</h2>

          <p>
            To become India's most trusted agricultural marketplace
            where farmers, buyers, and businesses can connect,
            trade, and grow together.
          </p>

        </div>

        <div className="about-card">

          <h2>Why FarmConnect?</h2>

          <ul>
            <li>🌱 Fresh farm products</li>
            <li>🤝 Trusted farmers</li>
            <li>💰 Fair pricing</li>
            <li>🚚 Fast delivery</li>
            <li>📞 Dedicated support</li>
          </ul>

        </div>

      </section>

      <section className="stats-section">

        <div className="stat-card">
          <h2>1000+</h2>
          <p>Farmers</p>
        </div>

        <div className="stat-card">
          <h2>5000+</h2>
          <p>Products</p>
        </div>

        <div className="stat-card">
          <h2>2500+</h2>
          <p>Customers</p>
        </div>

        <div className="stat-card">
          <h2>24/7</h2>
          <p>Support</p>
        </div>

      </section>

    </div>

    <Footer />
  </>
)

export default About