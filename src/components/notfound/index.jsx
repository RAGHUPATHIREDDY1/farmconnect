import {Link} from "react-router-dom"

import "./index.css"

const NotFound = () => (
  <div className="not-found-container">

    <img
      src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
      alt="not found"
      className="not-found-image"
    />

    <h1 className="not-found-heading">
      Page Not Found
    </h1>

    <p className="not-found-description">
      Sorry, the page you are looking for
      does not exist.
    </p>

    <Link to="/">
      <button className="home-button">
        Go To Home
      </button>
    </Link>

  </div>
)

export default NotFound