import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Package,
  User,
  Phone,
  MapPin,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  Loader,
  AlertCircle,
  RefreshCw,
  IndianRupee,
  CreditCard,
  CheckCircle2
} from "lucide-react"

import SellerHeader from "./SellerHeader"
import Footer from "../Footer"
import "./seller.css"

const API_BASE_URL =
  "https://farmconnectbackend.onrender.com"

const API_URL =
  `${API_BASE_URL}/api/orders/seller/orders/`

const SellerOrders = () => {
  const navigate = useNavigate()

  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const [openOrderId, setOpenOrderId] = useState(null)

  const getAccessToken = () => {
    return localStorage.getItem("accessToken")
  }

  const logoutSeller = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("user")

    navigate("/seller/login", {
      replace: true
    })
  }

  const formatPrice = value => {
    const price = Number(value) || 0

    return price.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  const formatDate = date => {
    if (!date) {
      return "Not available"
    }

    const formattedDate = new Date(date)

    if (Number.isNaN(formattedDate.getTime())) {
      return "Not available"
    }

    return formattedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    })
  }

  const getStatusClass = status => {
    return String(status || "PENDING")
      .toLowerCase()
      .replaceAll(" ", "-")
  }

  const getOrderStatus = order => {
    return (
      order.status ||
      order.order_status ||
      "PENDING"
    )
  }

  const getOrderId = order => {
    return (
      order.id ||
      order.order_id ||
      `order-${Math.random()}`
    )
  }

  const getOrderItems = order => {
    if (Array.isArray(order.items)) {
      return order.items
    }

    if (Array.isArray(order.order_items)) {
      return order.order_items
    }

    if (Array.isArray(order.products)) {
      return order.products
    }

    return []
  }

  const extractOrders = data => {
    if (Array.isArray(data)) {
      return data
    }

    if (Array.isArray(data.results)) {
      return data.results
    }

    if (Array.isArray(data.orders)) {
      return data.orders
    }

    if (Array.isArray(data.data)) {
      return data.data
    }

    return []
  }

  const fetchSellerOrders = async () => {
    setIsLoading(true)
    setErrorMessage("")

    const accessToken = getAccessToken()

    if (!accessToken) {
      logoutSeller()
      return
    }

    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      })

      const responseText = await response.text()

      let data = {}

      try {
        data = responseText
          ? JSON.parse(responseText)
          : {}
      } catch {
        data = {}
      }

      if (response.status === 401) {
        logoutSeller()
        return
      }

      if (!response.ok) {
        setErrorMessage(
          data.detail ||
          data.error ||
          data.message ||
          "Unable to load customer orders."
        )

        setOrders([])
        return
      }

      const orderList = extractOrders(data)

      setOrders(orderList)
    } catch (error) {
      console.error(
        "Seller Orders Fetch Error:",
        error
      )

      setErrorMessage(
        "Unable to connect to the server. Please try again."
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSellerOrders()
  }, [])

  const toggleOrder = orderId => {
    setOpenOrderId(previousId =>
      previousId === orderId
        ? null
        : orderId
    )
  }

  const totalOrders = orders.length

  const pendingOrders = orders.filter(order => {
    const status = getOrderStatus(order)

    return status === "PENDING"
  }).length

  const confirmedOrders = orders.filter(order => {
    const status = getOrderStatus(order)

    return (
      status === "CONFIRMED" ||
      status === "PROCESSING" ||
      status === "SHIPPED" ||
      status === "DELIVERED"
    )
  }).length

  const getCustomerName = order => {
    return (
      order.buyer_name ||
      order.customer_name ||
      order.buyer?.full_name ||
      order.customer?.full_name ||
      order.buyer?.name ||
      "Customer"
    )
  }

  const getCustomerPhone = order => {
    return (
      order.phone_number ||
      order.buyer_phone ||
      order.customer_phone ||
      order.buyer?.phone_number ||
      order.customer?.phone_number ||
      "Not provided"
    )
  }

  const getDeliveryAddress = order => {
    return (
      order.delivery_address ||
      order.address ||
      order.buyer?.address ||
      "Address not available"
    )
  }

  const getPaymentMethod = order => {
    return (
      order.payment_method ||
      order.payment?.payment_method ||
      "COD"
    )
  }

  const getPaymentStatus = order => {
    return (
      order.payment_status ||
      order.payment?.payment_status ||
      "PENDING"
    )
  }

  const getTotalAmount = order => {
    return (
      order.total_amount ||
      order.total_price ||
      order.amount ||
      0
    )
  }

  if (isLoading) {
    return (
      <div className="seller-orders-page-wrapper">
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

        <Footer />
      </div>
    )
  }

  return (
    <div className="seller-orders-page-wrapper">
      <SellerHeader />

      <main className="seller-orders-page">

        {/* HEADER */}

        <section className="seller-orders-header">

          <div className="seller-page-title">

            <div className="seller-title-icon">
              <ShoppingBag size={28} />
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

          <button
            className="seller-refresh-orders-button"
            onClick={fetchSellerOrders}
            disabled={isLoading}
          >
            <RefreshCw size={17} />
            Refresh
          </button>

        </section>

        {/* ERROR */}

        {errorMessage && (
          <div className="seller-orders-error">

            <AlertCircle size={20} />

            <span>
              {errorMessage}
            </span>

            <button
              onClick={fetchSellerOrders}
            >
              Try Again
            </button>

          </div>
        )}

        {/* STATISTICS */}

        <section className="seller-orders-stats">

          <div className="seller-stat-card">

            <div className="seller-stat-icon">
              <Package size={22} />
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
              <CalendarDays size={22} />
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
              <CheckCircle2 size={22} />
            </div>

            <div>
              <span>
                Active Orders
              </span>

              <strong>
                {confirmedOrders}
              </strong>
            </div>

          </div>

        </section>

        {/* EMPTY */}

        {!errorMessage &&
          orders.length === 0 && (

            <section className="seller-empty-orders">

              <Package size={60} />

              <h2>
                No Customer Orders Yet
              </h2>

              <p>
                When customers buy your products,
                their orders will appear here.
              </p>

              <button
                className="seller-refresh-orders-button"
                onClick={fetchSellerOrders}
              >
                <RefreshCw size={17} />
                Refresh Orders
              </button>

            </section>

          )}

        {/* ORDERS */}

        {orders.length > 0 && (

          <section className="seller-orders-list">

            {orders.map(order => {

              const orderId =
                getOrderId(order)

              const status =
                getOrderStatus(order)

              const items =
                getOrderItems(order)

              const isOpen =
                openOrderId === orderId

              return (

                <article
                  key={orderId}
                  className="seller-order-card"
                >

                  {/* ORDER HEADER */}

                  <div className="seller-order-top">

                    <div className="seller-order-id">

                      <span>
                        Order ID
                      </span>

                      <strong>
                        {order.order_id ||
                          order.id ||
                          "Order"}
                      </strong>

                    </div>

                    <span
                      className={`seller-order-status ${getStatusClass(status)}`}
                    >
                      {status}
                    </span>

                  </div>

                  {/* ORDER CONTENT */}

                  <div className="seller-order-content">

                    {/* CUSTOMER */}

                    <div className="customer-section">

                      <h3>
                        Customer Information
                      </h3>

                      <div className="customer-details">

                        <div className="customer-detail">

                          <User size={19} />

                          <div>
                            <span>
                              Customer Name
                            </span>

                            <strong>
                              {getCustomerName(order)}
                            </strong>
                          </div>

                        </div>

                        <div className="customer-detail">

                          <Phone size={19} />

                          <div>
                            <span>
                              Phone Number
                            </span>

                            <strong>
                              {getCustomerPhone(order)}
                            </strong>
                          </div>

                        </div>

                        <div className="customer-detail customer-address">

                          <MapPin size={19} />

                          <div>
                            <span>
                              Delivery Address
                            </span>

                            <strong>
                              {getDeliveryAddress(order)}

                              {(order.city ||
                                order.state ||
                                order.pincode) && (
                                <>

                                  <br />

                                  {order.city}

                                  {order.city &&
                                    order.state &&
                                    ", "}

                                  {order.state}

                                  {(order.city ||
                                    order.state) &&
                                    order.pincode &&
                                    " - "}

                                  {order.pincode}

                                </>
                              )}

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
                          <CreditCard size={16} />
                          Payment Method
                        </span>

                        <strong>
                          {getPaymentMethod(order)}
                        </strong>

                      </div>

                      <div className="summary-row">

                        <span>
                          Payment Status
                        </span>

                        <strong>
                          {getPaymentStatus(order)}
                        </strong>

                      </div>

                      <div className="summary-total">

                        <span>
                          <IndianRupee size={17} />
                          Order Total
                        </span>

                        <strong>
                          ₹
                          {formatPrice(
                            getTotalAmount(order)
                          )}
                        </strong>

                      </div>

                    </div>

                  </div>

                  {/* ORDER FOOTER */}

                  <div className="seller-order-footer">

                    <div className="order-date">

                      <CalendarDays size={18} />

                      <span>
                        Ordered on{" "}
                        {formatDate(
                          order.created_at ||
                          order.order_date ||
                          order.created
                        )}
                      </span>

                    </div>

                    <button
                      className="products-toggle-button"
                      onClick={() =>
                        toggleOrder(orderId)
                      }
                    >

                      <Package size={18} />

                      {isOpen
                        ? "Hide Products"
                        : `View Products (${items.length})`}

                      {isOpen ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}

                    </button>

                  </div>

                  {/* PRODUCTS */}

                  {isOpen && (

                    <div className="seller-products-section">

                      <h3>
                        Products in This Order
                      </h3>

                      {items.length > 0 ? (

                        <div className="seller-products-list">

                          {items.map((item, index) => {

                            const quantity =
                              Number(
                                item.quantity
                              ) || 0

                            const price =
                              Number(
                                item.price ||
                                item.unit_price
                              ) || 0

                            const subtotal =
                              Number(
                                item.subtotal ||
                                item.total
                              ) ||
                              price * quantity

                            const itemId =
                              item.id ||
                              item.product_id ||
                              index

                            return (

                              <div
                                key={itemId}
                                className="seller-product-item"
                              >

                                <img
                                  src={
                                    item.product_image ||
                                    item.image_url ||
                                    "/placeholder.png"
                                  }
                                  alt={
                                    item.product_name ||
                                    item.name ||
                                    "Product"
                                  }
                                  onError={event => {
                                    event.currentTarget.src =
                                      "/placeholder.png"
                                  }}
                                />

                                <div className="seller-product-info">

                                  <strong>
                                    {item.product_name ||
                                      item.name ||
                                      "Product"}
                                  </strong>

                                  <span>
                                    Quantity: {quantity}
                                  </span>

                                  <span>
                                    Price: ₹
                                    {formatPrice(price)}
                                  </span>

                                </div>

                                <div className="seller-product-price">

                                  <span>
                                    Subtotal
                                  </span>

                                  <strong>
                                    ₹
                                    {formatPrice(subtotal)}
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

      <Footer />
    </div>
  )
}

export default SellerOrders