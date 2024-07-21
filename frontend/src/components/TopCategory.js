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
    { name: "Flowers", image: flowers, path: "/product-category/flowers" },
    { name: "Shrubs", image: shrubs, path: "/product-category/shrubs" },
    {
      name: "Succulent",
      image: succulent,
      path: "/product-category/succulent",
    },
    {
      name: "Indoor Plants",
      image: indoorPlants,
      path: "/product-category/indoorPlants",
    },
  ];
  return (
    <>
      <div className="container mt-14 mb-8">
        <div className="row">
          <div className="flex flex-col justify-center items-center">
            <h1 className=" text-center mb-5 font-bold text-3xl">
              Explore Our Popular Categories
            </h1>
            <div className="top-category grid grid-cols-4">
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
              className="flex justify-center my-5 hover:no-underline"
            >
              <button className="bg-[#144402] flex py-3">
                Explore All Plants &nbsp;
                <span className=" flex items-center justify-center text-center text-2xl">
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
