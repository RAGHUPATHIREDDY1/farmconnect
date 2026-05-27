import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"

import Header from "../header"

import "./index.css"

const Cart = () => {

  const [cartList, setCartList] =
    useState([])

  const navigate = useNavigate()

  useEffect(() => {

    const data =
      JSON.parse(
        localStorage.getItem("cart")
      ) || []

    setCartList(data)

  }, [])

  const removeItem = id => {

    const updatedList =
      cartList.filter(
        eachItem =>
          eachItem.id !== id
      )

    setCartList(updatedList)

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedList)
    )
  }

  const onClickPlaceOrder = () => {

    const previousOrders =
      JSON.parse(
        localStorage.getItem("orders")
      ) || []

    const newOrders = [
      ...previousOrders,
      ...cartList
    ]

    localStorage.setItem(
      "orders",
      JSON.stringify(newOrders)
    )

    localStorage.removeItem("cart")

    setCartList([])

    alert(
      "Order Placed Successfully"
    )

    navigate("/orders")
  }

  const totalPrice =
    cartList.reduce(
      (acc, item) =>
        acc + Number(item.price),
      0
    )

  return (
    <>
      <Header />

      <div className="cart-container">

        <h1 className="cart-heading">
          My Cart
        </h1>

        {cartList.length === 0 ? (

          <div className="empty-cart">

            <h2>
              Your Cart Is Empty
            </h2>

          </div>

        ) : (

          <>
            <div className="cart-list">

              {cartList.map(eachItem => (

                <div
                  className="cart-card"
                  key={eachItem.id}
                >

                  <img
                    src={eachItem.image}
                    alt={eachItem.name}
                    className="cart-image"
                  />

                  <div className="cart-details">

                    <h2>
                      {eachItem.name}
                    </h2>

                    <p className="cart-price">
                      ₹ {eachItem.price}
                    </p>

                    <p className="cart-description">
                      {eachItem.description}
                    </p>

                  </div>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeItem(
                        eachItem.id
                      )
                    }
                  >
                    Remove
                  </button>

                </div>

              ))}

            </div>

            <div className="total-section">

              <h2>
                Total : ₹ {totalPrice}
              </h2>

              <button
                className="checkout-btn"
                onClick={
                  onClickPlaceOrder
                }
              >
                Place Order
              </button>

            </div>

          </>
        )}

      </div>

    </>
  )
}

export default Cart