import React, { useState, useRef, useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import BreadCrum from "../components/BreadCrum";
import { useDispatch, useSelector } from "react-redux";
import {
  getAProduct,
  getRelatedProducts,
} from "../features/product/productSlice";
import { addProToCart, getUserCart } from "../features/user/userSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard"; // Assuming you have a ProductCard component

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [mainImage, setMainImage] = useState(null);
  const [stockMessage, setStockMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const getId = location.pathname.split("/")[2];

  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product.product);
  const userCartState = useSelector((state) => state.auth.getCart);
  const relatedProducts = useSelector((state) => state.product.relatedProducts);

  useEffect(() => {
    dispatch(getAProduct(getId));
    dispatch(getUserCart());
  }, [dispatch, getId]);

  useEffect(() => {
    if (productState?.imageList && productState.imageList.length > 0) {
      setMainImage(productState.imageList[0]);
    }
    if (productState?._id) {
      dispatch(getRelatedProducts(productState._id));
    }
  }, [productState, dispatch]);

  useEffect(() => {
    for (let index = 0; index < userCartState?.length; index++) {
      if (getId === userCartState[index]?.productId?._id) {
        setAlreadyAdded(true);
        break;
      }
    }
  }, [userCartState, getId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [getId]);

  useEffect(() => {
    if (quantity > (productState?.stock || 0)) {
      setStockMessage(
        `Only ${productState?.stock} ${
          productState?.stock > 1 ? "products" : "product"
        } remain in stock.`
      );
    } else {
      setStockMessage("");
    }
  }, [quantity, productState?.stock, productState]);

  const addItemToCart = () => {
    if (quantity > productState?.stock) {
      return;
    }
    dispatch(
      addProToCart({
        productId: productState?._id,
        quantity,
        price: productState?.price,
      })
    );
  };

  const imageWrapperRef = useRef(null);
  const animatedImageRef = useRef(null);
  let rafTimeout = null;

  useEffect(() => {
    const imageWrapper = imageWrapperRef.current;
    const animatedImage = animatedImageRef.current;

    if (!imageWrapper || !animatedImage) {
      return;
    }

    const { offsetWidth, offsetHeight } = imageWrapper;

    const calculateOrigin = (event) => {
      const { offsetX, offsetY } = event;

      const deltaX = (100 / offsetWidth) * offsetX;
      const deltaY = (100 / offsetHeight) * offsetY;

      animatedImage.style.transformOrigin = `${Math.min(
        100,
        deltaX
      )}% ${Math.min(100, deltaY)}%`;
    };

    const handleMouseMove = (event) => {
      if (rafTimeout) {
        window.cancelAnimationFrame(rafTimeout);
      }
      rafTimeout = window.requestAnimationFrame(() => calculateOrigin(event));
    };

    imageWrapper.addEventListener("mousemove", handleMouseMove);

    return () => {
      imageWrapper.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <BreadCrum
        title={productState?.type}
        name={` Products -- ${productState?.title}`}
      />

      <div className="container">
        <div className="row justify-center py-5">
          <div className="product_images col-4 relative">
            <div className="main-image-container relative overflow-hidden">
              <div className="ImageWrapper" ref={imageWrapperRef}>
                <div className="AnimatedImage" ref={animatedImageRef}>
                  {mainImage && (
                    <img
                      src={mainImage}
                      className="main-image rounded h-[22rem] w-full object-cover"
                      alt=""
                    />
                  )}
                </div>
              </div>
              <div>
                {productState?.imageList &&
                  productState.imageList.length > 0 && (
                    <div className="image-gallery flex gap-2 pt-1">
                      {productState.imageList.map((imageSrc, index) => (
                        <img
                          key={index}
                          src={imageSrc}
                          className="main-image rounded-md h-[7rem] w-[7rem] border-1 p-1 border"
                          alt="product image"
                          onClick={() => setMainImage(imageSrc)}
                        />
                      ))}
                    </div>
                  )}
              </div>
            </div>
          </div>

          <div className="product-data col-6">
            <div className="flex justify-between items-center font-semibold">
              {productState?.title && (
                <h2 className="text-4xl font-semibold pl-4">
                  {productState.title}
                </h2>
              )}

              <p className="product-data-price text-sm py-2 pl-4 text-red-600">
                {productState?.stock > 0 ? "In Stock " : "Out Of Stock"}
              </p>
            </div>

            {productState?.price && (
              <p className="product-data-price text-2xl py-2 pl-4">{`Rs${productState.price}`}</p>
            )}
            <ul className="list pl-3 py-3">
              {productState?.scientific_name && (
                <li className="flex py-2">
                  <h1 className="flex items-center font-semibold">
                    <GoDotFill className="" />
                    Scientific Name:
                  </h1>
                  <p>&nbsp;{productState.scientific_name}</p>
                </li>
              )}
              {productState?.common_name && (
                <li className="flex py-2">
                  <h1 className="flex items-center font-semibold">
                    <GoDotFill />
                    Common Name:
                  </h1>
                  <p>&nbsp;{productState.common_name}</p>
                </li>
              )}
              {productState?.subtitle && (
                <h1 className=" font-semibold text-sm py-2">
                  &nbsp;{productState.subtitle}
                </h1>
              )}
              {productState?.description && (
                <li className=" py-2">
                  <h1 className="flex font-semibold">
                    <GoDotFill />
                    Description:
                  </h1>
                  <p className="pl-4 py-2">&nbsp;{productState.description}</p>
                </li>
              )}
              {productState?.uses && (
                <li className="py-2">
                  <h1 className="flex font-semibold">
                    <GoDotFill />
                    Uses:
                  </h1>
                  <p className="pl-4 py-2">&nbsp;{productState.uses}</p>
                </li>
              )}
            </ul>

            <hr />
            <div className="flex justify-end items-center gap-3 py-4">
              {stockMessage && (
                <p className="text-red-600 font-semibold">{stockMessage}</p>
              )}
              {alreadyAdded === false && (
                <>
                  <input
                    type="number"
                    className="border-2 w-20 py-1 text-center rounded"
                    placeholder="1"
                    min="1"
                    max="4"
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    value={quantity}
                  />
                </>
              )}
              <div className="gap-4 justify-between items-end">
                <button
                  type="button"
                  onClick={() =>
                    alreadyAdded ? navigate("/cart") : addItemToCart()
                  }
                  hidden={quantity > productState?.stock}
                >
                  {alreadyAdded ? "Go to Cart" : "Add To Cart"}
                </button>
                <button type="button" onClick={() => navigate("/shop")}>
                  Shop More
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-center">
          <table className="col-10 mb-5">
            <thead>
              <tr className="text-center">
                <th className="w-40">Attribute</th>
                <th>Information</th>
              </tr>
            </thead>
            <tbody>
              {productState?.benefits && (
                <tr>
                  <td>Benefits</td>
                  <td>{productState.benefits}</td>
                </tr>
              )}
              {productState?.blooming_time && (
                <tr>
                  <td>Blooming Time</td>
                  <td>{productState.blooming_time}</td>
                </tr>
              )}
              {productState?.season && productState.season.length > 0 && (
                <tr>
                  <td>Seasons</td>
                  <td>{productState.season.join(", ")}</td>
                </tr>
              )}
              {productState?.soil_requirement && (
                <tr>
                  <td>Soil Requirement</td>
                  <td>{productState.soil_requirement}</td>
                </tr>
              )}
              {productState?.light_requirement && (
                <tr>
                  <td>Environment</td>
                  <td>{productState.light_requirement}</td>
                </tr>
              )}
              {productState?.watering_schedule && (
                <tr>
                  <td>Watering</td>
                  <td>{productState.watering_schedule}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="container mb-5">
          <div className="row justify-center">
            <div className="col-10">
              <h1 className="text-3xl font-semibold mb-4">Related Products</h1>
              <div className="grid grid-cols-4 gap-3 ">
                {relatedProducts?.map((product) => (
                  <ProductCard key={product._id} data={product} />
          ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default SingleProduct;
