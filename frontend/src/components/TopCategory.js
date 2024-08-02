// ImageList.js
import React from "react";
import CustomCard from "./CategoryCard";
import flowers from "../assets/images/flowering-plant.webp";
import shrubs from "../assets/images/shrubs.webp";
import succulent from "../assets/images/Succulent-plant.webp";
import indoorPlants from "../assets/images/indoor-plant.webp";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";

const TopCategories = () => {
  const images = [
    { name: "Flowers", image: flowers, path: "/product-categories/flowers" },
    { name: "Shrubs", image: shrubs, path: "/product-categories/shrubs" },
    {
      name: "Succulent",
      image: succulent,
      path: "/product-categories/succulents",
    },
    {
      name: "Indoor Plants",
      image: indoorPlants,
      path: "/product-categories/indoor-Plants",
    },
  ];
  return (
    <>
      <div className="container mt-14 mb-8">
        <div className="row">
          <div className="flex flex-col justify-center items-center">
            <h1 className="top-category-head text-center mb-5 font-bold text-3xl">
              Explore Our Popular Categories
            </h1>
            <div className="top-category grid grid-cols-4 ">
              {images.map((item, index) => (
                <Link key={index} to={item.path}>
                  <CustomCard
                    name={item.name}
                    image={item.image}
                    path={item.path}
                  />
                </Link>
              ))}
            </div>
            <Link
              to={"/shop"}
              className="flex justify-center my-5 hover:no-underline items-center"
            >
              <button className="top-category-button font-semibold bg-[#144402] flex py-3">
                Explore All Plants &nbsp;
                <span className=" text-center text-2xl">
                  <IoIosArrowRoundForward />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopCategories;
