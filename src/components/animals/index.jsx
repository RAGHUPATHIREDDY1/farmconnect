import {useEffect, useState} from "react"
import Header from "../header"
import Footer from "../Footer"
import "./index.css"

const Animals = () => {

  const [animalsList, setAnimalsList] = useState([])
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {

    const getAnimalsData = async () => {

      try {

        const response = await fetch(
          "https://www.jsonkeeper.com/b/0MMMD"
        )

        const data = await response.json()

        if (Array.isArray(data)) {
          setAnimalsList(data)
        } else if (data.animals) {
          setAnimalsList(data.animals)
        } else if (data.data) {
          setAnimalsList(data.data)
        }

      } catch(error) {
        console.log(error)
      }
    }

    getAnimalsData()

  }, [])

  const onClickBuy = eachAnimal => {

    const cartItems =
      JSON.parse(
        localStorage.getItem("cart")
      ) || []

    const isAlreadyExists =
      cartItems.find(
        item => item.id === eachAnimal.id
      )

    if (isAlreadyExists) {

      alert("Item Already In Cart")

      return
    }

    cartItems.push(eachAnimal)

    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems)
    )

    alert(
      `${eachAnimal.name} Added To Cart`
    )
  }

  const filteredAnimals =
    animalsList.filter(eachAnimal =>
      eachAnimal.name
        .toLowerCase()
        .includes(
          searchInput.toLowerCase()
        )
    )

  return (
    <>
      <Header />

      <div className="animals-container">

        <h1 className="main-heading">
          Farm Animals
        </h1>

        <input
          type="search"
          placeholder="Search Animals..."
          className="search-input"
          value={searchInput}
          onChange={event =>
            setSearchInput(
              event.target.value
            )
          }
        />

        <div className="animals-list-container">

          {filteredAnimals.length === 0 ? (

            <h2 className="empty-text">
              No Animals Found
            </h2>

          ) : (

            filteredAnimals.map(eachAnimal => (

              <div
                className="animal-card"
                key={eachAnimal.id}
              >

                <img
                  src={eachAnimal.image}
                  alt={eachAnimal.name}
                  className="animal-image"
                />

                <div className="animal-details">

                  <h2 className="animal-name">
                    {eachAnimal.name}
                  </h2>

                  <p className="animal-price">
                    ₹ {eachAnimal.price}
                  </p>

                  <p className="animal-description">
                    {eachAnimal.description}
                  </p>

                  <button
                    className="buy-button"
                    onClick={() =>
                      onClickBuy(eachAnimal)
                    }
                  >
                    Add To Cart
                  </button>

                </div>

              </div>

            ))
          )}

        </div>

      </div>
      <>
      <Footer />
       </>

    </>
  )
}

export default Animals