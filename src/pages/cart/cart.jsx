import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseCart, reduceCart, removeCart } from "../../store/slice";

const Cart = () => {
  const cartItem = useSelector((state) => {
    return state.carts;
  });
  const dispatch = useDispatch();

  const cart = cartItem.map((item) => {
    return (
      <div key={item.id}>
        <h3>{item.name}</h3>
        <p>{item.price}</p>
        <button onClick={() => dispatch(increaseCart(item.id))}>+</button>
        <button>{item.quantity}</button>
        <button onClick={() => dispatch(reduceCart(item.id))}>-</button>
        <button onClick={() => dispatch(removeCart(item.id))}>remove</button>
      </div>
    );
  });
  return <div>{cart}</div>;
};

export default Cart;
