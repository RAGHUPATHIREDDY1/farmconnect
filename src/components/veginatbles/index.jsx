import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../header"
import Footer from "../Footer"
import "./index.css"

const API_URL =
  "https://farmconnectbackend.onrender.com/api/products/?category=VEGETABLE"

const CART_API_URL =
  "https://farmconnectbackend.onrender.com/api/orders/cart/add/"

const Vegetables = () => {
  const navigate = useNavigate()

  const [vegetablesList, setVegetablesList] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const [addingProductId, setAddingProductId] = useState(null)

  useEffect(() => {
    const getVegetablesData = async () => {
      setIsLoading(true)
      setErrorMessage("")

      try {
        const response = await fetch(API_URL)

        const data = await response.json()

        if (!response.ok) {
          setErrorMessage(
            data.detail ||
              data.error ||
              "Unable to load vegetables."
          )
          return
        }

        const vegetablesData = Array.isArray(data)
          ? data
          : Array.isArray(data.results)
          ? data.results
          : Array.isArray(data.products)
          ? data.products
          : []

        setVegetablesList(vegetablesData)
      } catch (error) {
        console.error("Vegetables Fetch Error:", error)

        setErrorMessage(
          "Unable to connect to the server. Please try again."
        )
      } finally {
        setIsLoading(false)
      }
    }

    getVegetablesData()
  }, [])

  const onClickBuy = async product => {
    const accessToken = localStorage.getItem("accessToken")

    if (!accessToken) {
      alert("Please login as a buyer first.")
      navigate("/login")
      return
    }

    setAddingProductId(product.id)

    try {
      const response = await fetch(CART_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1
        })
      })

      const data = await response.json()

      if (response.status === 401) {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("user")

        alert("Your session has expired. Please login again.")
        navigate("/login")
        return
      }

      if (!response.ok) {
        alert(
          data.error ||
            data.detail ||
            "Unable to add product to cart."
        )
        return
      }

      alert(`${product.name} added to cart successfully.`)
    } catch (error) {
      console.error("Add To Cart Error:", error)
      alert("Unable to connect to the server.")
    } finally {
      setAddingProductId(null)
    }
  }

  const filteredList = vegetablesList.filter(eachVegetable =>
    String(eachVegetable.name || "")
      .toLowerCase()
      .includes(searchInput.toLowerCase())
  )

  return (
    <>
      <Header />

      <main className="vegetables-container">
        <section className="vegetables-hero">
          <h1 className="main-heading">
            🥕 Fresh Vegetables Collection
          </h1>

          <p className="hero-subtitle">
            Fresh and healthy vegetables directly from trusted farmers.
          </p>
        </section>

        <section className="search-container">
          <input
            type="search"
            placeholder="Search Fresh Vegetables"
            className="search-input"
            value={searchInput}
            onChange={event =>
              setSearchInput(event.target.value)
            }
          />
        </section>

        {isLoading && (
          <section className="empty-container">
            <h2>Loading Fresh Vegetables 🥕</h2>
            <p>Please wait while we load the latest products.</p>
          </section>
        )}

        {!isLoading && errorMessage && (
          <section className="empty-container">
            <h2>{errorMessage}</h2>

            <button
              className="buy-button"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </section>
        )}

        {!isLoading &&
          !errorMessage &&
          vegetablesList.length === 0 && (
            <section className="empty-container">
              <h2>No Vegetables Available 🥕</h2>

              <p>
                Sellers have not added any vegetables yet.
              </p>
            </section>
          )}

        {!isLoading &&
          !errorMessage &&
          vegetablesList.length > 0 &&
          filteredList.length === 0 && (
            <section className="empty-container">
              <h2>No Vegetables Found 🔍</h2>

              <p>
                No vegetables match your search.
              </p>

              <button
                className="buy-button"
                onClick={() => setSearchInput("")}
              >
                Clear Search
              </button>
            </section>
          )}

        {!isLoading &&
          !errorMessage &&
          filteredList.length > 0 && (
            <section className="vegetables-list-container">
              {filteredList.map(eachVegetable => (
                <article
                  className="vegetable-card"
                  key={eachVegetable.id}
                >
                  <div className="image-container">
                    <img
                      src={
                        eachVegetable.image_url ||
                        "https://via.placeholder.com/500x350?text=No+Image"
                      }
                      alt={eachVegetable.name}
                      className="vegetable-image"
                      onError={event => {
                        event.currentTarget.onerror = null
                        event.currentTarget.src =
                          "https://via.placeholder.com/500x350?text=No+Image"
                      }}
                    />

                    <span className="badge">
                      Fresh
                    </span>
                  </div>

                  <div className="vegetable-details">
                    <div className="rating">
                      ⭐ 4.8
                    </div>

                    <h2 className="vegetable-name">
                      {eachVegetable.name}
                    </h2>

                    <p className="vegetable-price">
                      ₹ {Number(eachVegetable.price || 0).toLocaleString("en-IN")}
                    </p>

                    <p className="vegetable-description">
                      {eachVegetable.description ||
                        "Fresh quality vegetables from trusted farmers."}
                    </p>

                    <p className="vegetable-location">
                      📍{" "}
                      {eachVegetable.location ||
                        "Location not available"}
                    </p>

                    <p className="vegetable-quantity">
                      📦 Available:{" "}
                      {eachVegetable.available_quantity}
                    </p>

                    <button
                      className="buy-button"
                      onClick={() =>
                        onClickBuy(eachVegetable)
                      }
                      disabled={
                        addingProductId === eachVegetable.id
                      }
                    >
                      {addingProductId === eachVegetable.id
                        ? "Adding..."
                        : "Add To Cart 🛒"}
                    </button>
                  </div>
                </article>
              ))}
            </section>
          )}
      </main>

      <Footer />
    </>
  )
}

export default Vegetables