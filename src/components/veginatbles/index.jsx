import {useEffect, useState} from "react"
import Header from "../header"
import Footer from "../Footer"
import "./index.css"

const Vegetables = () => {
  const [vegetablesList, setVegetablesList] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const getVegetablesData = async () => {
      try {
        const response = await fetch(
          "https://farmconnectbackend.onrender.com/api/products/?category=VEGETABLE"
        )

        if (!response.ok) {
          throw new Error("Unable to load vegetables")
        }

        const data = await response.json()

        setVegetablesList(
          Array.isArray(data)
            ? data
            : data.results || []
        )
      } catch (error) {
        console.error("Vegetables Error:", error)
        setErrorMessage(
          "Unable to connect to the server. Please try again."
        )
      } finally {
        setIsLoading(false)
      }
    }

    getVegetablesData()
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
      "https://farmconnectbackend.onrender.com/api/orders/cart/add/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          product_id: eachProduct.id,
          quantity: 1
        })
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

  const filteredList =
    vegetablesList.filter(eachVegetable =>
      eachVegetable.name
        ?.toLowerCase()
        .includes(
          searchInput.toLowerCase()
        )
    )

  return (
    <>
      <Header />

      <div className="vegetables-container">
        <section className="vegetables-hero">
          <h1 className="main-heading">
            🥕 Fresh Vegetables Collection
          </h1>

          <p className="hero-subtitle">
            Fresh and healthy vegetables directly from trusted farmers.
          </p>
        </section>

        <div className="search-container">
          <input
            type="search"
            placeholder="Search Fresh Vegetables..."
            className="search-input"
            value={searchInput}
            onChange={event =>
              setSearchInput(
                event.target.value
              )
            }
          />
        </div>

        {isLoading && (
          <div className="empty-container">
            <h2>
              Loading Fresh Vegetables... 🥕
            </h2>
          </div>
        )}

        {!isLoading && errorMessage && (
          <div className="empty-container">
            <h2>
              {errorMessage}
            </h2>
          </div>
        )}

        {!isLoading &&
          !errorMessage &&
          filteredList.length === 0 && (
            <div className="empty-container">
              <h2>
                No Vegetables Available 🥕
              </h2>

              <p>
                Sellers have not added any vegetables yet.
              </p>
            </div>
          )}

        {!isLoading &&
          !errorMessage &&
          filteredList.length > 0 && (
            <div className="vegetables-list-container">
              {filteredList.map(eachVegetable => (
                <div
                  className="vegetable-card"
                  key={eachVegetable.id}
                >
                  <div className="image-container">
                    <img
                      src={eachVegetable.image_url}
                      alt={eachVegetable.name}
                      className="vegetable-image"
                      onError={event => {
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
                      ₹ {eachVegetable.price}
                    </p>

                    <p className="vegetable-description">
                      {eachVegetable.description}
                    </p>

                    <p className="vegetable-location">
                      📍 {eachVegetable.location}
                    </p>

                    <p className="vegetable-quantity">
                      📦 Available:
                      {" "}
                      {eachVegetable.available_quantity}
                    </p>

                    <button
                      className="buy-button"
                      onClick={() =>
                        onClickBuy(
                          eachVegetable
                        )
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

export default Vegetables