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

  const [TotalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    dispatch(getUserCart());
  }, [dispatch]);

  const deleteAProduct = (id) => {
    dispatch(removeProductFromCart(id)).then(() => {
      dispatch(getUserCart());
    });
  };

  const updateQuantity = (cartItemId, quantity, stock) => {
    if (quantity > stock) {
      return;
    }
    dispatch(updateProductCart({ cartItemId, quantity }));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 200);
  };

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCartState?.length; index++) {
      const item = userCartState[index];
      let itemTotal = item.quantity * item.price;
      if (item.quantity >= 3) {
        itemTotal = itemTotal * 0.8; // Apply 20% discount
      }
      sum += itemTotal;
    }

    // Apply additional 10% discount if total is greater than 4000
    const finalTotal = sum > 4000 ? sum * 0.9 : sum;
    setTotalAmount(finalTotal);
  }, [userCartState]);

  return (
    <section className="cart">
      <div className="w-full">
        <BreadCrum className="cart-bread" title="Cart" name="Cart" />
      </div>
      <div className="cart-row px-2 flex-col flex mt-20">
        <div className="cart-div">
          <div className="cart-head grid grid-cols-6 text-center items-center text-[1.2rem] font-semibold mb-4 ">
            <span>Item</span>
            <span className="">Product Name</span>
            <span className="">Price</span>
            <span>Quantity</span>
            <span className="">Subtotal</span>
            <span>Remove</span>
          </div>
          <hr className="hidden" />
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
        <NavLink to="/shop">
          <button className="cart--button text-white py-2 px-4 rounded">
            Continue Shopping
          </button>
        </NavLink>
        <div className="flex gap-5 justify-end capitalize mb-4 rounded">
          <div className="border border-gray-200 flex rounded flex-col gap-6 px-4 py-5">
            <div className="flex justify-between text-xl font-semibold">
              <span>Subtotal: </span>
              <span> Rs {Math.floor(TotalAmount)}</span>
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
      <hr />
    </section>
  );
};

const CartItem = ({ item, deleteAProduct, updateQuantity }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [warning, setWarning] = useState("");
  const [discountMessage, setDiscountMessage] = useState("");

  useEffect(() => {
    if (quantity >= 3) {
      setDiscountMessage(`20% off`);
    } else {
      setDiscountMessage("");
    }
  }, [quantity]);

  const handleChange = (event) => {
    const newQuantity = event.target.value;
    if (newQuantity <= item.productId.stock) {
      setWarning("");
      setQuantity(newQuantity);
      updateQuantity(item._id, newQuantity, item.productId.stock);
    } else {
      setWarning(`Only ${item.productId.stock} products remain in stock`);
    }
  };

  return (
    <div className="cart-data grid grid-cols-6 text-center items-center mb-4">
      <div>
        <figure>
          <img
            src={item?.productId?.imageList?.[0] || "placeholder.jpg"}
            className="cart-img w-32 h-20"
            alt={item?.productId?.title || "Product Image"}
          />
        </figure>
      </div>
      <div className="cart-title flex justify-center items-center">
        <p>{item?.productId?.title || "No Title Available"}</p>
      </div>
      <div className="cart-title">{item?.price || "N/A"}</div>
      <div>
        <input
          type="number"
          className="border-2 cart-quantity w-20 py-1 text-center rounded"
          min="1"
          value={quantity}
          onChange={handleChange}
        />
        {warning && <p className="text-red-500 text-sm">{warning}</p>}
        {discountMessage && (
          <p className="text-green-600 text-sm">{discountMessage}</p>
        )}
      </div>
      <div className="">
        <p className="cart-title">
          {Math.floor(item.price * quantity * (quantity >= 3 ? 0.8 : 1))}
        </p>
      </div>
      <div className="flex justify-center text-red-700 cursor-pointer">
        <FaTrash onClick={() => deleteAProduct(item?._id)} />
      </div>
    </div>
  );
};

export default Cart;
