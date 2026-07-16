import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  PackagePlus,
  Image,
  MapPin,
  IndianRupee,
  Boxes,
  FileText,
  Phone,
  User,
  ArrowLeft,
  CheckCircle2
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
    quantity: "",
    description: "",
    image: "",
    location: "",
    sellerName: "",
    phone: ""

  })

  const [successMessage, setSuccessMessage] = useState("")

  const onChangeInput = event => {

    const { name, value } = event.target

    setProductData(previousData => ({
      ...previousData,
      [name]: value
    }))

  }

  const onSubmitProduct = event => {

    event.preventDefault()

    const newProduct = {

      id: Date.now(),

      name: productData.name,

      category: productData.category,

      price: Number(productData.price),

      quantity: Number(productData.quantity),

      description: productData.description,

      image: productData.image,

      location: productData.location,

      sellerName: productData.sellerName,

      phone: productData.phone,

      createdAt: new Date().toISOString(),

      rating: 4.8

    }

    const existingProducts =
      JSON.parse(
        localStorage.getItem("sellerProducts")
      ) || []

    const updatedProducts = [
      ...existingProducts,
      newProduct
    ]

    localStorage.setItem(
      "sellerProducts",
      JSON.stringify(updatedProducts)
    )

    setSuccessMessage(
      "Product successfully added to your store!"
    )

    setProductData({

      name: "",
      category: "",
      price: "",
      quantity: "",
      description: "",
      image: "",
      location: "",
      sellerName: "",
      phone: ""

    })

    setTimeout(() => {

      navigate("/seller/products")

    }, 1500)

  }

  return (

    <div className="seller-add-product-page">

        <SellerHeader />

      <div className="seller-add-product-header">

        <button
          className="seller-back-button"
          onClick={() =>
            navigate("/seller/dashboard")
          }
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="seller-add-product-title">

          <div className="seller-title-icon">
            <PackagePlus size={28} />
          </div>

          <div>

            <h1>
              Add New Product
            </h1>

            <p>
              Connect your farm products with buyers across India.
            </p>

          </div>

        </div>

      </div>


      {/* Success Message */}

      {successMessage && (

        <div className="seller-success-message">

          <CheckCircle2 size={20} />

          {successMessage}

        </div>

      )}


      {/* Main Form */}

      <form
        className="seller-product-form"
        onSubmit={onSubmitProduct}
      >

        {/* Product Information */}

        <section className="seller-form-section">

          <div className="seller-form-section-header">

            <div className="seller-form-section-icon">
              <PackagePlus size={20} />
            </div>

            <div>

              <h2>
                Product Information
              </h2>

              <p>
                Add the basic details of your product.
              </p>

            </div>

          </div>


          <div className="seller-form-grid">

            {/* Product Name */}

            <div className="seller-form-group seller-full-width">

              <label>
                Product Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Example: Fresh Organic Tomatoes"
                value={productData.name}
                onChange={onChangeInput}
                required
              />

            </div>


            {/* Category */}

            <div className="seller-form-group">

              <label>
                Product Category
              </label>

              <select
                name="category"
                value={productData.category}
                onChange={onChangeInput}
                required
              >

                <option value="">
                  Select Category
                </option>

                <option value="fruits">
                  🍎 Fruits
                </option>

                <option value="vegetables">
                  🥕 Vegetables
                </option>

                <option value="animals">
                  🐄 Animals
                </option>

                <option value="machines">
                  🚜 Machines
                </option>

              </select>

            </div>


            {/* Price */}

            <div className="seller-form-group">

              <label>
                Price
              </label>

              <div className="seller-input-with-icon">

                <IndianRupee size={18} />

                <input
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  value={productData.price}
                  onChange={onChangeInput}
                  min="0"
                  required
                />

              </div>

            </div>


            {/* Quantity */}

            <div className="seller-form-group">

              <label>
                Available Quantity
              </label>

              <div className="seller-input-with-icon">

                <Boxes size={18} />

                <input
                  type="number"
                  name="quantity"
                  placeholder="Enter quantity"
                  value={productData.quantity}
                  onChange={onChangeInput}
                  min="1"
                  required
                />

              </div>

            </div>


            {/* Location */}

            <div className="seller-form-group">

              <label>
                Product Location
              </label>

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


            {/* Description */}

            <div className="seller-form-group seller-full-width">

              <label>
                Product Description
              </label>

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


        {/* Product Image */}

        <section className="seller-form-section">

          <div className="seller-form-section-header">

            <div className="seller-form-section-icon">
              <Image size={20} />
            </div>

            <div>

              <h2>
                Product Image
              </h2>

              <p>
                Add a clear image of your product.
              </p>

            </div>

          </div>


          <div className="seller-form-group">

            <label>
              Image URL
            </label>

            <div className="seller-input-with-icon">

              <Image size={18} />

              <input
                type="url"
                name="image"
                placeholder="https://example.com/product-image.jpg"
                value={productData.image}
                onChange={onChangeInput}
                required
              />

            </div>

            <small className="seller-input-help">

              Use a clear image URL showing your product.

            </small>

          </div>


          {productData.image && (

            <div className="seller-image-preview">

              <img
                src={productData.image}
                alt="Product Preview"
              />

            </div>

          )}

        </section>


        {/* Seller Information */}

        <section className="seller-form-section">

          <div className="seller-form-section-header">

            <div className="seller-form-section-icon">
              <User size={20} />
            </div>

            <div>

              <h2>
                Seller Information
              </h2>

              <p>
                Help buyers connect with you.
              </p>

            </div>

          </div>


          <div className="seller-form-grid">

            {/* Seller Name */}

            <div className="seller-form-group">

              <label>
                Seller / Farm Name
              </label>

              <div className="seller-input-with-icon">

                <User size={18} />

                <input
                  type="text"
                  name="sellerName"
                  placeholder="Example: Raghupathi Farms"
                  value={productData.sellerName}
                  onChange={onChangeInput}
                  required
                />

              </div>

            </div>


            {/* Phone */}

            <div className="seller-form-group">

              <label>
                Contact Number
              </label>

              <div className="seller-input-with-icon">

                <Phone size={18} />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter contact number"
                  value={productData.phone}
                  onChange={onChangeInput}
                  required
                />

              </div>

            </div>

          </div>

        </section>


        {/* Buttons */}

        <div className="seller-form-actions">

          <button
            type="button"
            className="seller-cancel-button"
            onClick={() =>
              navigate("/seller/dashboard")
            }
          >
            Cancel
          </button>

          <button
            type="submit"
            className="seller-submit-product-button"
          >
            <PackagePlus size={19} />
            Add Product
          </button>

        </div>

      </form>
        <Footer />  

    </div>

  )

}

export default AddProduct