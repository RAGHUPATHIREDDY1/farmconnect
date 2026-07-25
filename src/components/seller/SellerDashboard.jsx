import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"

import {
  Plus,
  Package,
  ShoppingBag,
  IndianRupee,
  ArrowRight,
  Apple,
  Carrot,
  Tractor,
  Beef,
  TrendingUp,
  RefreshCw,
  AlertCircle,
  BarChart3
} from "lucide-react"

import SellerHeader from "./SellerHeader"
import Footer from "../footer"
import "./seller.css"

const API_BASE_URL =
  "https://farmconnectbackend.onrender.com/api"

const SellerDashboard = () => {
  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  const getAccessToken = () => {
    return localStorage.getItem("accessToken")
  }

  const logoutSeller = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("user")
    localStorage.removeItem("currentUser")

    navigate("/seller/login", {
      replace: true
    })
  }

  const fetchDashboardData = async () => {
    const accessToken = getAccessToken()

    if (!accessToken) {
      logoutSeller()
      return
    }

    setIsLoading(true)
    setErrorMessage("")

    try {
      const productsResponse = await fetch(
        `${API_BASE_URL}/products/seller/products/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json"
          }
        }
      )

      if (productsResponse.status === 401) {
        logoutSeller()
        return
      }

      const productsData =
        await productsResponse.json()

      if (!productsResponse.ok) {
        setErrorMessage(
          productsData.detail ||
            productsData.error ||
            "Unable to load dashboard data."
        )

        return
      }

      const productList = Array.isArray(productsData)
        ? productsData
        : productsData.results ||
          productsData.products ||
          []

      setProducts(productList)

      /*
        Change this endpoint if your seller order
        endpoint has a different URL.
      */

      const ordersResponse = await fetch(
        `${API_BASE_URL}/orders/seller-orders/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json"
          }
        }
      )

      if (ordersResponse.ok) {
        const ordersData =
          await ordersResponse.json()

        const orderList = Array.isArray(
          ordersData
        )
          ? ordersData
          : ordersData.results ||
            ordersData.orders ||
            []

        setOrders(orderList)
      }
    } catch (error) {
      console.error(
        "Seller Dashboard Error:",
        error
      )

      setErrorMessage(
        "Unable to connect to the server."
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const totalProducts = products.length

  const totalOrders = orders.length

  const totalEarnings = orders.reduce(
    (total, order) => {
      return (
        total +
        Number(
          order.total_amount ||
            order.total ||
            0
        )
      )
    },
    0
  )

  const availableProducts =
    products.filter(
      product =>
        product.is_available !== false
    ).length

  const recentOrders = orders.slice(0, 5)

  const formatAmount = amount => {
    return Number(
      amount || 0
    ).toLocaleString("en-US")
  }

  const getOrderStatusClass = status => {
    return String(
      status || "PENDING"
    )
      .toLowerCase()
      .replaceAll("_", "-")
  }

  const getCategoryCount = category => {
    return products.filter(
      product =>
        product.category === category
    ).length
  }

  if (isLoading) {
    return (
      <>
        <SellerHeader />

        <main className="seller-dashboard-loading">
          <RefreshCw
            size={42}
            className="seller-loading-icon"
          />

          <h2>
            Loading Seller Dashboard
          </h2>

          <p>
            Preparing your farm business overview...
          </p>
        </main>

        <Footer />
      </>
    )
  }

  return (
    <>
      <SellerHeader />

      <main className="seller-home-dashboard">

        {errorMessage && (
          <div className="seller-dashboard-error">
            <AlertCircle size={20} />

            <span>
              {errorMessage}
            </span>

            <button
              onClick={fetchDashboardData}
            >
              <RefreshCw size={16} />
              Retry
            </button>
          </div>
        )}

        {/* HERO */}

        <section className="seller-welcome-section">

          <div className="seller-welcome-content">

            <span className="seller-small-label">
              🌾 SELLER CENTER
            </span>

            <h1>
              Grow Your Farm Business
              <br />
              With FarmConnect
            </h1>

            <p>
              Connect directly with buyers,
              showcase your products, and grow
              your farm business across India.
            </p>

            <div className="seller-hero-actions">

              <button
                className="seller-primary-action"
                onClick={() =>
                  navigate(
                    "/seller/add-product"
                  )
                }
              >
                <Plus size={20} />
                Add New Product
              </button>

              <button
                className="seller-secondary-action"
                onClick={() =>
                  navigate(
                    "/seller/products"
                  )
                }
              >
                <Package size={19} />
                Manage Products
              </button>

            </div>

          </div>

          <div className="seller-welcome-image">

            <div className="seller-dashboard-visual">

              <div className="seller-visual-icon">
                🌾
              </div>

              <h3>
                Your Farm Store
              </h3>

              <p>
                Reach more buyers with
                FarmConnect.
              </p>

              <div className="seller-visual-stats">

                <div>
                  <strong>
                    {totalProducts}
                  </strong>

                  <span>
                    Products
                  </span>
                </div>

                <div>
                  <strong>
                    {totalOrders}
                  </strong>

                  <span>
                    Orders
                  </span>
                </div>

              </div>

            </div>

            <div className="seller-floating-card">

              <TrendingUp size={20} />

              <div>

                <strong>
                  Your business is growing
                </strong>

                <span>
                  Keep adding great products!
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* STATS */}

        <section className="seller-stats-section">

          <div className="seller-stat-box">

            <div className="seller-stat-box-icon">
              <Package size={23} />
            </div>

            <div>

              <span>
                Total Products
              </span>

              <h2>
                {totalProducts}
              </h2>

              <small>
                {availableProducts} active listings
              </small>

            </div>

          </div>

          <div className="seller-stat-box">

            <div className="seller-stat-box-icon">
              <ShoppingBag size={23} />
            </div>

            <div>

              <span>
                Total Orders
              </span>

              <h2>
                {totalOrders}
              </h2>

              <small>
                Customer orders
              </small>

            </div>

          </div>

          <div className="seller-stat-box">

            <div className="seller-stat-box-icon">
              <IndianRupee size={23} />
            </div>

            <div>

              <span>
                Total Earnings
              </span>

              <h2>
                ₹{formatAmount(totalEarnings)}
              </h2>

              <small>
                From your orders
              </small>

            </div>

          </div>

          <div className="seller-stat-box">

            <div className="seller-stat-box-icon">
              <BarChart3 size={23} />
            </div>

            <div>

              <span>
                Store Categories
              </span>

              <h2>
                {
                  new Set(
                    products.map(
                      product =>
                        product.category
                    )
                  ).size
                }
              </h2>

              <small>
                Product categories
              </small>

            </div>

          </div>

        </section>

        {/* STORE CATEGORIES */}

        <section className="seller-store-section">

          <div className="seller-section-title">

            <div>

              <span>
                YOUR STORE
              </span>

              <h2>
                Manage Your Products
              </h2>

            </div>

            <button
              onClick={() =>
                navigate(
                  "/seller/products"
                )
              }
            >
              View All
              <ArrowRight size={17} />
            </button>

          </div>

          <div className="seller-category-grid">

            <button
              className="seller-category-card fruits-card"
              onClick={() =>
                navigate(
                  "/seller/add-product"
                )
              }
            >

              <div className="seller-category-icon">
                <Apple size={29} />
              </div>

              <div>

                <h3>
                  Fruits
                </h3>

                <p>
                  {getCategoryCount(
                    "FRUIT"
                  )} products
                </p>

              </div>

              <ArrowRight size={18} />

            </button>

            <button
              className="seller-category-card vegetables-card"
              onClick={() =>
                navigate(
                  "/seller/add-product"
                )
              }
            >

              <div className="seller-category-icon">
                <Carrot size={29} />
              </div>

              <div>

                <h3>
                  Vegetables
                </h3>

                <p>
                  {getCategoryCount(
                    "VEGETABLE"
                  )} products
                </p>

              </div>

              <ArrowRight size={18} />

            </button>

            <button
              className="seller-category-card animals-card"
              onClick={() =>
                navigate(
                  "/seller/add-product"
                )
              }
            >

              <div className="seller-category-icon">
                <Beef size={29} />
              </div>

              <div>

                <h3>
                  Animals
                </h3>

                <p>
                  {getCategoryCount(
                    "ANIMAL"
                  )} products
                </p>

              </div>

              <ArrowRight size={18} />

            </button>

            <button
              className="seller-category-card machines-card"
              onClick={() =>
                navigate(
                  "/seller/add-product"
                )
              }
            >

              <div className="seller-category-icon">
                <Tractor size={29} />
              </div>

              <div>

                <h3>
                  Machines
                </h3>

                <p>
                  {getCategoryCount(
                    "MACHINE"
                  )} products
                </p>

              </div>

              <ArrowRight size={18} />

            </button>

          </div>

        </section>

        {/* QUICK ACTION */}

        <section className="seller-action-banner">

          <div>

            <span>
              READY TO SELL?
            </span>

            <h2>
              Put your farm products in front
              of more buyers.
            </h2>

            <p>
              Add your products today and start
              connecting with customers directly.
            </p>

          </div>

          <button
            onClick={() =>
              navigate(
                "/seller/add-product"
              )
            }
          >
            Add Product
            <ArrowRight size={18} />
          </button>

        </section>

        {/* RECENT ORDERS */}

        <section className="seller-recent-section">

          <div className="seller-section-title">

            <div>

              <span>
                RECENT ACTIVITY
              </span>

              <h2>
                Recent Orders
              </h2>

            </div>

            <button
              onClick={() =>
                navigate(
                  "/seller/orders"
                )
              }
            >
              View Orders
              <ArrowRight size={17} />
            </button>

          </div>

          {recentOrders.length === 0 ? (

            <div className="seller-empty-orders">

              <ShoppingBag size={42} />

              <h3>
                No orders yet
              </h3>

              <p>
                Your recent customer orders
                will appear here.
              </p>

            </div>

          ) : (

            <div className="seller-recent-orders">

              {recentOrders.map(
                order => (

                  <div
                    className="seller-order-item"
                    key={
                      order.id ||
                      order.order_id
                    }
                  >

                    <div className="seller-order-product-icon">
                      📦
                    </div>

                    <div className="seller-order-details">

                      <strong>
                        Order #
                        {order.order_id ||
                          order.id}
                      </strong>

                      <span>
                        {order.created_at
                          ? new Date(
                              order.created_at
                            ).toLocaleDateString(
                              "en-IN"
                            )
                          : "Recent order"}
                      </span>

                    </div>

                    <strong>
                      ₹
                      {formatAmount(
                        order.total_amount ||
                          order.total
                      )}
                    </strong>

                    <span
                      className={`seller-order-status ${getOrderStatusClass(
                        order.status
                      )}`}
                    >
                      {String(
                        order.status ||
                          "PENDING"
                      ).replaceAll(
                        "_",
                        " "
                      )}
                    </span>

                  </div>

                )
              )}

            </div>

          )}

        </section>

      </main>

      <Footer />

    </>
  )
}

export default SellerDashboard