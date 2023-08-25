import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../store/userSlice";
import { userLogout } from "../store/userSlice";

export const LoginAndJWTTokenCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const LoginJwtToken = localStorage.getItem("LoginJwtToken");
    if (LoginJwtToken) {
      dispatch(userLogin(true));
    } else {
      dispatch(userLogout(false));
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(userLogout(false));
  };

  return { handleLogout };
};
