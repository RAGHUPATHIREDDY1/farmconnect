import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"

import Home from "./components/home"
import Login from "./components/login"
import Register from "./components/register"

import Fruits from "./components/fruits"
import Vegetables from "./components/veginatbles"
import Animals from "./components/animals"
import Machines from "./components/machines"

import ProtectedRoute from "./components/protectedRoute"

import Cart from "./components/cart"
import Orders from "./components/orders"
import Checkout from "./components/orders/checkout"

import ProductDetails from "./components/ProductDetails"

import NotFound from "./components/notfound"
import About from "./components/about"
import Contact from "./components/contact"
import Support from "./components/support"
import PrivacyPolicy from "./components/privacyPolicy"

import SellerLogin from "./components/seller/SellerLogin"
import SellerRegister from "./components/seller/SellerRegister"
import SellerDashboard from "./components/seller/SellerDashboard"
import MyProducts from "./components/seller/MyProducts"
import AddProduct from "./components/seller/AddProduct"
import EditProduct from "./components/seller/EditProduct"
import SellerOrders from "./components/seller/SellerOrders"

import FarmConnectAI from "./components/AI/FarmConnectAI"

import "./App.css"


const SellerProtectedRoute = ({ children }) => {
  const accessToken =
    localStorage.getItem("accessToken")

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  if (
    !accessToken ||
    !user ||
    user.role !== "SELLER"
  ) {
    return (
      <Navigate
        to="/seller/login"
        replace
      />
    )
  }

  return children
}


const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Authentication Routes */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* Main Marketplace Routes */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/fruits"
          element={
            <ProtectedRoute>
              <Fruits />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vegetables"
          element={
            <ProtectedRoute>
              <Vegetables />
            </ProtectedRoute>
          }
        />

        <Route
          path="/animals"
          element={
            <ProtectedRoute>
              <Animals />
            </ProtectedRoute>
          }
        />

        <Route
          path="/machines"
          element={
            <ProtectedRoute>
              <Machines />
            </ProtectedRoute>
          }
        />


        {/* Product Routes */}

        <Route
          path="/products/:productId"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />


        {/* Shopping Routes */}

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
          <ProtectedRoute>
            <Checkout />
            </ProtectedRoute>}
        />


        {/* Seller Authentication */}

        <Route
          path="/seller/login"
          element={<SellerLogin />}
        />

        <Route
          path="/seller/register"
          element={<SellerRegister />}
        />


        {/* Seller Dashboard Routes */}

        <Route
          path="/seller/dashboard"
          element={
            <SellerProtectedRoute>
              <SellerDashboard />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/seller/products"
          element={
            <SellerProtectedRoute>
              <MyProducts />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/seller/add-product"
          element={
            <SellerProtectedRoute>
              <AddProduct />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/seller/products/edit/:productId"
          element={
            <SellerProtectedRoute>
              <EditProduct />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/seller/orders"
          element={
            <SellerProtectedRoute>
              <SellerOrders />
            </SellerProtectedRoute>
          }
        />


        {/* Information Pages */}

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/support"
          element={<Support />}
        />

        <Route
          path="/privacy-policy"
          element={<PrivacyPolicy />}
        />


        {/* 404 Page */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>


      {/* Global AI Assistant */}

      <FarmConnectAI />

    </BrowserRouter>
  )
}


export default App