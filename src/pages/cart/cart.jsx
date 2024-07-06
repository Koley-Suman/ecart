import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarts, increaseCart, reduceCart, removeCart } from "../../store/slice";
import { onAuthStateChanged_Listener } from "../../auth/auth";

const Cart = () => {
  const cartItem = useSelector((state) => {
    return state.carts.carts;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged_Listener((user) => {
      if (user) {
        dispatch(fetchCarts(user));
      }
    });
    return unsubscribe;
  }, [dispatch]);

  const cart = cartItem.map((item) => {
    return (
      <div key={item.id}>
        <h3>{item.name}</h3>
        <p>{item.price}</p>
        <button onClick={() => dispatch(increaseCart(item))}>+</button>
        <button>{item.quantity}</button>
        <button onClick={() => dispatch(reduceCart(item))}>-</button>
        <button onClick={() => dispatch(removeCart(item))}>remove</button>
      </div>
    );
  });
  return <div>{cart}</div>;
};

export default Cart;
