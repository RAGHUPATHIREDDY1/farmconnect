import SellerHeader from "./SellerHeader"
import Footer from "../Footer"
import "./seller.css";

function MyProducts() {
  return (
    <div className="seller-page">
        <SellerHeader />
        <h1>MyProducts</h1>
        <Footer />
    </div>
  );
}
export default MyProducts;