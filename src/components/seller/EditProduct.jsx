import {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom"
import {
  Package,
  MapPin,
  IndianRupee,
  Boxes,
  FileText,
  Image,
  ArrowLeft,
  Save,
  AlertCircle,
  CheckCircle2
} from "lucide-react"
import SellerHeader from "./SellerHeader"
import Footer from "../Footer"
import API_BASE_URL from "../../config/api"
import "./seller.css"

const INITIAL_PRODUCT_DATA = {
  name: "",
  category: "",
  price: "",
  available_quantity: "",
  location: "",
  description: "",
  image_url: ""
}

const EditProduct = () => {
  const navigate = useNavigate()
  const {productId} = useParams()

  const [productData, setProductData] =
    useState(INITIAL_PRODUCT_DATA)

  const [isLoading, setIsLoading] =
    useState(true)

  const [isSaving, setIsSaving] =
    useState(false)

  const [errorMessage, setErrorMessage] =
    useState("")

  const [successMessage, setSuccessMessage] =
    useState("")

  const getAccessToken = () => {
    return localStorage.getItem(
      "accessToken"
    )
  }

  const logoutSeller = () => {
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

    navigate(
      "/seller/login",
      {
        replace: true
      }
    )
  }

  const getBackendError = data => {
    if (!data) {
      return "Something went wrong."
    }

    if (typeof data === "string") {
      return data
    }

    if (data.detail) {
      return data.detail
    }

    if (data.error) {
      return data.error
    }

    const firstError =
      Object.values(data)
        .flat()
        .find(Boolean)

    return (
      firstError ||
      "Please check the product details."
    )
  }

  const fetchProduct = async () => {
    const accessToken =
      getAccessToken()

    if (!accessToken) {
      logoutSeller()
      return
    }

    try {
      setIsLoading(true)
      setErrorMessage("")

      const response =
        await fetch(
          `${API_BASE_URL}/api/products/seller/products/${productId}/`,
          {
            method: "GET",

            headers: {
              Authorization:
                `Bearer ${accessToken}`,

              Accept:
                "application/json"
            }
          }
        )

      const data =
        await response.json()

      if (
        response.status === 401
      ) {
        logoutSeller()
        return
      }

      if (!response.ok) {
        setErrorMessage(
          getBackendError(data)
        )

        return
      }

      setProductData({
        name:
          data.name || "",

        category:
          data.category || "",

        price:
          data.price || "",

        available_quantity:
          data.available_quantity || "",

        location:
          data.location || "",

        description:
          data.description || "",

        image_url:
          data.image_url || ""
      })
    } catch (error) {
      console.error(
        "Fetch Product Error:",
        error
      )

      setErrorMessage(
        "Unable to connect to the FarmConnect server."
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [productId])

  const onChangeInput = event => {
    const {
      name,
      value
    } = event.target

    setProductData(previousData => ({
      ...previousData,
      [name]: value
    }))

    setErrorMessage("")
    setSuccessMessage("")
  }

  const onSubmitUpdate = async event => {
    event.preventDefault()

    setErrorMessage("")
    setSuccessMessage("")

    const accessToken =
      getAccessToken()

    if (!accessToken) {
      logoutSeller()
      return
    }

    setIsSaving(true)

    try {
      const response =
        await fetch(
          `${API_BASE_URL}/api/products/seller/products/${productId}/`,
          {
            method: "PUT",

            headers: {
              Authorization:
                `Bearer ${accessToken}`,

              "Content-Type":
                "application/json",

              Accept:
                "application/json"
            },

            body: JSON.stringify({
              name:
                productData.name.trim(),

              category:
                productData.category,

              price:
                productData.price,

              available_quantity:
                productData.available_quantity,

              location:
                productData.location.trim(),

              description:
                productData.description.trim(),

              image_url:
                productData.image_url.trim()
            })
          }
        )

      const data =
        await response.json()

      if (
        response.status === 401
      ) {
        logoutSeller()
        return
      }

      if (!response.ok) {
        setErrorMessage(
          getBackendError(data)
        )

        return
      }

      setSuccessMessage(
        "Product updated successfully!"
      )

      setTimeout(() => {
        navigate(
          "/seller/products"
        )
      }, 1000)
    } catch (error) {
      console.error(
        "Update Product Error:",
        error
      )

      setErrorMessage(
        "Unable to connect to the FarmConnect server."
      )
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="seller-products-page">
        <SellerHeader />

        <main className="seller-products-state">
          <Package
            size={40}
          />

          <h2>
            Loading Product
          </h2>

          <p>
            Please wait while we load the product details.
          </p>
        </main>

        <Footer />
      </div>
    )
  }

  if (
    errorMessage &&
    !productData.name
  ) {
    return (
      <div className="seller-products-page">
        <SellerHeader />

        <main className="seller-products-state seller-products-error">
          <AlertCircle
            size={42}
          />

          <h2>
            Unable to Load Product
          </h2>

          <p>
            {errorMessage}
          </p>

          <button
            className="seller-retry-button"
            onClick={() =>
              navigate(
                "/seller/products"
              )
            }
          >
            <ArrowLeft
              size={17}
            />

            Back to My Products
          </button>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="seller-add-product-page">
      <SellerHeader />

      <main className="seller-edit-product-container">
        <div className="seller-add-product-header">
          <button
            className="seller-back-button"
            onClick={() =>
              navigate(
                "/seller/products"
              )
            }
          >
            <ArrowLeft
              size={18}
            />

            Back to My Products
          </button>

          <div className="seller-add-product-title">
            <div className="seller-title-icon">
              <Package
                size={28}
              />
            </div>

            <div>
              <h1>
                Edit Product
              </h1>

              <p>
                Update your product information.
              </p>
            </div>
          </div>
        </div>

        {successMessage && (
          <div className="seller-success-message">
            <CheckCircle2
              size={20}
            />

            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="seller-error-message">
            <AlertCircle
              size={20}
            />

            {errorMessage}
          </div>
        )}

        <form
          className="seller-product-form"
          onSubmit={
            onSubmitUpdate
          }
        >
          <section className="seller-form-section">
            <div className="seller-form-section-header">
              <div className="seller-form-section-icon">
                <Package
                  size={20}
                />
              </div>

              <div>
                <h2>
                  Product Information
                </h2>

                <p>
                  Update your product details.
                </p>
              </div>
            </div>

            <div className="seller-form-grid">
              <div className="seller-form-group seller-full-width">
                <label>
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={
                    productData.name
                  }
                  onChange={
                    onChangeInput
                  }
                  required
                />
              </div>

              <div className="seller-form-group">
                <label>
                  Product Category
                </label>

                <select
                  name="category"
                  value={
                    productData.category
                  }
                  onChange={
                    onChangeInput
                  }
                  required
                >
                  <option value="">
                    Select Category
                  </option>

                  <option value="FRUIT">
                    🍎 Fruit
                  </option>

                  <option value="VEGETABLE">
                    🥕 Vegetable
                  </option>

                  <option value="ANIMAL">
                    🐄 Animal
                  </option>

                  <option value="MACHINE">
                    🚜 Machine
                  </option>
                </select>
              </div>

              <div className="seller-form-group">
                <label>
                  Price
                </label>

                <div className="seller-input-with-icon">
                  <IndianRupee
                    size={18}
                  />

                  <input
                    type="number"
                    name="price"
                    value={
                      productData.price
                    }
                    onChange={
                      onChangeInput
                    }
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div className="seller-form-group">
                <label>
                  Available Quantity
                </label>

                <div className="seller-input-with-icon">
                  <Boxes
                    size={18}
                  />

                  <input
                    type="number"
                    name="available_quantity"
                    value={
                      productData.available_quantity
                    }
                    onChange={
                      onChangeInput
                    }
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div className="seller-form-group">
                <label>
                  Product Location
                </label>

                <div className="seller-input-with-icon">
                  <MapPin
                    size={18}
                  />

                  <input
                    type="text"
                    name="location"
                    value={
                      productData.location
                    }
                    onChange={
                      onChangeInput
                    }
                    required
                  />
                </div>
              </div>

              <div className="seller-form-group seller-full-width">
                <label>
                  Product Description
                </label>

                <div className="seller-textarea-wrapper">
                  <FileText
                    size={18}
                  />

                  <textarea
                    name="description"
                    value={
                      productData.description
                    }
                    onChange={
                      onChangeInput
                    }
                    rows="5"
                    maxLength="500"
                    required
                  />
                </div>

                <small className="seller-input-help">
                  Maximum 500 characters.
                </small>
              </div>
            </div>
          </section>

          <section className="seller-form-section">
            <div className="seller-form-section-header">
              <div className="seller-form-section-icon">
                <Image
                  size={20}
                />
              </div>

              <div>
                <h2>
                  Product Image
                </h2>

                <p>
                  Update your product image URL.
                </p>
              </div>
            </div>

            <div className="seller-form-group">
              <label>
                Image URL
              </label>

              <div className="seller-input-with-icon">
                <Image
                  size={18}
                />

                <input
                  type="url"
                  name="image_url"
                  value={
                    productData.image_url
                  }
                  onChange={
                    onChangeInput
                  }
                  required
                />
              </div>
            </div>

            {productData.image_url && (
              <div className="seller-image-preview">
                <img
                  src={
                    productData.image_url
                  }
                  alt={
                    productData.name
                  }
                  onError={
                    event => {
                      event.currentTarget.style.display =
                        "none"
                    }
                  }
                />
              </div>
            )}
          </section>

          <div className="seller-form-actions">
            <button
              type="button"
              className="seller-cancel-button"
              onClick={() =>
                navigate(
                  "/seller/products"
                )
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="seller-submit-product-button"
              disabled={
                isSaving
              }
            >
              <Save
                size={19}
              />

              {isSaving
                ? "Saving Changes..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}

export default EditProduct