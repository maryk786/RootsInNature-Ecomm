import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import SingleProduct from "./pages/SingleProduct";
import Contact from "./pages/ContactUs";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgetPage";
import ResetPassword from "./pages/ResetPassword";
import TermsAndConditions from "./components/TermCondition";
import SearchResults from "./components/SeaechResults";
import Cart from "./pages/Cart";
import Checkout from "./pages/CheckOut";
import OrderConfirmation from "./pages/OrderConfirmation";
import { PrivateRoutes } from "./routing/PrivateRoutes";
import { OpenRoutes } from "./routing/OpenRoutes";
import AllOrders from "./pages/AllOrders";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* child route of layout  */}
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="product-category/:type" element={<Shop />} />
            <Route path="product-categories/:category" element={<Shop />} />
            <Route path="product/:id" element={<SingleProduct />} />
            <Route path="contact" element={<Contact />} />
            <Route
              path="login"
              element={
                <OpenRoutes>
                  <Login />
                </OpenRoutes>
              }
            />
            <Route
              path="register"
              element={
                <OpenRoutes>
                  <Register />
                </OpenRoutes>
              }
            />
            <Route
              path="cart"
              element={
                <PrivateRoutes>
                  <Cart />
                </PrivateRoutes>
              }
            />
            <Route
              path="checkout"
              element={
                <PrivateRoutes>
                  <Checkout />
                </PrivateRoutes>
              }
            />
            <Route path="orderConfirmation" element={<OrderConfirmation />} />
            <Route path="/products/search" element={<SearchResults />} />
            {/* <Route path="/products/search" element={<Shop />} /> */}
            <Route path="all-orders" element={<AllOrders />} />
            <Route path="forget-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="termcondition" element={<TermsAndConditions />} />
            <Route
              path="wishlist"
              element={
                <PrivateRoutes>
                  <Wishlist />
                </PrivateRoutes>
              }
            />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
