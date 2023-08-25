import React, { useState } from "react";
import "./Register.css";
import MusicLogo from "../../images/musicLogo.png";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import { useSelector } from "react-redux";
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useSelector(
    (state) => state.authentications?.isAuthenticated || ""
  );
  const [input, setInput] = useState({
    Name: "",
    Number: "",
    Email: "",
    Password: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    Name: "",
    Number: "",
    Email: "",
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
    if (name === "Name" && value.length >= 5) {
      setErrorMessage({
        ...errorMessage,
        Name: "Coool Name is done with correct Form",
      });
    } else if (name === "Name" && value.length <= 5) {
      setErrorMessage({
        ...errorMessage,
        Name: "Name must be at least 5 characters long.",
      });
    } else if (name === "Number" && value.length === 10) {
      setErrorMessage({
        ...errorMessage,
        Number: "Coool Number is done with correct Form",
      });
    } else if (name === "Number" && value.length !== 10) {
      setErrorMessage({
        ...errorMessage,
        Number: "Number must be at least 10 characters long.",
      });
    } else if (name === "Email" && value.endsWith("@gmail.com")) {
      setErrorMessage({
        ...errorMessage,
        Email: "Coool Email is done with correct Form",
      });
    } else if (name === "Email" && !value.endsWith("@gmail.com")) {
      setErrorMessage({
        ...errorMessage,
        Email: "Email must end with @gmail.com",
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

  const submitHandler = (e) => {
    setLoading(false);

    e.preventDefault();
    try {
      axios
        .post(
          "https://musicart-full-stack-project-backend.onrender.com/register",
          {
            name: input.Name,
            number: input.Number,
            email: input.Email,
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

      setInput({
        Name: "",
        Email: "",
        Number: "",
        Password: "",

        CheckBox: false,
      });
      setErrorMessage({
        Name: "",
        Email: "",
        Number: "",
        Password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {loading === true ? (
        <div>
          {isAuthenticated === true ? (
            navigate("/")
          ) : (
            <div className="container">
              <div>
                <img className="musicLogo" src={MusicLogo} alt="" />
                <p className="musicArt">Musicart</p>
              </div>
              <form onSubmit={submitHandler}>
                <p className="createAccount">Create Account Here</p>
                <label>Your name</label>
                <input
                  required
                  name="Name"
                  value={input.Name}
                  onChange={inputHandler}
                ></input>
                {errorMessage ? (
                  <p className="errorMsg">{errorMessage.Name}</p>
                ) : (
                  setErrorMessage("")
                )}
                <label>Mobile number</label>
                <input
                  requiredss
                  type="number"
                  name="Number"
                  value={input.Number}
                  onChange={inputHandler}
                ></input>
                {errorMessage ? (
                  <p className="errorMsg">{errorMessage.Number}</p>
                ) : (
                  setErrorMessage("")
                )}
                <label>Email Id</label>
                <input
                  required
                  name="Email"
                  pattern="[a-z0-9._%+-]+@gmail\.com$"
                  value={input.Email}
                  onChange={inputHandler}
                ></input>
                {errorMessage ? (
                  <p className="errorMsg">{errorMessage.Email}</p>
                ) : (
                  setErrorMessage("")
                )}
                <label>Password</label>
                <input
                  required
                  name="Password"
                  value={input.Password}
                  onChange={inputHandler}
                ></input>
                {errorMessage ? (
                  <p className="errorMsg">{errorMessage.Password}</p>
                ) : (
                  setErrorMessage("")
                )}
                <p className="numberVerification">
                  By enrolling your mobile phone number, you consent to receive
                  automated security notifications via text message from
                  Musicart. Message and data rates may apply.
                </p>
                <button className="continueBtn">Continue</button>
                <p className="termAndCondition">
                  By continuing, you agree to Musicart privacy notice and
                  conditions of use.
                </p>
              </form>
              <p className="signIn" onClick={() => navigate("/login")}>
                Already have an account? Sign in
              </p>
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

export default Register;
