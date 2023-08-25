import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../src/Pages/Login/Login";
import Register from "../src/Pages/Register/Register";
import Home from "../src/Pages/Home/Home";
import ProductDetailPage from "../src/Pages/ProductDetailPage/ProductDetailPage";
import Cart from "../src/Pages/Cart/Cart";
import CheckOutPage from "../src/Pages/CheckOutPage/CheckOutPage";
import SuccessPage from "../src/Pages/SuccessPage/SuccessPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="productdetails/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOutPage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
