import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiMenu3Line } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const closeNavbar = () => {
    setShowNavbar(false);
  };

  // Filter logic based on searchQuery
  const filteredNavLinks = [
    { to: "/shop", text: "Shop" },
    { to: "/product-categories/indoor-plants", text: "Indoor Plants" },
    { to: "/product-categories/fruit-plants", text: "Fruit Plants" },
    { to: "/product-categories/fertilizer", text: "Fertilizer" },
    { to: "/product-categories/equipments", text: "Equipments" },
    { to: "/product-categories/seed", text: "Seeds" },
    { to: "/contact", text: "Contact" },
    { to: "/all-orders", text: "My Orders" },
  ].filter((item) =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <nav className="navbar h-full mx-auto bg-[#a3d359]">
      <div className="flex justify-center items-center">
        <div className="menu-icon" onClick={handleShowNavbar}>
          <RiMenu3Line />
        </div>
        <div className={`nav-elements ${showNavbar && "active"}`}>
          <ul>
            {filteredNavLinks.map((item, index) => (
              <li key={index}>
                <NavLink to={item.to} onClick={closeNavbar}>
                  {item.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="hidden input-field items-center w-full justify-between max-w-xs border rounded-full focus-within:shadow">
        <input
          type="text"
          placeholder="Search here..."
          className="w-full  pl-3 ml-1 outline-none border-none "
        />
        <div className="text-2xl bg-[#026603] text-white h-9 min-w-[50px] flex justify-center items-center rounded-r-full">
          <IoMdSearch />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
