import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"

import Header from "../header"
import Footer from "../Footer"

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

      <section className="cart-hero">

        <h1 className="cart-heading">
          🛒 Shopping Cart
        </h1>

        <p className="cart-subtitle">
          Review your selected products before checkout.
        </p>

      </section>

      {cartList.length === 0 ? (

        <div className="empty-cart">

          <div className="empty-card">

            <h2>🛒 Your Cart Is Empty</h2>

            <p>
              Looks like you haven't added any products yet.
            </p>

            <button
              className="shop-btn"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>

          </div>

        </div>

      ) : (

        <div className="cart-content">

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

                  <h2>{eachItem.name}</h2>

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
                    removeItem(eachItem.id)
                  }
                >
                  Remove
                </button>

              </div>

            ))}

          </div>

          <div className="summary-card">

            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Items</span>
              <span>{cartList.length}</span>
            </div>

            <div className="summary-row">
              <span>Total</span>
              <span>₹ {totalPrice}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={onClickPlaceOrder}
            >
              Place Order
            </button>

          </div>

        </div>

      )}

    </div>

    <Footer />
  </>
)
}

export default Cart