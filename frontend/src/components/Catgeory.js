import React, { useEffect } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllProduct } from "../features/product/productSlice";

const Category = () => {
  const { type } = useParams();
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product?.allProducts); // Assuming allProducts is where your products are stored in Redux

  useEffect(() => {
    dispatch(getAllProduct()); // Fetch products on component mount
  }, [dispatch]);

  // Filter products based on type parameter
  const filteredProducts = productState?.filter((product) =>
    type ? product.type.toLowerCase().includes(type.toLowerCase()) : true
  );

  const CategoryList = [
    { name: "Cactus", type: "cactus" },
    { name: "Climbers", type: "climbers" },
    { name: "Flowers", type: "flowers" },
    { name: "Fruit Plants", type: "fruit-plants" },
    { name: "Grass", type: "grass" },
    { name: "Ground Covers", type: "ground-covers" },
    { name: "Organic Fertilizers", type: "organic-fertilizers" },
    { name: "Indoor Plants", type: "indoor-plants" },
    { name: "Shrubs", type: "shrubs" },
    { name: "Seeds", type: "seeds" },
    { name: "Succulents", type: "succulents" },
    { name: "Hedge Plants Herbs", type: "hedge-plants-herbs" },
  ];

  return (
    <div>
      <div className="bg-[#d2f1a398] rounded-lg py-3 px-4 mb-3">
        <h1 className="text-xl font-semibold mb-3">Categories</h1>
        <ul>
          {CategoryList.map((category, index) => (
            <li className="flex items-center py-1" key={index}>
              <div className="text-xl">
                <IoIosArrowRoundForward />
              </div>
              &nbsp;
              <Link
                to={`/product-category/${category.type}`}
                className="hover:translate-x-3 hover:no-underline duration-500 hover:text-green-700"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
