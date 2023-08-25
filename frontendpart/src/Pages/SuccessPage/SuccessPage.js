import React from "react";
import OfferNavbar from "../../Components/OfferNavbar/OfferNavbar";
import "./SuccessPage.css";
import MusicLogo from "../../images/musicLogo.png";
import orderSuccessImage from "../../images/orderSuccessImage.png";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";

const SuccessPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <OfferNavbar />
      <div className="successContainer">
        <div className="musicdiv">
          <img src={MusicLogo} />
          <p>Musicart</p>
        </div>
        <div className="orderSuccessDiv">
          <img src={orderSuccessImage} alt="" />
          <p>Order is placed successfully!</p>
          <p>You will be receiving a confirmation email with order details</p>
          <button className="goToHomePage" onClick={() => navigate("/")}>
            Go back to Home page
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SuccessPage;
