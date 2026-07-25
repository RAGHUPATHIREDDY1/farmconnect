import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import Header from "../header"
import Footer from "../footer"
import API_BASE_URL from "../../config/api"
import "./index.css"

const Fruits = () => {
  const [fruitsList, setFruitsList] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    const getFruitsData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/products/?category=FRUIT`
        )

        if (!response.ok) {
          throw new Error("Unable to load fruits")
        }

        const data = await response.json()

        setFruitsList(
          Array.isArray(data)
            ? data
            : data.results || []
        )
      } catch (error) {
        console.error("Fruits Error:", error)
        setErrorMessage(
          "Unable to connect to the server. Please try again."
        )
      } finally {
        setIsLoading(false)
      }
    }

    getFruitsData()
  }, [])

  const onClickBuy = async eachProduct => {
    const accessToken = localStorage.getItem("accessToken")

    if (!accessToken) {
      alert("Please login as a buyer first.")
      navigate("/login")
      return
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/orders/cart/add/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            product_id: eachProduct.id,
            quantity: 1,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || "Unable to add product to cart.")
        return
      }

      alert(`${eachProduct.name} added to cart successfully.`)
    } catch (error) {
      console.error("Add To Cart Error:", error)
      alert("Unable to connect to the server.")
    }
  }

  const filteredList = fruitsList.filter(eachFruit =>
    eachFruit.name
      ?.toLowerCase()
      .includes(searchInput.toLowerCase())
  )

  return (
    <>
      <Header />

      <div className="fruits-container">
        <section className="fruits-hero">
          <h1 className="main-heading">
            🍎 Fresh Fruits Collection
          </h1>

          <p className="hero-subtitle">
            Handpicked fresh fruits directly from trusted farmers.
          </p>
        </section>

        <div className="search-container">
          <input
            type="search"
            placeholder="Search Fresh Fruits..."
            className="search-input"
            value={searchInput}
            onChange={event =>
              setSearchInput(event.target.value)
            }
          />
        </div>

        {isLoading && (
          <div className="empty-container">
            <h2>Loading Fresh Fruits... 🍎</h2>
          </div>
        )}

        {!isLoading && errorMessage && (
          <div className="empty-container">
            <h2>{errorMessage}</h2>
          </div>
        )}

        {!isLoading &&
          !errorMessage &&
          filteredList.length === 0 && (
            <div className="empty-container">
              <h2>No Fruits Available 🍎</h2>

              <p>
                Sellers have not added any fruits yet.
              </p>
            </div>
          )}

        {!isLoading &&
          !errorMessage &&
          filteredList.length > 0 && (
            <div className="fruits-list-container">
              {filteredList.map(eachFruit => (
                <div
                  className="fruit-card"
                  key={eachFruit.id}
                >
                  <div className="image-container">
                    <img
                      src={eachFruit.image_url}
                      alt={eachFruit.name}
                      className="fruit-image"
                      onError={event => {
                        event.currentTarget.src =
                          "https://via.placeholder.com/500x350?text=No+Image"
                      }}
                    />

                    <span className="badge">
                      Fresh
                    </span>
                  </div>

                  <div className="fruit-details">
                    <div className="rating">
                      ⭐ 4.8
                    </div>

                    <h2 className="fruit-name">
                      {eachFruit.name}
                    </h2>

                    <p className="fruit-price">
                      ₹ {eachFruit.price}
                    </p>

                    <p className="fruit-description">
                      {eachFruit.description}
                    </p>

                    <p className="fruit-location">
                      📍 {eachFruit.location}
                    </p>

                    <p className="fruit-quantity">
                      📦 Available:{" "}
                      {eachFruit.available_quantity}
                    </p>

                    <button
                      className="buy-button"
                      onClick={() =>
                        onClickBuy(eachFruit)
                      }
                    >
                      Add To Cart 🛒
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>

      <Footer />
    </>
  )
}

export default Fruits