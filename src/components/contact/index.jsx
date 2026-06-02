import Header from "../header"
import Footer from "../Footer"

import "./index.css"

const Contact = () => (
  <>
    <Header />

    <div className="contact-container">

      <section className="contact-hero">

        <h1 className="contact-heading">
          📞 Contact Us
        </h1>

        <p className="contact-subtitle">
          We'd love to hear from you. Get in touch with our team.
        </p>

      </section>

      <section className="contact-content">

        <div className="contact-card">

          <h2>📧 Email</h2>

          <p>
            support@farmconnect.com
          </p>

        </div>

        <div className="contact-card">

          <h2>📱 Phone</h2>

          <p>
            +91 93467 70000
          </p>

        </div>

        <div className="contact-card">

          <h2>📍 Location</h2>

          <p>
            Hyderabad, Telangana, India
          </p>

        </div>

      </section>

      <section className="message-section">

        <div className="message-card">

          <h2>Send Us A Message</h2>

          <form>

            <input
              type="text"
              placeholder="Your Name"
              className="input-field"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="input-field"
            />

            <textarea
              placeholder="Your Message"
              className="textarea-field"
              rows="5"
            />

            <button
              type="submit"
              className="send-btn"
            >
              Send Message
            </button>

          </form>

        </div>

      </section>

    </div>

    <Footer />
  </>
)

export default Contact