import React, { useEffect, useState } from "react";
import OfferNavbar from "../../Components/OfferNavbar/OfferNavbar";
import Navbar from "../../Components/Navbar/Navbar";
import BackToProductPageBtn from "../../Components/BackToProductPageBtn/BackToProductPageBtn";
import "./Cart.css";
import searchImage from "../../images/searchImage.png";
import cartBagImage from "../../images/cartBagImage.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import { FetchCartProduct } from "../../FetchCartProduct/FetchCartProduct";
import Footer from "../../Components/Footer/Footer";

const Cart = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [btnClick, setbtnClick] = useState();
  const [btnId, setbtnId] = useState();
  const [totalCartAmount, setTotalCartAmount] = useState();
  const { getCartItem } = FetchCartProduct();
  const [userEmail, setUserEmail] = useState();

  const cartValue = useSelector((state) => state.authentications.cartValue);
  const cartQuantityHandler = (id, index3) => {
    setbtnClick(true);
    setbtnId(id);
    axios
      .post(
        "https://musicart-full-stack-project-backend.onrender.com/getCartProduct",
        {
          productQuantity: index3,
          cartUpdateId: id,
          userEmail: userEmail.replace(/"|'/g, ""),
        }
      )
      .then(function (response) {
        getCartItem();
        setbtnClick(false);
      })

      .catch((err) => {
        alert(err.message);
      });
  };
  const placeOrderHandler = () => {
    setLoading2(true);
    axios
      .post(
        "https://musicart-full-stack-project-backend.onrender.com/checkOutProduct",
        {
          forCheckOutPageChaker: userEmail.replace(/"|'/g, ""),
        }
      )
      .then(function (response) {
      
          setLoading2(false);

          navigate("/checkout");
        
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const totalCartamount = () => {
    let totalAmount = 0;
    if (cartValue) {
      cartValue.map((data) => {
        totalAmount += Number(
          data.productQuantity * data.productPrice.replace(/\,/g, "")
        );
      });
    }
    setLoading(true);

    setTotalCartAmount(totalAmount);
  };
  useEffect(() => {
    totalCartamount();
  }, [cartValue, btnClick]);

  useEffect(() => {
    setUserEmail(localStorage.getItem("userEmail"));
  }, []);

  return (
    <div>
      <div>
        {loading === true ? (
          <div>
            <OfferNavbar />
            <div className="searchContainer">
              <div className="searchDiv">
                <div className="search">
                  <img src={searchImage} />
                  <input placeholder="Search You Headphone Here" type="text" />
                </div>
              </div>
            </div>
            <div className="viewCartContainer">
              <Navbar Cart={"View Cart"} />
              <BackToProductPageBtn />

              <div className="cartImgDiv">
                <img src={cartBagImage} />
                <p>My Cart</p>
              </div>
              {cartValue && cartValue.length > 0 ? (
                <div>
                  {cartValue ? (
                    <div className="cartItemListContainer">
                      <div className="artItemListDiv">
                        <hr className="hrLine" />
                        {cartValue
                          ? cartValue.map((data) => (
                              <div>
                                <div className="productDiv">
                                  <div>
                                    <img
                                      alt=""
                                      onClick={() =>
                                        navigate("/productdetails/" + data._id)
                                      }
                                      src={data.productImage[0]}
                                    />
                                  </div>
                                  <div className="cartDetails">
                                    <p>{data.productName}</p>
                                    <p>Clour : {data.productColor}</p>
                                    <p>
                                      {data.productStock === true
                                        ? "In Stock"
                                        : "Out Of Stock"}
                                    </p>
                                  </div>
                                  <div className="priceDiv">
                                    <p>Price</p>
                                    <p>₹{data.productPrice}</p>
                                  </div>
                                  <div className="QuantityDiv">
                                    <p>Quantity</p>
                                    <div className="dropdownContainerr">
                                      <div class="dropdown">
                                        {btnClick === true &&
                                        btnId === data._id ? (
                                          <button>
                                            <i class="fa fa-spinner fa-spin"></i>
                                          </button>
                                        ) : (
                                          <button>
                                            {data.productQuantity
                                              ? data.productQuantity
                                              : "Select"}
                                          </button>
                                        )}

                                        <div class="dropdown-content">
                                          <p
                                            onClick={() =>
                                              cartQuantityHandler(data._id, 1)
                                            }
                                          >
                                            1
                                          </p>
                                          <p
                                            onClick={() =>
                                              cartQuantityHandler(data._id, 2)
                                            }
                                          >
                                            2
                                          </p>
                                          <p
                                            onClick={() =>
                                              cartQuantityHandler(data._id, 3)
                                            }
                                          >
                                            3
                                          </p>
                                          <p
                                            id="4"
                                            onClick={() =>
                                              cartQuantityHandler(data._id, 4)
                                            }
                                          >
                                            4
                                          </p>
                                          <p
                                            id="5"
                                            onClick={() =>
                                              cartQuantityHandler(data._id, 5)
                                            }
                                          >
                                            5
                                          </p>
                                          <p
                                            id="6"
                                            onClick={() =>
                                              cartQuantityHandler(data._id, 6)
                                            }
                                          >
                                            6
                                          </p>
                                          <p
                                            id="7"
                                            onClick={() =>
                                              cartQuantityHandler(data._id, 7)
                                            }
                                          >
                                            7
                                          </p>
                                          <p
                                            id="8"
                                            onClick={() =>
                                              cartQuantityHandler(data._id, 8)
                                            }
                                          >
                                            8
                                          </p>
                                        </div>
                                      </div>
                                      <div></div>
                                    </div>
                                  </div>
                                  <div className="totalPriceDiv">
                                    <p>Total</p>
                                    <p>
                                      ₹
                                      {Number(
                                        data.productPrice.replace(/\,/g, "")
                                      ) * data.productQuantity}
                                    </p>
                                  </div>
                                </div>
                                <hr className="hrLine" />
                              </div>
                            ))
                          : ""}
                      </div>
                      <div className="placeOrderContainer">
                        <div className="placeOrderDiv">
                          <p className="reghsw">PRICE DETAILS</p>
                          <div className="totalMRPDiv">
                            <div>
                              <p>Total MRP</p>
                              <p>Discount on MRP</p>
                              <p>Convenience Fee</p>
                            </div>
                            <div>
                              <p>₹₹{totalCartAmount ? totalCartAmount : ""}</p>
                              <p>₹0</p>
                              <p>₹45</p>
                            </div>
                          </div>
                          <div>
                            <div className="totalAmtDiv">
                              <p>Total Amount</p>
                              <p>
                                ₹{totalCartAmount ? totalCartAmount + 45 : ""}
                              </p>
                            </div>
                            <div className="placeOrder">
                              {loading2 === true ? (
                                <button>
                                  <i class="fa fa-spinner fa-spin"></i>
                                  Loading
                                </button>
                              ) : (
                                <button onClick={placeOrderHandler}>
                                  Place Order
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <LoadingScreen />
                  )}
                </div>
              ) : (
                <p className="eaqwiuiuweqewqqasxaS">Cart Is Empty🙁</p>
              )}
            </div>
            <button className="ASDFIJKOH" onClick={() => navigate(-1)}>
              🡠{" "}
            </button>
            <div className="asdikergq">
              {cartValue ? (
                <div className="ADESFOIPSE">
                  {cartValue.map((data) => (
                    <div className="ioeiow">
                      <div className="ASEFOIS">
                        <img
                          alt=""
                          className="qfghjm"
                          onClick={() =>
                            navigate("/productdetails/" + data._id)
                          }
                          src={data.productImage[0]}
                        />
                      </div>

                      <div className="ASDFKJASD">
                        <div className="SAIOO">
                          <p>{data.productName}</p>

                          <p>₹{data.productPrice}</p>
                          <p>Clour : {data.productColor}</p>
                          <p>
                            {data.productStock === true
                              ? "In Stock"
                              : "Out Of Stock"}
                          </p>
                          <p>Convinance Fee ₹45</p>
                        </div>
                        <div className="akjsasdgfs">
                          <p>Total:</p>
                          <p>
                            ₹{Number(data.productPrice.replace(/\,/g, "")) + 45}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="WAEERWF">
                    <p>
                      Total Amount ₹
                      {totalCartAmount ? totalCartAmount + 45 : ""}
                    </p>
                    {loading2 === true ? (
                      <button className="aesdoawed">
                        <i class="fa fa-spinner fa-spin"></i>
                        Loading
                      </button>
                    ) : (
                      <button className="aesdoawed" onClick={placeOrderHandler}>
                        Place Order
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <p className="eaqwiuiuweqewqqasxaS">Cart Is Empty🙁</p>
              )}
            </div>
          </div>
        ) : (
          <LoadingScreen />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
