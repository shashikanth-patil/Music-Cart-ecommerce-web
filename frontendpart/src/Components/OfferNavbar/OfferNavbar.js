import React, { useEffect, useState } from "react";
import "./OfferNavbar.css";
import callImage from "../../images/callImage.png";
import { useNavigate } from "react-router-dom";
import { LoginAndJWTTokenCheck } from "../../auth/LoginAndJWTTokenCheck.js";
import { FetchCartProduct } from "../../FetchCartProduct/FetchCartProduct";

import { useSelector } from "react-redux";
const OfferNavbar = () => {
  const navigate = useNavigate();
  const { getCartItem } = FetchCartProduct();

  const { handleLogout } = LoginAndJWTTokenCheck();

  const logoutHandler = () => {
    handleLogout();
    getCartItem();
  };
  const isAuthenticated = useSelector(
    (state) => state.authentications?.isAuthenticated || ""
  );

  return (
    <div className="eghrt">
      <div className="commonDiv">
        <img className="callImg" src={callImage} alt="" />
        <p>912121131313</p>
      </div>
      <div className="commonDiv">
        <div className="commonDiv">
          <p>Get 50% off on selected items</p>
          <div></div>
          <p>Shop Now</p>
        </div>
      </div>
      <div className="logout">
        {isAuthenticated === true ? (
          <p onClick={logoutHandler}>Logout</p>
        ) : (
          <div>
            <p onClick={() => navigate("/login")}>Login</p>
            <p>|</p>
            <p onClick={() => navigate("/register")}>Signup</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferNavbar;
