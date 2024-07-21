import React, { useState } from "react";
import CartAmountToggle from "./CartToggle";
import { FaTrash } from "react-icons/fa";
import img from "../assets/images/img1.webp";

const CartItem = ({ id, name, image, color, price }) => {
  const [amount, setAmounts] = useState(0);
  const setDecrease = () => {
    amount > 1 ? setAmounts(amount - 1) : setAmounts(1);
  };

  const setIncrease = () => {
    amount < 1 ? setAmounts(amount + 1) : setAmounts(1);
  };

  return (
    // <div className="cart_heading grid grid-five-column">
    //   <div className="cart-image--name ">
    //     <div>
    //       <figure>
    //         <img src={image} alt={id} />
    //       </figure>
    //     </div>
    //     <div>
    //       <p>{name}</p>
    //     </div>
    //   </div>
    //   {/* price   */}
    //   <div className="cart-hide">
    //     <p>
    //       <FormatPrice price={price} />
    //     </p>
    //   </div>

    //   {/* Quantity  */}
    //   <CartAmountToggle
    //     amount={amount}
    //     // setDecrease={() => setDecrease(id)}
    //     // setIncrease={() => setIncrement(id)}
    //   />

    //   {/* //Subtotal */}
    //   <div className="cart-hide">
    //     <p>
    //       <FormatPrice price={price * amount} />
    //     </p>
    //   </div>

    //   <div>
    //     <FaTrash
    //       className="remove_icon"
    //       // onClick={() => removeItem(id)}
    //     />
    //   </div>
    // </div>
    <div>
      <div className="cart-data grid grid-cols-6 text-center items-center uppercase mb-4 ">
        <div>
          <figure>
            <img src={img} className="img" alt={id} />
          </figure>
        </div>
        <div className="flex justify-center items-center">
          <p>{name}plants</p>
        </div>
        <div className="">122</div>
        <div>
          <CartAmountToggle
            amount={amount} // setDecrease={() => setDecrease(id)}
            // setIncrease={() => setIncrement(id)}
          />
        </div>

        <div className="">
          <p>213</p>
        </div>
        <div className="flex justify-center">
          <FaTrash />
        </div>
      </div>
      
    </div>
  );
};

export default CartItem;
