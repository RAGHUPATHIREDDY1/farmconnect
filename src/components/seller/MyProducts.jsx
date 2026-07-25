import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import {
  Package,
  Plus,
  MapPin,
  IndianRupee,
  Boxes,
  Pencil,
  Trash2,
  RefreshCw,
  AlertCircle,
  Search,
  X
} from "lucide-react"

import SellerHeader from "./SellerHeader"
import Footer from "../Footer"
import "./seller.css"

const API_URL =
  "https://farmconnectbackend.onrender.com/api/products"

const FALLBACK_IMAGE =
  "https://via.placeholder.com/500x350?text=No+Image"

const MyProducts = () => {
  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [deletingProductId, setDeletingProductId] =
    useState(null)

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

  const fetchProducts = async () => {
    setIsLoading(true)
    setErrorMessage("")

    const accessToken = getAccessToken()

    if (!accessToken) {
      logoutSeller()
      return
    }

    try {
      const response = await fetch(
        `${API_URL}/seller/products/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json"
          }
        }
      )

      const text = await response.text()

      let data = {}

      try {
        data = text ? JSON.parse(text) : {}
      } catch {
        data = {
          message: text
        }
      }

      if (response.status === 401) {
        logoutSeller()
        return
      }

      if (!response.ok) {
        setErrorMessage(
          data?.detail ||
            data?.error ||
            data?.message ||
            "Unable to load products."
        )

        return
      }

      let productList = []

      if (Array.isArray(data)) {
        productList = data
      } else if (Array.isArray(data.results)) {
        productList = data.results
      } else if (Array.isArray(data.products)) {
        productList = data.products
      }

      setProducts(productList)
    } catch (error) {
      console.error("Fetch Products Error:", error)

      setErrorMessage(
        "Unable to connect to the server. Please try again."
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDeleteProduct = async productId => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    )

    if (!confirmDelete) {
      return
    }

    const accessToken = getAccessToken()

    if (!accessToken) {
      logoutSeller()
      return
    }

    setDeletingProductId(productId)

    try {
      const response = await fetch(
        `${API_URL}/seller/products/${productId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json"
          }
        }
      )

      if (response.status === 401) {
        logoutSeller()
        return
      }

      if (!response.ok) {
        const text = await response.text()

        let data = {}

        try {
          data = text ? JSON.parse(text) : {}
        } catch {
          data = {}
        }

        alert(
          data?.detail ||
            data?.error ||
            "Unable to delete product."
        )

        return
      }

      setProducts(previousProducts =>
        previousProducts.filter(
          product => product.id !== productId
        )
      )

      alert("Product deleted successfully.")
    } catch (error) {
      console.error("Delete Product Error:", error)

      alert(
        "Unable to connect to the server."
      )
    } finally {
      setDeletingProductId(null)
    }
  }

  const handleEditProduct = productId => {
    navigate(
      `/seller/products/edit/${productId}`
    )
  }

  const filteredProducts = products.filter(product => {
    const searchValue =
      searchTerm.toLowerCase().trim()

    if (!searchValue) {
      return true
    }

    const name =
      String(product.name || "").toLowerCase()

    const category =
      String(product.category || "").toLowerCase()

    const location =
      String(product.location || "").toLowerCase()

    return (
      name.includes(searchValue) ||
      category.includes(searchValue) ||
      location.includes(searchValue)
    )
  })

  const formatPrice = price => {
    return Number(price || 0).toLocaleString(
      "en-IN"
    )
  }

  return (
    <div className="seller-products-page">
      <SellerHeader />

      <main className="seller-products-container">
        <div className="seller-products-header">
          <div className="seller-products-heading">
            <div className="seller-products-icon">
              <Package size={28} />
            </div>

            <div>
              <h1>My Products</h1>

              <p>
                Manage the products you are selling
                on FarmConnect.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="seller-add-product-button"
            onClick={() =>
              navigate("/seller/add-product")
            }
          >
            <Plus size={19} />
            Add Product
          </button>
        </div>

        {!isLoading &&
          !errorMessage &&
          products.length > 0 && (
            <div className="seller-products-toolbar">
              <div className="seller-products-search">
                <Search size={18} />

                <input
                  type="text"
                  placeholder="Search your products..."
                  value={searchTerm}
                  onChange={event =>
                    setSearchTerm(
                      event.target.value
                    )
                  }
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={() =>
                      setSearchTerm("")
                    }
                    aria-label="Clear search"
                  >
                    <X size={17} />
                  </button>
                )}
              </div>

              <span className="seller-products-count">
                {filteredProducts.length} Product
                {filteredProducts.length !== 1
                  ? "s"
                  : ""}
              </span>
            </div>
          )}

        {isLoading && (
          <div className="seller-products-state">
            <RefreshCw
              size={34}
              className="seller-loading-icon"
            />

            <h2>
              Loading Products
            </h2>

            <p>
              Please wait while we load your products.
            </p>
          </div>
        )}

        {!isLoading &&
          errorMessage && (
            <div className="seller-products-state seller-products-error">
              <AlertCircle size={40} />

              <h2>
                Unable to Load Products
              </h2>

              <p>
                {errorMessage}
              </p>

              <button
                type="button"
                className="seller-retry-button"
                onClick={fetchProducts}
              >
                <RefreshCw size={17} />
                Try Again
              </button>
            </div>
          )}

        {!isLoading &&
          !errorMessage &&
          products.length === 0 && (
            <div className="seller-products-state">
              <Package size={56} />

              <h2>
                No Products Yet
              </h2>

              <p>
                You have not added any products
                to your store yet.
              </p>

              <button
                type="button"
                className="seller-add-product-button"
                onClick={() =>
                  navigate("/seller/add-product")
                }
              >
                <Plus size={18} />
                Add Your First Product
              </button>
            </div>
          )}

        {!isLoading &&
          !errorMessage &&
          products.length > 0 &&
          filteredProducts.length === 0 && (
            <div className="seller-products-state">
              <Search size={48} />

              <h2>
                No Products Found
              </h2>

              <p>
                No product matches your search.
              </p>

              <button
                type="button"
                className="seller-retry-button"
                onClick={() =>
                  setSearchTerm("")
                }
              >
                <X size={17} />
                Clear Search
              </button>
            </div>
          )}

        {!isLoading &&
          !errorMessage &&
          filteredProducts.length > 0 && (
            <div className="seller-products-grid">
              {filteredProducts.map(product => (
                <article
                  className="seller-product-card"
                  key={product.id}
                >
                  <div className="seller-product-image-wrapper">
                    <img
                      src={
                        product.image_url ||
                        FALLBACK_IMAGE
                      }
                      alt={
                        product.name ||
                        "Product"
                      }
                      className="seller-product-image"
                      onError={event => {
                        event.currentTarget.onerror =
                          null

                        event.currentTarget.src =
                          FALLBACK_IMAGE
                      }}
                    />

                    <span className="seller-product-category">
                      {product.category ||
                        "PRODUCT"}
                    </span>
                  </div>

                  <div className="seller-product-card-content">
                    <h2>
                      {product.name}
                    </h2>

                    <p className="seller-product-description">
                      {product.description ||
                        "No description available."}
                    </p>

                    <div className="seller-product-details">
                      <div>
                        <IndianRupee size={16} />

                        <strong>
                          ₹
                          {formatPrice(
                            product.price
                          )}
                        </strong>
                      </div>

                      <div>
                        <Boxes size={16} />

                        <span>
                          {product.available_quantity ||
                            0}
                        </span>
                      </div>
                    </div>

                    <div className="seller-product-location">
                      <MapPin size={16} />

                      <span>
                        {product.location ||
                          "Location not available"}
                      </span>
                    </div>

                    <div className="seller-product-status">
                      <span
                        className={
                          product.is_available
                            ? "product-available"
                            : "product-unavailable"
                        }
                      >
                        {product.is_available
                          ? "Available"
                          : "Unavailable"}
                      </span>
                    </div>

                    <div className="seller-product-actions">
                      <button
                        type="button"
                        className="seller-edit-button"
                        onClick={() =>
                          handleEditProduct(
                            product.id
                          )
                        }
                        disabled={
                          deletingProductId ===
                          product.id
                        }
                      >
                        <Pencil size={17} />
                        Edit
                      </button>

                      <button
                        type="button"
                        className="seller-delete-button"
                        onClick={() =>
                          handleDeleteProduct(
                            product.id
                          )
                        }
                        disabled={
                          deletingProductId ===
                          product.id
                        }
                      >
                        {deletingProductId ===
                        product.id ? (
                          <>
                            <RefreshCw
                              size={17}
                              className="seller-loading-icon"
                            />
                            Deleting...
                          </>
                        ) : (
                          <>
                            <Trash2 size={17} />
                            Delete
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
      </main>

      <Footer />
    </div>
  )
}

export default MyProducts