import {useEffect, useState} from "react"
import Header from "../header"
import Footer from "../Footer"
import "./index.css"

const Vegetables = () => {

  const [vegetablesList, setVegetablesList] =
    useState([])

  const [searchInput, setSearchInput] =
    useState("")

  useEffect(() => {

    const getVegetablesData = async () => {

      try {

        const response = await fetch(
          "https://www.jsonkeeper.com/b/B6AMR"
        )

        const data = await response.json()

        if (Array.isArray(data)) {

          setVegetablesList(data)

        } else if (data.vegetables) {

          setVegetablesList(
            data.vegetables
          )

        } else if (data.data) {

          setVegetablesList(data.data)

        }

      } catch(error) {

        console.log(error)
      }
    }

    getVegetablesData()

  }, [])

  const onClickBuy = eachVegetable => {

    const cartItems =
      JSON.parse(
        localStorage.getItem("cart")
      ) || []

    const isAlreadyExists =
      cartItems.find(
        item =>
          item.id === eachVegetable.id
      )

    if (isAlreadyExists) {

      alert(
        "Item Already In Cart"
      )

      return
    }

    cartItems.push(eachVegetable)

    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems)
    )

    alert(
      `${eachVegetable.name}
      Added To Cart`
    )
  }

  const filteredVegetables =
    vegetablesList.filter(
      eachVegetable =>
        eachVegetable.name
          .toLowerCase()
          .includes(
            searchInput.toLowerCase()
          )
    )

  return (
    <>
      <Header />

      <div className="vegetables-container">

        <h1 className="main-heading">
          Fresh Vegetables
        </h1>

        <input
          type="search"
          placeholder="Search Vegetables..."
          className="search-input"
          value={searchInput}
          onChange={event =>
            setSearchInput(
              event.target.value
            )
          }
        />

        <div className="vegetables-list-container">

          {filteredVegetables.length === 0 ? (

            <h2 className="empty-text">
              No Vegetables Found
            </h2>

          ) : (

            filteredVegetables.map(
              eachVegetable => (

                <div
                  className="vegetable-card"
                  key={eachVegetable.id}
                >

                  <img
                    src={eachVegetable.image}
                    alt={eachVegetable.name}
                    className="vegetable-image"
                  />

                  <div className="vegetable-details">

                    <h2 className="vegetable-name">
                      {eachVegetable.name}
                    </h2>

                    <p className="vegetable-price">
                      ₹ {eachVegetable.price}
                    </p>

                    <p className="vegetable-description">
                      {eachVegetable.description}
                    </p>

                    <button
                      className="buy-button"
                      onClick={() =>
                        onClickBuy(
                          eachVegetable
                        )
                      }
                    >
                      Add To Cart
                    </button>

                  </div>

                </div>
              )
            )
          )}

        </div>

      </div>
        <>
      <Footer />
       </>
    </>
  )
}

export default Vegetables