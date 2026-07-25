import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  RefreshCw,
  AlertCircle
} from "lucide-react"
import Header from "../header"
import Footer from "../Footer"
import API_BASE_URL from "../../config/api"
import "./index.css"

const API_URL = `${API_BASE_URL}/api/orders`

const Cart = () => {
  const navigate = useNavigate()

  const [cart, setCart] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const [updatingItemId, setUpdatingItemId] = useState(null)

  const getAccessToken = () => {
    return localStorage.getItem("accessToken")
  }

  const fetchCart = async () => {
    const accessToken = getAccessToken()

    if (!accessToken) {
      navigate("/login")
      return
    }

    setIsLoading(true)
    setErrorMessage("")

    try {
      const response = await fetch(
        `${API_URL}/cart/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        }
      )

      const data = await response.json()

      if (response.status === 401) {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("user")

        navigate("/login")
        return
      }

      if (!response.ok) {
        setErrorMessage(
          data.error ||
            data.detail ||
            "Unable to load your cart."
        )
        return
      }

      setCart(data)
    } catch (error) {
      console.error("Cart Error:", error)

      setErrorMessage(
        "Unable to connect to the server. Please try again."
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  const updateQuantity = async (
    itemId,
    quantity
  ) => {
    if (quantity < 1) {
      return
    }

    const accessToken = getAccessToken()

    if (!accessToken) {
      navigate("/login")
      return
    }

    setUpdatingItemId(itemId)

    try {
      const response = await fetch(
        `${API_URL}/cart/items/${itemId}/`,
        {
          method: "PATCH",

          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            quantity
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(
          data.error ||
            data.detail ||
            "Unable to update quantity."
        )
        return
      }

      await fetchCart()
    } catch (error) {
      console.error(
        "Update Quantity Error:",
        error
      )

      alert(
        "Unable to connect to the server."
      )
    } finally {
      setUpdatingItemId(null)
    }
  }

  const removeItem = async itemId => {
    const shouldRemove = window.confirm(
      "Are you sure you want to remove this product?"
    )

    if (!shouldRemove) {
      return
    }

    const accessToken = getAccessToken()

    if (!accessToken) {
      navigate("/login")
      return
    }

    try {
      const response = await fetch(
        `${API_URL}/cart/items/${itemId}/remove/`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(
          data.error ||
            data.detail ||
            "Unable to remove product."
        )
        return
      }

      await fetchCart()
    } catch (error) {
      console.error(
        "Remove Cart Item Error:",
        error
      )

      alert(
        "Unable to connect to the server."
      )
    }
  }

  const totalItems =
    cart?.items?.reduce(
      (total, item) =>
        total + item.quantity,
      0
    ) || 0

  return (
    <>
      <Header />

      <main className="cart-page">
        <section className="cart-hero">
          <div className="cart-hero-icon">
            <ShoppingCart size={34} />
          </div>

          <div>
            <h1>
              Shopping Cart
            </h1>

            <p>
              Review your selected farm products before checkout.
            </p>
          </div>
        </section>

        {isLoading && (
          <div className="cart-state">
            <RefreshCw
              size={34}
              className="cart-loading-icon"
            />

            <h2>
              Loading Your Cart
            </h2>

            <p>
              Please wait while we load your products.
            </p>
          </div>
        )}

        {!isLoading && errorMessage && (
          <div className="cart-state cart-error">
            <AlertCircle size={40} />

            <h2>
              Unable to Load Cart
            </h2>

            <p>
              {errorMessage}
            </p>

            <button
              className="cart-retry-button"
              onClick={fetchCart}
            >
              <RefreshCw size={17} />
              Try Again
            </button>
          </div>
        )}

        {!isLoading &&
          !errorMessage &&
          cart &&
          cart.items.length === 0 && (
            <div className="cart-state">
              <ShoppingCart size={58} />

              <h2>
                Your Cart Is Empty
              </h2>

              <p>
                You have not added any products yet.
              </p>

              <button
                className="cart-shop-button"
                onClick={() => navigate("/")}
              >
                Continue Shopping
                <ArrowRight size={18} />
              </button>
            </div>
          )}

        {!isLoading &&
          !errorMessage &&
          cart &&
          cart.items.length > 0 && (
            <div className="cart-layout">
              <section className="cart-items-section">
                <div className="cart-section-header">
                  <div>
                    <h2>
                      Your Products
                    </h2>

                    <p>
                      {totalItems} item
                      {totalItems !== 1
                        ? "s"
                        : ""}{" "}
                      in your cart
                    </p>
                  </div>
                </div>

                <div className="cart-items-list">
                  {cart.items.map(item => (
                    <article
                      className="cart-product-card"
                      key={item.id}
                    >
                      <div className="cart-product-image-wrapper">
                        <img
                          src={
                            item.product.image_url
                          }
                          alt={
                            item.product.name
                          }
                          className="cart-product-image"
                          onError={event => {
                            event.currentTarget.src =
                              "https://via.placeholder.com/500x350?text=No+Image"
                          }}
                        />
                      </div>

                      <div className="cart-product-content">
                        <div className="cart-product-top">
                          <div>
                            <span className="cart-product-category">
                              {
                                item.product
                                  .category
                              }
                            </span>

                            <h3>
                              {
                                item.product
                                  .name
                              }
                            </h3>

                            <p className="cart-product-location">
                              📍{" "}
                              {
                                item.product
                                  .location
                              }
                            </p>
                          </div>

                          <button
                            className="cart-remove-button"
                            onClick={() =>
                              removeItem(
                                item.id
                              )
                            }
                            title="Remove product"
                          >
                            <Trash2 size={19} />
                          </button>
                        </div>

                        <div className="cart-product-bottom">
                          <div className="cart-price">
                            ₹
                            {Number(
                              item.product
                                .price
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </div>

                          <div className="cart-quantity-control">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity -
                                    1
                                )
                              }
                              disabled={
                                item.quantity <=
                                  1 ||
                                updatingItemId ===
                                  item.id
                              }
                            >
                              <Minus size={16} />
                            </button>

                            <span>
                              {updatingItemId ===
                              item.id
                                ? "..."
                                : item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity +
                                    1
                                )
                              }
                              disabled={
                                updatingItemId ===
                                item.id
                              }
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <div className="cart-subtotal">
                            <span>
                              Subtotal
                            </span>

                            <strong>
                              ₹
                              {Number(
                                item.subtotal
                              ).toLocaleString(
                                "en-IN"
                              )}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <aside className="cart-summary-card">
                <div className="cart-summary-header">
                  <h2>
                    Order Summary
                  </h2>

                  <span>
                    {totalItems} items
                  </span>
                </div>

                <div className="cart-summary-row">
                  <span>
                    Subtotal
                  </span>

                  <strong>
                    ₹
                    {Number(
                      cart.total_amount
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>

                <div className="cart-summary-row">
                  <span>
                    Delivery
                  </span>

                  <strong className="free-delivery">
                    FREE
                  </strong>
                </div>

                <div className="cart-summary-divider"></div>

                <div className="cart-total-row">
                  <span>
                    Total
                  </span>

                  <strong>
                    ₹
                    {Number(
                      cart.total_amount
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>

                <button
                  className="cart-checkout-button"
                  onClick={() =>
                    navigate("/checkout")
                  }
                >
                  Proceed to Checkout
                  <ArrowRight size={19} />
                </button>

                <button
                  className="cart-continue-button"
                  onClick={() =>
                    navigate("/")
                  }
                >
                  Continue Shopping
                </button>
              </aside>
            </div>
          )}
      </main>

      <Footer />
    </>
  )
}

export default Cart