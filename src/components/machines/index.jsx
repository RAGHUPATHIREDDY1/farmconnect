import {useEffect, useState} from "react"
import Header from "../header"
import Footer from "../Footer"
import "./index.css"

const Machines = () => {

  const [machinesList, setMachinesList] =
    useState([])

  const [searchInput, setSearchInput] =
    useState("")

  useEffect(() => {

    const getMachinesData = async () => {

      try {

        const response = await fetch(
          "https://www.jsonkeeper.com/b/ODZLH"
        )

        const data = await response.json()

        if (Array.isArray(data)) {

          setMachinesList(data)

        } else if (data.machines) {

          setMachinesList(data.machines)

        } else if (data.data) {

          setMachinesList(data.data)

        }

      } catch(error) {

        console.log(error)
      }
    }

    getMachinesData()

  }, [])

  const onClickBuy = eachMachine => {

    const cartItems =
      JSON.parse(
        localStorage.getItem("cart")
      ) || []

    const isAlreadyExists =
      cartItems.find(
        item =>
          item.id === eachMachine.id
      )

    if (isAlreadyExists) {

      alert(
        "Item Already In Cart"
      )

      return
    }

    cartItems.push(eachMachine)

    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems)
    )

    alert(
      `${eachMachine.name}
      Added To Cart`
    )
  }

  const filteredMachines =
    machinesList.filter(
      eachMachine =>
        eachMachine.name
          .toLowerCase()
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
          🚜 Modern Farming Machines
        </h1>

        <p className="hero-subtitle">
          Advanced agricultural equipment to improve productivity and efficiency.
        </p>

      </section>

      <div className="search-container">

        <input
          type="search"
          placeholder="Search Farming Machines..."
          className="search-input"
          value={searchInput}
          onChange={event =>
            setSearchInput(event.target.value)
          }
        />

      </div>

      <div className="machines-list-container">

        {filteredMachines.length === 0 ? (

          <div className="empty-container">
            <h2>No Machines Found 🚜</h2>
          </div>

        ) : (

          filteredMachines.map(eachMachine => (

            <div
              className="machine-card"
              key={eachMachine.id}
            >

              <div className="image-container">

                <img
                  src={eachMachine.image}
                  alt={eachMachine.name}
                  className="machine-image"
                />

                <span className="badge">
                  Premium
                </span>

              </div>

              <div className="machine-details">

                <div className="rating">
                  ⭐ 4.9
                </div>

                <h2 className="machine-name">
                  {eachMachine.name}
                </h2>

                <p className="machine-price">
                  ₹ {eachMachine.price}
                </p>

                <p className="machine-description">
                  {eachMachine.description}
                </p>

                <button
                  className="buy-button"
                  onClick={() =>
                    onClickBuy(eachMachine)
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

export default Machines
