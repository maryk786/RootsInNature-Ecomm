import { Link, NavLink } from "react-router-dom";
import BreadCrum from "../components/BreadCrum";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getUserCart,
  removeProductFromCart,
  updateProductCart,
} from "../features/user/userSlice";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const dispatch = useDispatch();
  const userCartState = useSelector((state) => state.auth.getCart);
  const [TotalAmount, setTotalAmount] = useState(null);

  useEffect(() => {
    dispatch(getUserCart());
  }, [dispatch]);

  const deleteAProduct = (id) => {
    dispatch(removeProductFromCart(id)).then(() => {
      dispatch(getUserCart());
    });
  };

  const updateQuantity = (cartItemId, quantity) => {
    dispatch(updateProductCart({ cartItemId, quantity }));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 200);
  };
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCartState?.length; index++) {
      sum =
        sum +
        Number(userCartState[index].quantity * userCartState[index].price);
      //  console.log(sum)
      setTotalAmount(sum);
    }
  }, [userCartState]);

  return (
    <section className="container">
      <BreadCrum title="Cart" name="Cart" />
      <div className="row justify-center">
        <div className="cart-row col-10 mt-20">
          <div className="cart-div">
            <div className="cart-head grid grid-cols-6 text-center items-center text-[1.2rem] font-semibold mb-4 ">
              <span>Item</span>
              <span className="">Product Name</span>
              <span className="">Price</span>
              <span>Quantity</span>
              <span className="">Subtotal</span>
              <span>Remove</span>
            </div>
            <hr />
            <div className="mt-4 cart-data">
              {Array.isArray(userCartState) && userCartState.length > 0 ? (
                userCartState.map((e, i) => (
                  <CartItem
                    key={i}
                    item={e}
                    deleteAProduct={deleteAProduct}
                    updateQuantity={updateQuantity}
                  />
                ))
              ) : (
                <p>Empty Cart</p>
              )}
            </div>
          </div>
          <hr />
          <div className="flex justify-between mt-4">
            <NavLink to="/shop">
              <button className=" text-white py-2 px-4 rounded">
                Continue Shopping
              </button>
            </NavLink>
          </div>
          <div className="flex gap-5 justify-end capitalize mb-4 rounded">
            <div className="border border-gray-200 flex rounded flex-col gap-6 px-4 py-5">
              <div className="flex justify-between text-xl font-semibold">
                <span>Subtotal: </span>
                <span> Rs {TotalAmount}</span>
              </div>
              <span className="text-sm">
                Taxes and shipping calculated on Checkout
              </span>
              <hr />

              <Link
                className="flex items-end justify-end hover:text-[#] hover:no-underline"
                to={"/checkout"}
              >
                <button className="py-2 px-3">Check Out</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </section>
  );
};

const CartItem = ({ item, deleteAProduct, updateQuantity }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleChange = (event) => {
    const newQuantity = event.target.value;
    setQuantity(newQuantity);
    updateQuantity(item._id, newQuantity);
  };

  return (
    <div className="cart-data grid grid-cols-6 text-center items-center mb-4">
      <div>
        <figure>
          <img
            src={item?.productId?.images || "placeholder.jpg"}
            className="img w-32 h-20"
            alt={item?.productId?.title || "Product Image"}
          />
        </figure>
      </div>
      <div className="flex justify-center items-center">
        <p>{item?.productId?.title || "No Title Available"}</p>
      </div>
      <div className="">{item?.productId?.price || "N/A"}</div>
      <div>
        <input
          type="number"
          className="border-2 w-20 py-1 text-center rounded"
          min="1"
          max="4"
          value={quantity}
          onChange={handleChange}
        />
      </div>
      <div className="">
        <p>{item?.productId?.price * item?.quantity || "N/A"}</p>
      </div>
      <div className="flex justify-center text-red-700 cursor-pointer">
        <FaTrash onClick={() => deleteAProduct(item?._id)} />
      </div>
    </div>
  );
};

export default Cart;
