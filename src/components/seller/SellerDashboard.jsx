import { useNavigate } from "react-router-dom"
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
  MapPin
} from "lucide-react"

import SellerHeader from "./SellerHeader"
import Footer from "../Footer"
import "./seller.css"


const SellerDashboard = () => {

  const navigate = useNavigate()

  return (
    

    <>

      <SellerHeader />

      <main className="seller-home-dashboard">

        {/* Welcome Section */}

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
              Connect directly with buyers, showcase your products,
              and grow your farm business across India.
            </p>

            <button
              className="seller-primary-action"
              onClick={() =>
                navigate("/seller/add-product")
              }
            >
              <Plus size={20} />
              Add New Product
            </button>

          </div>


          <div className="seller-welcome-image">

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


        {/* Stats */}

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
                24
              </h2>

              <small>
                Active listings
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
                86
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
                ₹25,480
              </h2>

              <small>
                This month
              </small>

            </div>

          </div>

        </section>


        {/* Store Categories */}

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
                navigate("/seller/products")
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
                navigate("/seller/add-product")
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
                  Add fresh fruits
                </p>

              </div>

              <ArrowRight size={18} />

            </button>


            <button
              className="seller-category-card vegetables-card"
              onClick={() =>
                navigate("/seller/add-product")
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
                  Add farm vegetables
                </p>

              </div>

              <ArrowRight size={18} />

            </button>


            <button
              className="seller-category-card animals-card"
              onClick={() =>
                navigate("/seller/add-product")
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
                  List farm animals
                </p>

              </div>

              <ArrowRight size={18} />

            </button>


            <button
              className="seller-category-card machines-card"
              onClick={() =>
                navigate("/seller/add-product")
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
                  Sell farm equipment
                </p>

              </div>

              <ArrowRight size={18} />

            </button>

          </div>

        </section>


        {/* Quick Action Banner */}

        <section className="seller-action-banner">

          <div>

            <span>
              READY TO SELL?
            </span>

            <h2>
              Put your farm products in front of more buyers.
            </h2>

            <p>
              Add your products today and start connecting
              with customers directly.
            </p>

          </div>

          <button
            onClick={() =>
              navigate("/seller/add-product")
            }
          >
            Add Product
            <ArrowRight size={18} />
          </button>

        </section>


        {/* Recent Orders */}

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
                navigate("/seller/orders")
              }
            >
              View Orders
              <ArrowRight size={17} />
            </button>

          </div>


          <div className="seller-recent-orders">

            <div className="seller-order-item">

              <div className="seller-order-product-icon">
                🍅
              </div>

              <div className="seller-order-details">

                <strong>
                  Organic Tomatoes
                </strong>

                <span>
                  Order #FC1001 · Hyderabad
                </span>

              </div>

              <strong>
                ₹1,280
              </strong>

              <span className="seller-order-status delivered">
                Delivered
              </span>

            </div>


            <div className="seller-order-item">

              <div className="seller-order-product-icon">
                🍎
              </div>

              <div className="seller-order-details">

                <strong>
                  Fresh Apples
                </strong>

                <span>
                  Order #FC1002 · Bengaluru
                </span>

              </div>

              <strong>
                ₹2,450
              </strong>

              <span className="seller-order-status processing">
                Processing
              </span>

            </div>


            <div className="seller-order-item">

              <div className="seller-order-product-icon">
                🐄
              </div>

              <div className="seller-order-details">

                <strong>
                  Farm Cow
                </strong>

                <span>
                  Order #FC1003 · Chennai
                </span>

              </div>

              <strong>
                ₹48,000
              </strong>

              <span className="seller-order-status pending">
                Pending
              </span>

            </div>

          </div>

        </section>

      </main>

      <Footer />

    </>

  )

}

export default SellerDashboard