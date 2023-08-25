import { useDispatch } from "react-redux";
import { currentCartValue } from "../store/userSlice";
import axios from "axios";

export const FetchCartProduct = () => {
  const dispatch = useDispatch();
  const getCartItem = () => {
    const userEmail = localStorage.getItem("userEmail");

    if (userEmail) {
      axios
        .get(
          "https://musicart-full-stack-project-backend.onrender.com/getCartProduct",
          {
            params: {
              email: userEmail.replace(/"|'/g, ""),
            },
          }
        )
        .then((response) => {
          const cartData = response.data.map((data) => {
            const productData = data.id.map((id) => {
              return axios
                .get(
                  "https://musicart-full-stack-project-backend.onrender.com/productdetails/" +
                    id.cartId
                )
                .then((response) => {
                  if (id.cartId.includes(response.data._id)) {
                    return {
                      ...response.data,
                      productQuantity: id.productQuantity,
                    };
                  }
                })
                .catch(function (err) {
                  alert(err.message);
                });
            });
            return Promise.all(productData);
          });
          Promise.all(cartData).then((data) => {
            const cartItems = data.flat();
            dispatch(currentCartValue(cartItems));
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      dispatch(currentCartValue());
    }
  };

  return { getCartItem };
};
