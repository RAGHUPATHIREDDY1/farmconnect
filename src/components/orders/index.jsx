import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"

import {
  Package,
  ShoppingBag,
  IndianRupee,
  Clock3,
  CheckCircle2,
  Truck,
  XCircle,
  ArrowRight,
  LoaderCircle,
  AlertCircle
} from "lucide-react"

import Header from "../header"
import Footer from "../footer"
import API_BASE_URL from "../../config/api"

import "./index.css"

const API_URL =
  `${API_BASE_URL}/api/orders`

const Orders = () => {
  const navigate = useNavigate()

  const [orders, setOrders] =
    useState([])

  const [isLoading, setIsLoading] =
    useState(true)

  const [errorMessage, setErrorMessage] =
    useState("")

  const getAccessToken = () => {
    return localStorage.getItem(
      "accessToken"
    )
  }

  const logoutUser = () => {
    localStorage.removeItem(
      "accessToken"
    )

    localStorage.removeItem(
      "refreshToken"
    )

    localStorage.removeItem(
      "currentUser"
    )

    localStorage.removeItem(
      "user"
    )

    navigate("/login")
  }

  const fetchOrders = async () => {
    const accessToken =
      getAccessToken()

    if (!accessToken) {
      navigate("/login")
      return
    }

    setIsLoading(true)
    setErrorMessage("")

    try {
      const response = await fetch(
        `${API_URL}/my-orders/`,
        {
          method: "GET",

          headers: {
            Authorization:
              `Bearer ${accessToken}`,

            "Content-Type":
              "application/json",

            Accept:
              "application/json"
          }
        }
      )

      const data =
        await response.json()

      if (response.status === 401) {
        logoutUser()
        return
      }

      if (!response.ok) {
        setErrorMessage(
          data?.detail ||
            data?.error ||
            "Unable to load your orders."
        )

        return
      }

      let ordersData = []

      if (Array.isArray(data)) {
        ordersData = data
      } else if (
        Array.isArray(data.orders)
      ) {
        ordersData = data.orders
      } else if (
        Array.isArray(data.results)
      ) {
        ordersData = data.results
      }

      setOrders(ordersData)
    } catch (error) {
      console.error(
        "Orders Fetch Error:",
        error
      )

      setErrorMessage(
        "Unable to connect to FarmConnect server."
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const totalSpent =
    orders.reduce(
      (total, order) =>
        total +
        Number(
          order.total_amount || 0
        ),
      0
    )

  const getStatusClass =
    status => {
      return (
        status || "PENDING"
      )
        .toLowerCase()
        .replaceAll(
          "_",
          "-"
        )
    }

  const getStatusIcon =
    status => {
      switch (status) {
        case "DELIVERED":
          return (
            <CheckCircle2
              size={16}
            />
          )

        case "SHIPPED":
        case "OUT_FOR_DELIVERY":
          return (
            <Truck
              size={16}
            />
          )

        case "CANCELLED":
          return (
            <XCircle
              size={16}
            />
          )

        case "CONFIRMED":
        case "PROCESSING":
          return (
            <Package
              size={16}
            />
          )

        default:
          return (
            <Clock3
              size={16}
            />
          )
      }
    }

  if (isLoading) {
    return (
      <>
        <Header />

        <main className="orders-loading">
          <LoaderCircle
            size={42}
            className="orders-loader"
          />

          <h2>
            Loading Your Orders
          </h2>

          <p>
            Please wait while we fetch your orders.
          </p>
        </main>

        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />

      <main className="orders-page">
        <section className="orders-hero">
          <div className="orders-hero-content">
            <div className="orders-hero-icon">
              <ShoppingBag
                size={30}
              />
            </div>

            <div>
              <h1>
                My Orders
              </h1>

              <p>
                Track and manage all your FarmConnect purchases.
              </p>
            </div>
          </div>
        </section>

        {errorMessage && (
          <div className="orders-error">
            <AlertCircle
              size={20}
            />

            <span>
              {errorMessage}
            </span>
          </div>
        )}

        {!errorMessage &&
        orders.length === 0 ? (
          <section className="empty-orders">
            <div className="empty-orders-icon">
              <Package
                size={48}
              />
            </div>

            <h2>
              No Orders Yet
            </h2>

            <p>
              You haven't placed any orders yet.
              Start shopping and your orders will appear here.
            </p>

            <button
              className="start-shopping-button"
              onClick={() =>
                navigate("/fruits")
              }
            >
              Start Shopping

              <ArrowRight
                size={18}
              />
            </button>
          </section>
        ) : (
          <>
            <section className="orders-summary">
              <div className="summary-card">
                <div className="summary-icon">
                  <ShoppingBag
                    size={22}
                  />
                </div>

                <div>
                  <span>
                    Total Orders
                  </span>

                  <strong>
                    {orders.length}
                  </strong>
                </div>
              </div>

              <div className="summary-card">
                <div className="summary-icon">
                  <IndianRupee
                    size={22}
                  />
                </div>

                <div>
                  <span>
                    Total Spent
                  </span>

                  <strong>
                    ₹
                    {totalSpent.toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>
              </div>

              <div className="summary-card">
                <div className="summary-icon">
                  <CheckCircle2
                    size={22}
                  />
                </div>

                <div>
                  <span>
                    Delivered Orders
                  </span>

                  <strong>
                    {
                      orders.filter(
                        order =>
                          order.status ===
                          "DELIVERED"
                      ).length
                    }
                  </strong>
                </div>
              </div>
            </section>

            <section className="orders-section">
              <div className="orders-section-header">
                <div>
                  <h2>
                    Recent Orders
                  </h2>

                  <p>
                    View your order details and status.
                  </p>
                </div>
              </div>

              <div className="orders-list">
                {orders.map(order => (
                  <article
                    className="order-card"
                    key={order.id}
                  >
                    <div className="order-card-header">
                      <div>
                        <span className="order-label">
                          Order ID
                        </span>

                        <strong className="order-id">
                          {order.order_id}
                        </strong>
                      </div>

                      <div className="order-date">
                        {order.created_at &&
                          new Date(
                            order.created_at
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric"
                            }
                          )}
                      </div>
                    </div>

                    <div className="order-products">
                      {order.items?.map(
                        item => (
                          <div
                            className="order-product"
                            key={item.id}
                          >
                            <div className="product-image-wrapper">
                              <img
                                src={
                                  item.product_image
                                }
                                alt={
                                  item.product_name
                                }
                                className="order-product-image"
                                onError={
                                  event => {
                                    event.currentTarget.src =
                                      "/placeholder-product.png"
                                  }
                                }
                              />
                            </div>

                            <div className="order-product-info">
                              <h3>
                                {
                                  item.product_name
                                }
                              </h3>

                              <p>
                                Qty:{" "}
                                {
                                  item.quantity
                                }
                              </p>

                              <span>
                                ₹
                                {Number(
                                  item.price ||
                                    0
                                ).toLocaleString(
                                  "en-IN"
                                )}
                              </span>
                            </div>

                            <strong className="item-total">
                              ₹
                              {Number(
                                item.subtotal ||
                                  0
                              ).toLocaleString(
                                "en-IN"
                              )}
                            </strong>
                          </div>
                        )
                      )}
                    </div>

                    <div className="order-card-footer">
                      <div className="order-status-wrapper">
                        <span className="order-label">
                          Order Status
                        </span>

                        <span
                          className={`
                            order-status
                            ${getStatusClass(
                              order.status
                            )}
                          `}
                        >
                          {getStatusIcon(
                            order.status
                          )}

                          {(
                            order.status ||
                            "PENDING"
                          ).replaceAll(
                            "_",
                            " "
                          )}
                        </span>
                      </div>

                      <div className="order-total">
                        <span>
                          Total Amount
                        </span>

                        <strong>
                          ₹
                          {Number(
                            order.total_amount ||
                              0
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </strong>
                      </div>

                      <button
                        className="view-order-button"
                        onClick={() =>
                          navigate(
                            `/orders/${order.order_id}`
                          )
                        }
                      >
                        View Details

                        <ArrowRight
                          size={17}
                        />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </>
  )
}

export default Orders