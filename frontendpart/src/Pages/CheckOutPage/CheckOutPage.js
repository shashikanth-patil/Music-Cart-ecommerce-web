import React from "react";
import OfferNavbar from "../../Components/OfferNavbar/OfferNavbar";
import Navbar from "../../Components/Navbar/Navbar";
import BackToProductPageBtn from "../../Components/BackToProductPageBtn/BackToProductPageBtn";
import "./CheckOutPage.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchCartProduct } from "../../FetchCartProduct/FetchCartProduct";
import axios from "axios";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import Footer from "../../Components/Footer/Footer";

const CheckOutPage = () => {
  const [totalCartAmount, setTotalCartAmount] = useState();
  const [userEmail, setUserEmail] = useState();
  const [checkOutCartDetailis, setCheckOutCartDetailis] = useState();
  const [checkOutProductOrNot, setCheckOutProductOrNot] = useState();
  const [loading, setLoading] = useState(false);

  const { getCartItem } = FetchCartProduct();
  const cartValue = useSelector((state) => state.authentications.cartValue);

  const navigate = useNavigate();

  const placeOrderHandler = () => {
    setLoading(true);

    if (checkOutProductOrNot === true) {
      axios
        .post(
          "https://musicart-full-stack-project-backend.onrender.com/checkOutProduct",
          {
            forCheckOutPageChaker: userEmail.replace(/"|'/g, ""),
          }
        )
        .then(function (response) {
          alert("Check out product Delete Successfully!");
          setLoading(false);

          navigate("/success");
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      setLoading(true);

      axios
        .post(
          "https://musicart-full-stack-project-backend.onrender.com/removeCartProduct",
          {
            email: userEmail.replace(/"|'/g, ""),
          }
        )
        .then(function (response) {
          alert(response.data);
          navigate("/success");
          setLoading(false);

          getCartItem();
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };
  useEffect(() => {
    setUserEmail(localStorage.getItem("userEmail"));
  }, []);
  useEffect(() => {
    checkOutProduct();
  }, [cartValue]);
  const checkOutProduct = () => {
    axios
      .get(
        "https://musicart-full-stack-project-backend.onrender.com/checkOutProduct"
      )
      .then(function (response) {
        const filteredData = response.data.filter(
          (data) =>
            data.checkOutProductEmail ===
              localStorage.getItem("userEmail").replace(/"|'/g, "") &&
            data.checkOutPageChaker === true
        );
        if (filteredData.length > 0) {
          axios
            .get("https://musicart-full-stack-project-backend.onrender.com/")
            .then(function (response2) {
              setCheckOutProductOrNot(true);
              filteredData.map((dataa) => {
                const result = response2.data.filter((data) => {
                  if (data._id === dataa.checkOutProductId) {
                    return data;
                  }
                });
                setCheckOutCartDetailis(result);
                let totalAmount = 0;

                result.map((data) => {
                  totalAmount += Number(
                    data.productQuantity
                      ? data.productQuantity
                      : 1 * data.productPrice.replace(/\,/g, "")
                  );
                });
                setTotalCartAmount(totalAmount);
              });
            });
        } else {
          setCheckOutProductOrNot(false);

          setCheckOutCartDetailis(cartValue);
          setCheckOutCartDetailis(cartValue);
          let totalAmount = 0;

          cartValue.map((data) => {
            totalAmount += Number(
              data.productQuantity * data.productPrice.replace(/\,/g, "")
            );
          });
          setTotalCartAmount(totalAmount);
        }
      })
      .catch(function (error) {
        console.log("Error:", error);
      });
  };

  return (
    <div>
      {checkOutCartDetailis ? (
        <div>
          <OfferNavbar />
          <div className="checkOutContainer">
            <Navbar CheckOut={"CheckOut"} />
            <div className="jhbdjadss">
              <BackToProductPageBtn />
            </div>
            <div className="checkoutText">
              <p>Checkout</p>
            </div>
            {checkOutCartDetailis && checkOutCartDetailis.length > 0 ? (
              <div className="checkOutItmeContainer">
                <div>
                  <div className="AddressDiv">
                    <p>1. Delivery address</p>
                    <p>
                      Swaroop R <br />
                      101 <br /> kumar nagar, Bangalore <br />
                    912345
                    </p>
                  </div>
                  <hr />
                  <div className="paymentDiv">
                    <p>2. Payment method</p>
                    <p>Pay on delivery ( Cash/Card )</p>
                  </div>
                  <hr />
                  <div className="reviewDiv">
                    <p>3. Review items and delivery</p>

                    <div>
                      {checkOutCartDetailis
                        ? checkOutCartDetailis.map((data) => (
                            <div>
                              <img
                                className="productImg"
                                src={data.productImage[0]}
                              />
                              <p className="productName">{data.productName}</p>
                              <p className="productColor">
                                Clour : {data.productColor}
                              </p>
                              <p className="productColor">
                                {data.productStock === true
                                  ? "In Stock"
                                  : "Out Of Stock"}
                              </p>
                              <p className="deliveryTime">
                                Estimated delivery :<br /> Monday — FREE
                                Standard Delivery
                              </p>
                            </div>
                          ))
                        : ""}
                    </div>
                  </div>
                  <hr />
                  <div className="placeOrderDivv">
                    <div>
                      {loading === true ? (
                        <button>
                          <i class="fa fa-spinner fa-spin"></i>
                          Loading
                        </button>
                      ) : (
                        <button onClick={placeOrderHandler}>
                          Place your order
                        </button>
                      )}
                    </div>
                    <div>
                      <p>Order Total : ₹{totalCartAmount + 45}.00</p>
                      <p>
                        By placing your order, you agree to Musicart privacy
                        notice and conditions of use.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="placeOrderDiiv">
                  <div className="placeOrderInnerDiv">
                    {loading === true ? (
                      <button>
                        <i class="fa fa-spinner fa-spin"></i>
                        Loading
                      </button>
                    ) : (
                      <button onClick={placeOrderHandler}>
                        Place your order
                      </button>
                    )}
                    <p>
                      By placing your order, you agree to Musicart privacy
                      notice and conditions of use.
                    </p>
                  </div>

                  <hr />
                  <p className="placeOrderSummary">Order Summary</p>
                  <div className="itemDiv">
                    <div className="orderTotalaAmount">
                      <p>Items : </p>
                      <p>Delivery : </p>
                    </div>

                    <div className="orderTotalaAmount">
                      <p>₹{totalCartAmount}.00</p>
                      <p>₹45.00</p>
                    </div>
                  </div>
                  <hr />

                  <div className="orderTotalaAmt">
                    <p>Order Total : </p>
                    <p>₹{totalCartAmount + 45}.00</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="eaqwiuiuweqewqqasxaS">
                No Product Avialble In Your Cart🙁
              </p>
            )}
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
      <Footer />
    </div>
  );
};

export default CheckOutPage;
