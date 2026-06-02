import {useEffect, useState} from "react"
import Header from "../header"
import Footer from "../Footer"
import "./index.css"

const Fruits = () => {

  const [fruitsList, setFruitsList] =
    useState([])

  const [searchInput, setSearchInput] =
    useState("")

  useEffect(() => {

    const getFruitsData = async () => {

      try {

        const response = await fetch(
          "https://www.jsonkeeper.com/b/NGJIJ"
        )

        const data = await response.json()

        if (Array.isArray(data)) {

          setFruitsList(data)

        } else if (data.fruits) {

          setFruitsList(data.fruits)

        } else if (data.data) {

          setFruitsList(data.data)
        }

      } catch(error) {

        console.log(error)
      }
    }

    getFruitsData()

  }, [])

  const onClickBuy = eachFruit => {

    const cartItems =
      JSON.parse(
        localStorage.getItem("cart")
      ) || []

    const isAlreadyExists =
      cartItems.find(
        item => item.id === eachFruit.id
      )

    if (isAlreadyExists) {

      alert("Item Already In Cart")

      return
    }

    cartItems.push(eachFruit)

    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems)
    )

    alert(
      `${eachFruit.name} Added To Cart`
    )
  }

  const filteredList =
    fruitsList.filter(eachFruit =>
      eachFruit.name
        .toLowerCase()
        .includes(
          searchInput.toLowerCase()
        )
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

      <div className="fruits-list-container">

        {filteredList.length === 0 ? (

          <div className="empty-container">
            <h2>No Fruits Found 🍎</h2>
          </div>

        ) : (

          filteredList.map(eachFruit => (

            <div
              className="fruit-card"
              key={eachFruit.id}
            >

              <div className="image-container">

                <img
                  src={eachFruit.image}
                  alt={eachFruit.name}
                  className="fruit-image"
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
                  ₹ {eachFruit.price}/kg
                </p>

                <p className="fruit-description">
                  {eachFruit.description}
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
          ))
        )}

      </div>

    </div>

    <Footer />
  </>
)
}

export default Fruits
