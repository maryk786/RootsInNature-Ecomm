import React, { useState, useRef, useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import BreadCrum from "../components/BreadCrum";
import { useDispatch, useSelector } from "react-redux";
import { getAProduct } from "../features/product/productSlice";
import { addProToCart, getUserCart } from "../features/user/userSlice";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [mainImage, setMainImage] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const getId = location.pathname.split("/")[2];

  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product.product);
  const userCartState = useSelector((state) => state.auth.getCart);

  useEffect(() => {
    dispatch(getAProduct(getId));
    dispatch(getUserCart());
  }, [dispatch, getId,userCartState]);

  useEffect(() => {
    if (productState?.images) {
      setMainImage(productState.images);
    }
  }, [productState]);

  useEffect(() => {
    for (let index = 0; index < userCartState?.length; index++) {
      if (getId === userCartState[index]?.productId?._id) {
        setAlreadyAdded(true);
        break;
      }
    }
  }, [userCartState, getId]);
  

  const addItemToCart = () => {
    dispatch(
      addProToCart({
        productId: productState?._id,
        quantity,
        price: productState?.price,
      })
    );
    // .then(() => {
    //   dispatch(getUserCart());
    //   navigate("/cart");
    // });
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
            <h2 className="text-4xl font-semibold pl-4">
              {productState?.title}
            </h2>
            <p className="product-data-price text-2xl py-2 pl-4">{`Rs${productState?.price}`}</p>
            <ul className="list pl-3 py-3">
              <li className="flex py-2">
                <h1 className="flex items-center font-semibold">
                  <GoDotFill className="" />
                  Scientific Name:
                </h1>
                <p>&nbsp;{productState?.scientific_name}</p>
              </li>
              <li className="flex py-2">
                <h1 className="flex items-center font-semibold">
                  <GoDotFill />
                  Common Name:
                </h1>
                <p>&nbsp;{productState?.common_name}</p>
              </li>
              <li className=" py-2">
                <h1 className="flex font-semibold">
                  <GoDotFill />
                  Description:
                </h1>
                <p className="pl-4 py-2">&nbsp;{productState?.description}</p>
              </li>
              <li className="py-2">
                <h1 className="flex font-semibold">
                  <GoDotFill />
                  Uses:
                </h1>
                <p className="pl-4 py-2">&nbsp;{productState?.uses}</p>
              </li>
            </ul>

            <hr />
            <div className="flex justify-end py-4">
              {alreadyAdded === false && (
                <>
                  <input
                    type="number"
                    className="border-2 w-20 py-1 text-center rounded"
                    placeholder="1"
                    min="1"
                    max="4"
                    onChange={(e) => setQuantity(e.target.value)}
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
              <tr>
                <td>Blooming Time</td>
                <td>Spring-Summer</td>
              </tr>
              <tr>
                <td>Seasons</td>
                <td>Evergreen</td>
              </tr>
              <tr>
                <td>Soil Requirement</td>
                <td>{productState?.soil_requirement}</td>
              </tr>
              <tr>
                <td>Environment</td>
                <td>{productState?.light_requirement}</td>
              </tr>
              <tr>
                <td>Watering</td>
                <td>{productState?.watering_schedule}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="container mb-5">
          <div className="row justify-center">
            <div className="col-10">
              <h1 className="text-3xl font-semibold mb-4">Related Products</h1>
              <div className="grid grid-cols-4 gap-3 ">
                {/* <ProductCard className="bg-red-600" />
                <ProductCard />
                <ProductCard />
                <ProductCard /> */}
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
