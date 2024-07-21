import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  const location = useLocation();
  const noFooterPaths = ["/login", "/register","/forget-password","/reset-password"];

  return (
    <>
      <Header />
      <Navbar />
      <main>
        <Outlet />
      </main>
      {!noFooterPaths.includes(location.pathname) && <Footer />}
      <ToastContainer
      position="top-right"
      autoClose={400}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light" />
    </>
  );
};

export default Layout;
