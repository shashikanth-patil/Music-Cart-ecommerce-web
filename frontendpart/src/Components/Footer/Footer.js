import React from "react";
import "./Footer.css";
import homeBtn from "../../images/homeBtn.png";
import loginBtn from "../../images/loginBtn.png";
import cartBtn from "../../images/cartBtn.png";
import { useNavigate } from "react-router-dom";
import { LoginAndJWTTokenCheck } from "../../auth/LoginAndJWTTokenCheck.js";
import { FetchCartProduct } from "../../FetchCartProduct/FetchCartProduct";
import { useSelector } from "react-redux";

const Footer = () => {
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
    <div className="footer">
      <p>Musicart | All rights reserved</p>
      <div>
        <img alt="" src={homeBtn} onClick={() => navigate("/")} />
        <p>Home</p>
      </div>

      <div onClick={() => navigate("/cart")}>
        <img alt="" src={cartBtn} />

        <p>Cart</p>
      </div>

      <div onClick={logoutHandler}>
        <img alt="" src={loginBtn} />
        {isAuthenticated === true ? (
          <p onClick={logoutHandler}>Logout</p>
        ) : (
          <p onClick={() => navigate("/login")}>Login</p>
        )}
      </div>
    </div>
  );
};

export default Footer;
