import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import Header from "../header"
import Footer from "../footer"
import API_BASE_URL from "../../config/api"
import "./index.css"

const API_URL = `${API_BASE_URL}/api/products/?category=ANIMAL`

const Animals = () => {
  const [animalsList, setAnimalsList] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    const getAnimalsData = async () => {
      try {
        const response = await fetch(API_URL)

        const data = await response.json()

        if (!response.ok) {
          setErrorMessage(
            data.detail ||
              data.error ||
              "Unable to load animals."
          )
          return
        }

        const products = Array.isArray(data)
          ? data
          : data.results || []

        setAnimalsList(products)
      } catch (error) {
        console.error("Animals Fetch Error:", error)

        setErrorMessage(
          "Unable to connect to the server. Please try again."
        )
      } finally {
        setIsLoading(false)
      }
    }

    getAnimalsData()
  }, [])

  const onClickBuy = async eachProduct => {
    const accessToken =
      localStorage.getItem("accessToken")

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
        alert(
          data.error ||
            data.detail ||
            "Unable to add product to cart."
        )
        return
      }

      alert(
        `${eachProduct.name} added to cart successfully.`
      )
    } catch (error) {
      console.error("Add To Cart Error:", error)

      alert(
        "Unable to connect to the server."
      )
    }
  }

  const filteredAnimals = animalsList.filter(
    eachAnimal =>
      eachAnimal.name
        ?.toLowerCase()
        .includes(searchInput.toLowerCase())
  )

  return (
    <>
      <Header />

      <div className="animals-container">
        <section className="animals-hero">
          <h1 className="main-heading">
            🐄 Healthy Farm Animals
          </h1>

          <p className="hero-subtitle">
            Browse quality livestock from trusted farmers across India.
          </p>
        </section>

        <div className="search-container">
          <input
            type="search"
            placeholder="Search Farm Animals..."
            className="search-input"
            value={searchInput}
            onChange={event =>
              setSearchInput(event.target.value)
            }
          />
        </div>

        {isLoading && (
          <div className="empty-container">
            <h2>
              Loading Animals... 🐄
            </h2>
          </div>
        )}

        {!isLoading && errorMessage && (
          <div className="empty-container">
            <h2>
              {errorMessage}
            </h2>

            <button
              onClick={() =>
                window.location.reload()
              }
            >
              Try Again
            </button>
          </div>
        )}

        {!isLoading &&
          !errorMessage &&
          filteredAnimals.length === 0 && (
            <div className="empty-container">
              <h2>
                No Animals Found 🐄
              </h2>

              <p>
                No animal products are currently available.
              </p>
            </div>
          )}

        {!isLoading &&
          !errorMessage &&
          filteredAnimals.length > 0 && (
            <div className="animals-list-container">
              {filteredAnimals.map(eachAnimal => (
                <div
                  className="animal-card"
                  key={eachAnimal.id}
                >
                  <div className="image-container">
                    <img
                      src={eachAnimal.image_url}
                      alt={eachAnimal.name}
                      className="animal-image"
                      onError={event => {
                        event.currentTarget.src =
                          "https://via.placeholder.com/500x350?text=No+Image"
                      }}
                    />

                    <span className="badge">
                      Verified
                    </span>
                  </div>

                  <div className="animal-details">
                    <div className="rating">
                      ⭐ 4.9
                    </div>

                    <h2 className="animal-name">
                      {eachAnimal.name}
                    </h2>

                    <p className="animal-price">
                      ₹{" "}
                      {Number(
                        eachAnimal.price
                      ).toLocaleString("en-IN")}
                    </p>

                    <p className="animal-description">
                      {eachAnimal.description}
                    </p>

                    <p>
                      📍 {eachAnimal.location}
                    </p>

                    <p>
                      📦 Available:{" "}
                      {eachAnimal.available_quantity}
                    </p>

                    <button
                      className="buy-button"
                      onClick={() =>
                        onClickBuy(eachAnimal)
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

export default Animals