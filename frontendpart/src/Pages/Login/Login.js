import React, { useState } from "react";
import Footer from "../../Components/Footer/Footer";
import MusicLogo from "../../images/musicLogo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import { useSelector } from "react-redux";
import "../Register/Register.css";

const Login = () => {
  const isAuthenticated = useSelector(
    (state) => state.authentications?.isAuthenticated || ""
  );
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [input, setInput] = useState({
    EmailNumber: "",
    Password: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    EmailNumber: "",
    Password: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInput((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });

    if (name === "EmailNumber" && value.endsWith("@gmail.com")) {
      setErrorMessage({
        ...errorMessage,
        EmailNumber: "Coool Email is done with correct Form",
      });
    } else if (name === "EmailNumber" && !value.endsWith("@gmail.com")) {
      setErrorMessage({
        ...errorMessage,
        EmailNumber: "Email must end with @gmail.com",
      });
    } else if (name === "Password" && value.length >= 5) {
      setErrorMessage({
        ...errorMessage,
        Password: "Coool Password is done by at least 5 character",
      });
    } else if (name === "Password" && value.length < 5) {
      setErrorMessage({
        ...errorMessage,
        Password: "Password must be at least 5 characters long.",
      });
    }
  };

  const SignHandler = (event) => {
    setLoading(false);

    event.preventDefault();

    try {
      axios
        .post(
          "https://musicart-full-stack-project-backend.onrender.com/login",
          {
            email: input.EmailNumber,
            password: input.Password,
          }
        )
        .then((response) => {
          localStorage.setItem(
            "LoginJwtToken",
            JSON.stringify(response.data.token)
          );
          localStorage.setItem(
            "userEmail",
            JSON.stringify(response.data.email)
          );
          setLoading(false);
          navigate("/");
        })
        .catch((error) => {
          alert("Error:" + error.response.data);
          setLoading(true);
        });
    } catch (error) {
      console.error("Error:", error);
    }

    setInput({
      EmailNumber: "",
      Password: "",
    });
    setErrorMessage({
      EmailNumber: "",
      Password: "",
    });
  };

  return (
    <div className="loginContainer">
      {loading === true ? (
        <div>
          {isAuthenticated === true ? (
            navigate("/")
          ) : (
            <div className="container LoginContainer">
              <div>
                <img className="musicLogo" src={MusicLogo} alt="" />
                <p className="musicArt">Musicart</p>
              </div>
              <form onSubmit={SignHandler}>
                <p className="createAccount">Sign in </p>
                <label>Enter your email or mobile number</label>
                <input
                  value={input.EmailNumber}
                  pattern="[a-z0-9._%+-]+@gmail\.com$"
                  required
                  type="email"
                  name="EmailNumber"
                  onChange={inputHandler}
                ></input>
                {errorMessage ? (
                  <p className="errorMsg">{errorMessage.EmailNumber}</p>
                ) : (
                  setErrorMessage("")
                )}
                <label>Password</label>
                <input
                  required
                  value={input.Password}
                  name="Password"
                  onChange={inputHandler}
                ></input>
                {errorMessage ? (
                  <p className="errorMsg">{errorMessage.Password}</p>
                ) : (
                  setErrorMessage("")
                )}
                <button className="continueBtn">Continue</button>
                <p className="termAndCondition">
                  By continuing, you agree to Musicart privacy notice and
                  conditions of use.
                </p>
              </form>
              <div className="musicDiv">
                <div className="musicInnerDiv">
                  <div></div>
                  <p>New to Musicart?</p>
                  <div></div>
                </div>
                <button
                  className="createAccountBtn"
                  onClick={() => navigate("/register")}
                >
                  Create your Musicart account
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <LoadingScreen />
      )}
      <Footer />
    </div>
  );
};

export default Login;
