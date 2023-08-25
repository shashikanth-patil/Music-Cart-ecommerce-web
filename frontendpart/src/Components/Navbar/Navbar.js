import React, { useEffect, useState } from "react";
import "./Navbar.css";
import MusicLogo from "../../images/musicLogo.png";
import CartImage from "../../images/cartImage.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FetchCartProduct } from "../../FetchCartProduct/FetchCartProduct";
const Navbar = ({ routeHierarchy, Cart, CheckOut }) => {
  const navigate = useNavigate();
  const [routehierarchy, setRouteHierarchy] = useState();
  const { getCartItem } = FetchCartProduct();
  const isAuthenticated = useSelector(
    (state) => state.authentications?.isAuthenticated || ""
  );
  useEffect(() => {
    if (isAuthenticated === true) {
      getCartItem();
    }
  }, [isAuthenticated]);

  const cartValue = useSelector((state) => state.authentications.cartValue);
  useEffect(() => {
    if (routeHierarchy) {
      setRouteHierarchy(routeHierarchy);
    } else if (Cart) {
      setRouteHierarchy(Cart);
    } else if (CheckOut) {
      setRouteHierarchy(CheckOut);
    } else {
      setRouteHierarchy();
    }
  }, [cartValue]);

  return (
    <div className="bdfghjs">
      <div className="hjklefrw">
        <img src={MusicLogo} onClick={() => navigate("/")} alt="" />
        <p className="hjas" onClick={() => navigate("/")}>
          Musicart
        </p>
        <p className="hijls">
          {routehierarchy ? "Home/" + routehierarchy : "Home"}
        </p>
      </div>
      {isAuthenticated === true ? (
        <div
          className="ghijcds"
          onClick={() => {
            navigate("/cart");
            getCartItem();
          }}
        >
          <img alt="" src={CartImage} />
          <button>{cartValue ? cartValue.length : 0}</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
