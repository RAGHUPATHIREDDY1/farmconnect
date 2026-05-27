import Header from "../Header"
import Footer from "../Footer"

import "./index.css"

const Orders = () => {

  const orders =
    JSON.parse(
      localStorage.getItem("orders")
    ) || []

  return (
    <>
      <Header />

      <div className="orders-container">

        <h1 className="orders-heading">
          My Orders
        </h1>

        {orders.length === 0 ? (

          <p className="empty-orders">
            No Orders Yet
          </p>

        ) : (

          <div className="orders-list">

            {orders.map(each => (

              <div
                className="order-card"
                key={each.id}
              >

                <img
                  src={each.image}
                  alt={each.name}
                  className="order-image"
                />

                <div className="order-details">

                  <h2 className="order-name">
                    {each.name}
                  </h2>

                  <p className="order-price">
                    ₹ {each.price}
                  </p>

                  <span className="order-status">
                    Ordered Successfully
                  </span>

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

export default Orders
