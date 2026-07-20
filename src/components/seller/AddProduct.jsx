import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  PackagePlus,
  Image,
  MapPin,
  IndianRupee,
  Boxes,
  FileText,
  ArrowLeft,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import SellerHeader from "./SellerHeader"
import Footer from "../Footer"
import "./seller.css"

const AddProduct = () => {
  const navigate = useNavigate()

  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: "",
    available_quantity: "",
    location: "",
    description: "",
    image_url: ""
  })

  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const onChangeInput = event => {
    const { name, value } = event.target
    setProductData(previousData => ({
      ...previousData,
      [name]: value
    }))
    setErrorMessage("")
  }

  const onSubmitProduct = async event => {
    event.preventDefault()
    setSuccessMessage("")
    setErrorMessage("")
    setIsLoading(true)

    const accessToken = localStorage.getItem("accessToken")

    if (!accessToken) {
      setErrorMessage("Your session has expired. Please login again.")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(
        "https://farmconnectbackend.onrender.com/api/products/add/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            name: productData.name,
            category: productData.category,
            price: productData.price,
            available_quantity: productData.available_quantity,
            location: productData.location,
            description: productData.description,
            image_url: productData.image_url
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        console.error("Product Add Error:", data)
        if (data.detail) {
          setErrorMessage(data.detail)
        } else if (typeof data === "object") {
          const firstError = Object.values(data)[0]
          if (Array.isArray(firstError)) {
            setErrorMessage(firstError[0])
          } else {
            setErrorMessage("Please check the product details.")
          }
        } else {
          setErrorMessage("Unable to add product.")
        }
        return
      }

      setSuccessMessage("Product added successfully!")
      setProductData({
        name: "",
        category: "",
        price: "",
        available_quantity: "",
        location: "",
        description: "",
        image_url: ""
      })

      setTimeout(() => {
        navigate("/seller/products")
      }, 1200)
    } catch (error) {
      console.error("Add Product Error:", error)
      setErrorMessage("Unable to connect to the server. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="seller-add-product-page">
      <SellerHeader />

      <div className="seller-add-product-header">
        <button
          className="seller-back-button"
          onClick={() => navigate("/seller/dashboard")}
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="seller-add-product-title">
          <div className="seller-title-icon">
            <PackagePlus size={28} />
          </div>
          <div>
            <h1>Add New Product</h1>
            <p>Connect your farm products with buyers across India.</p>
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="seller-success-message">
          <CheckCircle2 size={20} />
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="seller-error-message">
          <AlertCircle size={20} />
          {errorMessage}
        </div>
      )}

      <form className="seller-product-form" onSubmit={onSubmitProduct}>
        <section className="seller-form-section">
          <div className="seller-form-section-header">
            <div className="seller-form-section-icon">
              <PackagePlus size={20} />
            </div>
            <div>
              <h2>Product Information</h2>
              <p>Add the basic details of your product.</p>
            </div>
          </div>

          <div className="seller-form-grid">
            <div className="seller-form-group seller-full-width">
              <label>Product Name</label>
              <input
                type="text"
                name="name"
                placeholder="Example: Fresh Organic Tomatoes"
                value={productData.name}
                onChange={onChangeInput}
                required
              />
            </div>

            <div className="seller-form-group">
              <label>Product Category</label>
              <select
                name="category"
                value={productData.category}
                onChange={onChangeInput}
                required
              >
                <option value="">Select Category</option>
                <option value="FRUIT">🍎 Fruit</option>
                <option value="VEGETABLE">🥕 Vegetable</option>
                <option value="ANIMAL">🐄 Animal</option>
                <option value="MACHINE">🚜 Machine</option>
              </select>
            </div>

            <div className="seller-form-group">
              <label>Price</label>
              <div className="seller-input-with-icon">
                <IndianRupee size={18} />
                <input
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  value={productData.price}
                  onChange={onChangeInput}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div className="seller-form-group">
              <label>Available Quantity</label>
              <div className="seller-input-with-icon">
                <Boxes size={18} />
                <input
                  type="number"
                  name="available_quantity"
                  placeholder="Enter quantity"
                  value={productData.available_quantity}
                  onChange={onChangeInput}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div className="seller-form-group">
              <label>Product Location</label>
              <div className="seller-input-with-icon">
                <MapPin size={18} />
                <input
                  type="text"
                  name="location"
                  placeholder="Example: Hyderabad, Telangana"
                  value={productData.location}
                  onChange={onChangeInput}
                  required
                />
              </div>
            </div>

            <div className="seller-form-group seller-full-width">
              <label>Product Description</label>
              <div className="seller-textarea-wrapper">
                <FileText size={18} />
                <textarea
                  name="description"
                  placeholder="Describe your product, quality, freshness and other important details..."
                  value={productData.description}
                  onChange={onChangeInput}
                  rows="5"
                  required
                />
              </div>
            </div>
          </div>
        </section>

        <section className="seller-form-section">
          <div className="seller-form-section-header">
            <div className="seller-form-section-icon">
              <Image size={20} />
            </div>
            <div>
              <h2>Product Image</h2>
              <p>Add a clear image of your product.</p>
            </div>
          </div>

          <div className="seller-form-group">
            <label>Image URL</label>
            <div className="seller-input-with-icon">
              <Image size={18} />
              <input
                type="url"
                name="image_url"
                placeholder="https://example.com/product-image.jpg"
                value={productData.image_url}
                onChange={onChangeInput}
                required
              />
            </div>
            <small className="seller-input-help">
              Use a clear image URL showing your product.
            </small>
          </div>

          {productData.image_url && (
            <div className="seller-image-preview">
              <img
                src={productData.image_url}
                alt="Product Preview"
                onError={event => {
                  event.currentTarget.style.display = "none"
                }}
              />
            </div>
          )}
        </section>

        <div className="seller-form-actions">
          <button
            type="button"
            className="seller-cancel-button"
            onClick={() => navigate("/seller/dashboard")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="seller-submit-product-button"
            disabled={isLoading}
          >
            <PackagePlus size={19} />
            {isLoading ? "Adding Product..." : "Add Product"}
          </button>
        </div>
      </form>

      <Footer />
    </div>
  )
}

export default AddProduct