import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import Fruits from "./components/fruits";
import Vegetables from "./components/veginatbles";
import Animals from "./components/animals";
import Machines from "./components/machines";
import ProtectedRoute from "./components/protectedRoute";
import Cart from "./components/cart";
import Orders from "./components/orders";
import NotFound from "./components/notfound";
import About from "./components/about";
import Contact from "./components/contact";
import Support from "./components/support";
import PrivacyPolicy from "./components/privacyPolicy";
import SellerLogin from "./components/seller/SellerLogin";
import SellerRegister from "./components/seller/SellerRegister";
import SellerDashboard from "./components/seller/SellerDashboard";
import MyProducts from "./components/seller/MyProducts";
import AddProduct from "./components/seller/AddProduct";
import SellerOrders from "./components/seller/SellerOrders";


import "./App.css";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

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
        path="/seller/login"
        element={<SellerLogin />}
      />

      <Route
        path="/seller/register"
        element={<SellerRegister />}
      />

      <Route
        path="/seller/dashboard"
        element={<SellerDashboard />}
      />

      <Route
        path="/seller/add-product"
        element={<AddProduct />}
      />

      <Route
        path="/seller/products"
        element={<MyProducts />}
      />

      <Route
        path="/seller/orders"
        element={<SellerOrders />}
      />


      <Route path="/about" element={<About />} />

      <Route path="/contact" element={<Contact />} />

      <Route path="/support" element={<Support />} />

      <Route path="/privacy-policy" element={<PrivacyPolicy />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;