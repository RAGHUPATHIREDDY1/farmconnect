import Header from "../header";
import Footer from "../Footer";

import "./index.css";

const Orders = () => {
  const orders =
    JSON.parse(
      localStorage.getItem("orders")
    ) || [];

  const totalSpent = orders.reduce(
    (acc, item) =>
      acc + Number(item.price),
    0
  );

  return (
    <>
      <Header />

      <div className="orders-container">

        <section className="orders-hero">

          <h1 className="orders-heading">
            📦 My Orders
          </h1>

          <p className="orders-subtitle">
            Track and manage all your purchases.
          </p>

        </section>

        {orders.length === 0 ? (

          <div className="empty-orders-container">

            <div className="empty-card">

              <h2>📭 No Orders Yet</h2>

              <p>
                Start shopping to see your
                orders here.
              </p>

            </div>

          </div>

        ) : (

          <>
            <div className="summary-container">

              <div className="summary-card">

                <h3>Total Orders</h3>

                <h2>{orders.length}</h2>

              </div>

              <div className="summary-card">

                <h3>Total Spent</h3>

                <h2>₹ {totalSpent}</h2>

              </div>

              <div className="summary-card">

                <h3>Status</h3>

                <h2>Completed</h2>

              </div>

            </div>

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
                      ✓ Delivered
                    </span>

                  </div>

                </div>

              ))}
            </div>
          </>
        )}

      </div>

      <Footer />
    </>
  );
};

export default Orders;