import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import Header from "../header"
import Footer from "../Footer"
import API_BASE_URL from "../../config/api"
import "./index.css"

const API_URL =
  `${API_BASE_URL}/api/products/?category=MACHINE`

const Machines = () => {
  const navigate = useNavigate()

  const [machinesList, setMachinesList] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const getMachinesData = async () => {
      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error(
            "Unable to load machines"
          )
        }

        const data = await response.json()

        setMachinesList(
          Array.isArray(data)
            ? data
            : data.results || []
        )
      } catch (error) {
        console.error(
          "Machines Error:",
          error
        )

        setErrorMessage(
          "Unable to connect to the server. Please try again."
        )
      } finally {
        setIsLoading(false)
      }
    }

    getMachinesData()
  }, [])

  const onClickBuy = async eachProduct => {
    const accessToken =
      localStorage.getItem("accessToken")

    if (!accessToken) {
      alert(
        "Please login as a buyer first."
      )

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
            Authorization: `Bearer ${accessToken}`
          },

          body: JSON.stringify({
            product_id: eachProduct.id,
            quantity: 1
          })
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
      console.error(
        "Add To Cart Error:",
        error
      )

      alert(
        "Unable to connect to the server."
      )
    }
  }

  const filteredList =
    machinesList.filter(eachMachine =>
      eachMachine.name
        ?.toLowerCase()
        .includes(
          searchInput.toLowerCase()
        )
    )

  return (
    <>
      <Header />

      <div className="machines-container">
        <section className="machines-hero">
          <h1 className="main-heading">
            🚜 Farm Machines & Equipment
          </h1>

          <p className="hero-subtitle">
            Quality farming equipment and machines from trusted sellers.
          </p>
        </section>

        <div className="search-container">
          <input
            type="search"
            placeholder="Search Farm Machines..."
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
              Loading Farm Machines... 🚜
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
          filteredList.length === 0 && (
            <div className="empty-container">
              <h2>
                No Machines Available 🚜
              </h2>

              <p>
                Sellers have not added any machines yet.
              </p>
            </div>
          )}

        {!isLoading &&
          !errorMessage &&
          filteredList.length > 0 && (
            <div className="machines-list-container">
              {filteredList.map(eachMachine => (
                <div
                  className="machine-card"
                  key={eachMachine.id}
                >
                  <div className="image-container">
                    <img
                      src={eachMachine.image_url}
                      alt={eachMachine.name}
                      className="machine-image"
                      onError={event => {
                        event.currentTarget.src =
                          "https://via.placeholder.com/500x350?text=No+Image"
                      }}
                    />

                    <span className="badge">
                      Verified
                    </span>
                  </div>

                  <div className="machine-details">
                    <div className="rating">
                      ⭐ 4.8
                    </div>

                    <h2 className="machine-name">
                      {eachMachine.name}
                    </h2>

                    <p className="machine-price">
                      ₹{" "}
                      {Number(
                        eachMachine.price
                      ).toLocaleString("en-IN")}
                    </p>

                    <p className="machine-description">
                      {eachMachine.description}
                    </p>

                    <p className="machine-location">
                      📍{" "}
                      {eachMachine.location}
                    </p>

                    <p className="machine-quantity">
                      📦 Available:{" "}
                      {eachMachine.available_quantity}
                    </p>

                    <button
                      className="buy-button"
                      onClick={() =>
                        onClickBuy(
                          eachMachine
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

export default Machines