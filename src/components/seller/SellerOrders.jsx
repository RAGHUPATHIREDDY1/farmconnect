import SellerHeader from "./SellerHeader"
import Footer from "../Footer"
import "./seller.css";

function SellerOrders() {
  return (
    <div className="seller-page">
      <SellerHeader />
     
      <h1>sell orders</h1>
      <Footer />
    </div>
  );
}

export default SellerOrders;