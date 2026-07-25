import {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom"
import {
  ArrowLeft,
  ShoppingCart,
  MapPin,
  Package,
  User,
  Sparkles
} from "lucide-react"
import API_BASE_URL from "../../config/api"
import "./index.css"

const ProductDetails = () => {
  const {productId} = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] =
    useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchProductDetails()
  }, [productId])

  const fetchProductDetails = async () => {
    try {
      setLoading(true)
      setError("")

      const response = await fetch(
        `${API_BASE_URL}/api/products/${productId}/`
      )

      if (!response.ok) {
        throw new Error(
          "Product not found"
        )
      }

      const data =
        await response.json()

      setProduct(data)

      fetchRelatedProducts(data)
    } catch (error) {
      console.error(
        "Product Details Error:",
        error
      )

      setError(
        "Unable to load product details."
      )
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedProducts =
    async currentProduct => {
      try {
        const response =
          await fetch(
            `${API_BASE_URL}/api/products/`
          )

        if (!response.ok) {
          return
        }

        const data =
          await response.json()

        const products =
          Array.isArray(data)
            ? data
            : data.results ||
              data.products ||
              []

        const related =
          products
            .filter(
              item =>
                item.id !==
                  currentProduct.id &&
                item.category ===
                  currentProduct.category &&
                item.is_available !==
                  false
            )
            .slice(0, 4)

        setRelatedProducts(
          related
        )
      } catch (error) {
        console.error(
          "Failed to load related products",
          error
        )
      }
    }

  const handleAddToCart =
    async () => {
      const accessToken =
        localStorage.getItem(
          "accessToken"
        )

      if (!accessToken) {
        alert(
          "Please login as a buyer first."
        )

        navigate("/login")
        return
      }

      try {
        const response =
          await fetch(
            `${API_BASE_URL}/api/orders/cart/add/`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${accessToken}`
              },

              body: JSON.stringify({
                product_id:
                  product.id,

                quantity: 1
              })
            }
          )

        const data =
          await response.json()

        if (
          response.status === 401
        ) {
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
          return
        }

        if (!response.ok) {
          alert(
            data.error ||
              data.detail ||
              "Unable to add product to cart."
          )

          return
        }

        alert(
          `${product.name} added to cart successfully.`
        )
      } catch (error) {
        console.error(
          "Add To Cart Error:",
          error
        )

        alert(
          "Unable to connect to the server."
        )
      }
    }

  const handleRelatedProductClick =
    id => {
      navigate(
        `/products/${id}`
      )
    }

  if (loading) {
    return (
      <div className="product-details-loading">
        <div className="product-loading-spinner"></div>

        <p>
          Loading product details...
        </p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="product-details-error">
        <h2>
          Product Not Found
        </h2>

        <p>
          {error}
        </p>

        <button
          onClick={() =>
            navigate(-1)
          }
        >
          Go Back
        </button>
      </div>
    )
  }

  return (
    <div className="product-details-page">
      <div className="product-details-container">
        <button
          className="product-back-button"
          onClick={() =>
            navigate(-1)
          }
        >
          <ArrowLeft
            size={18}
          />

          Back
        </button>

        <div className="product-details-main">
          <div className="product-image-section">
            {product.image_url ? (
              <img
                src={
                  product.image_url
                }
                alt={
                  product.name
                }
                className="product-main-image"
                onError={event => {
                  event.currentTarget.style.display =
                    "none"
                }}
              />
            ) : (
              <div className="product-image-placeholder">
                <Package
                  size={80}
                />

                <span>
                  No Image Available
                </span>
              </div>
            )}
          </div>

          <div className="product-information">
            <div className="product-category-badge">
              {product.category}
            </div>

            <h1>
              {product.name}
            </h1>

            <p className="product-description">
              {product.description}
            </p>

            <div className="product-price">
              ₹
              {Number(
                product.price
              ).toLocaleString(
                "en-IN"
              )}

              {product.unit && (
                <span>
                  / {product.unit}
                </span>
              )}
            </div>

            <div className="product-information-grid">
              <div className="product-info-item">
                <MapPin
                  size={19}
                />

                <div>
                  <span>
                    Location
                  </span>

                  <strong>
                    {product.location}
                  </strong>
                </div>
              </div>

              <div className="product-info-item">
                <Package
                  size={19}
                />

                <div>
                  <span>
                    Available Quantity
                  </span>

                  <strong>
                    {
                      product.available_quantity
                    }

                    {product.unit &&
                      ` ${product.unit}`}
                  </strong>
                </div>
              </div>

              {product.seller && (
                <div className="product-info-item">
                  <User
                    size={19}
                  />

                  <div>
                    <span>
                      Seller
                    </span>

                    <strong>
                      {
                        product.seller
                          .full_name ||
                          product.seller
                            .email ||
                          "Farm Seller"
                      }
                    </strong>
                  </div>
                </div>
              )}
            </div>

            <div className="product-availability">
              <span></span>

              Available for purchase
            </div>

            <button
              className="product-add-cart-button"
              onClick={
                handleAddToCart
              }
            >
              <ShoppingCart
                size={20}
              />

              Add to Cart
            </button>
          </div>
        </div>

        <section className="related-products-section">
          <div className="related-products-heading">
            <div>
              <div className="related-title-wrapper">
                <Sparkles
                  size={20}
                />

                <h2>
                  Related Products
                </h2>
              </div>

              <p>
                More products you may be interested in
              </p>
            </div>
          </div>

          {relatedProducts.length >
          0 ? (
            <div className="related-products-grid">
              {relatedProducts.map(
                relatedProduct => (
                  <div
                    key={
                      relatedProduct.id
                    }
                    className="related-product-card"
                    onClick={() =>
                      handleRelatedProductClick(
                        relatedProduct.id
                      )
                    }
                  >
                    <div className="related-product-image-wrapper">
                      {relatedProduct.image_url ? (
                        <img
                          src={
                            relatedProduct.image_url
                          }
                          alt={
                            relatedProduct.name
                          }
                        />
                      ) : (
                        <div className="related-product-placeholder">
                          <Package
                            size={40}
                          />
                        </div>
                      )}

                      <span>
                        {
                          relatedProduct.category
                        }
                      </span>
                    </div>

                    <div className="related-product-content">
                      <h3>
                        {
                          relatedProduct.name
                        }
                      </h3>

                      <p>
                        {
                          relatedProduct.location
                        }
                      </p>

                      <div className="related-product-bottom">
                        <strong>
                          ₹
                          {Number(
                            relatedProduct.price
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                        <button
                          onClick={event => {
                            event.stopPropagation()

                            navigate(
                              `/products/${relatedProduct.id}`
                            )
                          }}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="no-related-products">
              <Package
                size={30}
              />

              <p>
                No related products available right now.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default ProductDetails