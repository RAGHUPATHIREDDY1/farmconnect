import { useEffect, useState } from "react"
import {
  Package,
  User,
  Phone,
  MapPin,
  CreditCard,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  Loader,
  AlertCircle,
  IndianRupee
} from "lucide-react"
import SellerHeader from "./SellerHeader"
import "./seller.css"

const API_URL =
  "https://farmconnectbackend.onrender.com/api/orders"

const SellerOrders = () => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] =
    useState(true)
  const [errorMessage, setErrorMessage] =
    useState("")
  const [openOrderId, setOpenOrderId] =
    useState(null)


  // =====================================================
  // GET TOKEN
  // =====================================================

  const getAccessToken = () => {
    return localStorage.getItem(
      "accessToken"
    )
  }

  // =====================================================
  // FORMAT PRICE
  // =====================================================

  const formatPrice = value => {
    const price =
      Number(value) || 0

    return price.toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    )
  }

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = date => {
    if (!date) {
      return "Not available"
    }

    return new Date(
      date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    )
  }

  // =====================================================
  // STATUS CLASS
  // =====================================================

  const getStatusClass = status => {
    return (
      status || "PENDING"
    ).toLowerCase()
  }


  // =====================================================
  // FETCH SELLER ORDERS
  // =====================================================

  const fetchSellerOrders = async () => {
    const token =
      getAccessToken()

    if (!token) {
      setErrorMessage(
        "You are not authenticated."
      )
      setIsLoading(false)
      return
    }

    try {
      const response =
        await fetch(
          `${API_URL}/seller/orders/`,
          {
            method: "GET",
            headers: {
              Authorization:
                `Bearer ${token}`,
              "Content-Type":
                "application/json"
            }
          }
        )

      const data =
        await response.json()

      if (!response.ok) {
        setErrorMessage(
          data.error ||
          data.detail ||
          "Unable to load seller orders."
        )
        return
      }

      const orderData =
        Array.isArray(data)
          ? data
          : data.orders || []

      setOrders(orderData)
    }
    catch (error) {
      console.error(
        "Seller Orders Error:",
        error
      )
      setErrorMessage(
        "Unable to connect to the server."
      )
    }
    finally {
      setIsLoading(false)
    }
  }


  // =====================================================
  // LOAD ORDERS
  // =====================================================

  useEffect(() => {
    fetchSellerOrders()
  }, [])


  // =====================================================
  // TOGGLE PRODUCTS
  // =====================================================

  const toggleOrder = orderId => {
    setOpenOrderId(
      previousId =>
        previousId === orderId
          ? null
          : orderId

    )

  }

  // =====================================================
  // STATISTICS
  // =====================================================

  const totalOrders =
    orders.length

  const pendingOrders =
    orders.filter(
      order =>
        order.status === "PENDING"
    ).length

  const confirmedOrders =
    orders.filter(
      order =>
        order.status === "CONFIRMED"
    ).length


  // =====================================================
  // LOADING
  // =====================================================

  if (isLoading) {
    return (
      <>
        <SellerHeader />

        <main className="seller-orders-page">
          <div className="seller-orders-loading">

            <Loader
              size={42}
              className="seller-loading-icon"
            />

            <h2>
              Loading Customer Orders
            </h2>

            <p>
              Please wait while we load your orders.
            </p>

          </div>

        </main>
      </>
    )
  }

  return (
    <>
      <SellerHeader />


      <main className="seller-orders-page">


        {/* =====================================================
            HEADER
        ===================================================== */}

        <section className="seller-orders-header">
          <div className="seller-page-title">
            <div className="seller-title-icon">

              <ShoppingBag
                size={28}
              />

            </div>


            <div>
              <h1>
                Customer Orders
              </h1>

              <p>
                Manage orders containing your products.
              </p>

            </div>

          </div>
        </section>


        {/* =====================================================
            ERROR
        ===================================================== */}

        {errorMessage && (
          <div className="seller-orders-error">
            <AlertCircle
              size={20}
            />
            <span>
              {errorMessage}
            </span>

          </div>
        )}


        {/* =====================================================
            STATISTICS
        ===================================================== */}

        <section className="seller-orders-stats">
          <div className="seller-stat-card">
            <div className="seller-stat-icon">

              <Package
                size={22}
              />

            </div>


            <div>
              <span>
                Total Orders
              </span>

              <strong>
                {totalOrders}
              </strong>

            </div>

          </div>


          <div className="seller-stat-card">
            <div className="seller-stat-icon">

              <CalendarDays
                size={22}
              />

            </div>


            <div>
              <span>
                Pending Orders
              </span>

              <strong>
                {pendingOrders}
              </strong>

            </div>

          </div>


          <div className="seller-stat-card">
            <div className="seller-stat-icon">

              <ShoppingBag
                size={22}
              />

            </div>


            <div>
              <span>
                Confirmed Orders
              </span>

              <strong>
                {confirmedOrders}
              </strong>

            </div>

          </div>
        </section>


        {/* =====================================================
            EMPTY
        ===================================================== */}

        {orders.length === 0 ? (
          <section className="seller-empty-orders">
            <Package
              size={60}
            />

            <h2>
              No Customer Orders Yet
            </h2>

            <p>
              When customers buy your products,
              the orders will appear here.
            </p>

          </section>
        ) : (


          <section className="seller-orders-list">
            {orders.map(order => {
              const orderId =
                order.id ||
                order.order_id

              const isOpen =
                openOrderId === orderId

              return (

                <article
                  key={orderId}
                  className="seller-order-card"
                >

                  {/* =================================================
                      ORDER TOP
                  ================================================= */}

                  <div className="seller-order-top">
                    <div className="seller-order-id">

                      <span>
                        Order ID
                      </span>

                      <strong>
                        {order.order_id}
                      </strong>

                    </div>


                    <span
                      className={`
                        seller-order-status
                        ${getStatusClass(
                          order.status
                        )}
                      `}
                    >

                      {order.status ||
                        "PENDING"}

                    </span>

                  </div>

                  {/* =================================================
                      ORDER BODY
                  ================================================= */}

                  <div className="seller-order-content">
                    {/* CUSTOMER */}

                    <div className="customer-section">
                      <h3>
                        Customer Information
                      </h3>


                      <div className="customer-details">
                        <div className="customer-detail">

                          <User
                            size={19}
                          />

                          <div>
                            <span>
                              Customer Name
                            </span>

                            <strong>
                              {
                                order.buyer_name ||
                                "Customer"
                              }
                            </strong>

                          </div>

                        </div>

                        <div className="customer-detail">

                          <Phone
                            size={19}
                          />

                          <div>
                            <span>
                              Phone Number
                            </span>

                            <strong>
                              {
                                order.phone_number ||
                                "Not provided"
                              }
                            </strong>

                          </div>

                        </div>

                        <div className="customer-detail customer-address">

                          <MapPin
                            size={19}
                          />

                          <div>
                            <span>
                              Delivery Address
                            </span>

                            <strong>

                              {
                                order.delivery_address ||
                                "Address not available"
                              }

                              <br />

                              {
                                order.city
                              }

                              {order.city &&
                                order.state &&
                                ", "}

                              {
                                order.state
                              }

                              {(order.city ||
                                order.state) &&
                                order.pincode &&
                                " - "}

                              {
                                order.pincode
                              }

                            </strong>

                          </div>

                        </div>

                      </div>

                    </div>

                    {/* ORDER SUMMARY */}

                    <div className="order-summary-section">
                      <h3>
                        Order Summary
                      </h3>


                      <div className="summary-row">
                        <span>
                          Payment Method
                        </span>

                        <strong>

                          {
                            order.payment_method ||
                            order.payment?.payment_method ||
                            "COD"
                          }

                        </strong>

                      </div>

                      <div className="summary-row">
                        <span>
                          Payment Status
                        </span>

                        <strong>

                          {
                            order.payment_status ||
                            order.payment?.payment_status ||
                            "PENDING"
                          }

                        </strong>

                      </div>

                      <div className="summary-total">
                        <span>
                          Order Total
                        </span>

                        <strong>

                          ₹
                          {formatPrice(
                            order.total_amount
                          )}

                        </strong>

                      </div>

                    </div>

                  </div>

                  {/* =================================================
                      FOOTER
                  ================================================= */}

                  <div className="seller-order-footer">
                    <div className="order-date">

                      <CalendarDays
                        size={18}
                      />

                      <span>
                        Ordered on{" "}

                        {formatDate(
                          order.created_at
                        )}

                      </span>

                    </div>

                    <button
                      className="products-toggle-button"
                      onClick={() =>
                        toggleOrder(orderId)
                      }
                    >
                      <Package
                        size={18}
                      />

                      {isOpen
                        ? "Hide Products"
                        : "View Products"}

                      {isOpen ? (

                        <ChevronUp
                          size={18}
                        />

                      ) : (

                        <ChevronDown
                          size={18}
                        />

                      )}

                    </button>

                  </div>

                  {/* =================================================
                      PRODUCTS
                  ================================================= */}

                  {isOpen && (
                    <div className="seller-products-section">

                      <h3>
                        Products in This Order
                      </h3>


                      {order.items &&
                      order.items.length > 0 ? (
                        <div className="seller-products-list">
                          {order.items.map(item => {
                            const quantity =
                              Number(
                                item.quantity
                              ) || 0

                            const price =
                              Number(
                                item.price
                              ) || 0

                            const subtotal =
                              Number(
                                item.subtotal
                              ) ||
                              price * quantity


                            return (
                              <div
                                key={item.id}
                                className="seller-product-item"
                              >

                                <img
                                  src={
                                    item.product_image ||
                                    "/placeholder.png"
                                  }
                                  alt={
                                    item.product_name
                                  }
                                />

                                <div className="seller-product-info">
                                  <strong>
                                    {
                                      item.product_name ||
                                      "Product"
                                    }
                                  </strong>

                                  <span>
                                    Quantity:{" "}
                                    {quantity}
                                  </span>

                                  <span>
                                    Price: ₹
                                    {formatPrice(
                                      price
                                    )}
                                  </span>

                                </div>

                                <div className="seller-product-price">
                                  <span>
                                    Subtotal
                                  </span>

                                  <strong>
                                    ₹
                                    {formatPrice(
                                      subtotal
                                    )}
                                  </strong>

                                </div>

                              </div>
                            )

                          })}

                        </div>
                      ) : (
                        <p className="no-products">

                          Product details are not available.

                        </p>
                      )}

                    </div>
                  )}

                </article>
              )

            })}

          </section>
        )}

      </main>

    </>
  )

}


export default SellerOrders