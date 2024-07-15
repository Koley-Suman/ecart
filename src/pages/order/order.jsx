import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged_Listener } from "../../auth/auth";
import { fetchOrder } from "../../store/slice";
import './order.scss'

const Order = () => {
  const dispatch = useDispatch();
  const OrderItem = useSelector((state)=>state.carts.order)
  useEffect(() => {
    onAuthStateChanged_Listener((user) => {
      if (user) {
        dispatch(fetchOrder(user));
      }
    });
  }, [dispatch]);

  
    const order = OrderItem.map((item) => {
      return (
        <div key={item.id} className="cart_item_container">
          <div className="image_container">
            <div className="image_box" onClick={() => navigateEvent(item)}>
              <div
                className="image"
                style={{ backgroundImage: `url(${item.imageUrl})` }}
              ></div>
            </div>
          </div>
          <div className="item_details">
            <div className="item_name">
              <p>{item.name}</p>
            </div>
            <div className="price">
              <p
                style={{
                  textDecorationLine: "line-through",
                  color: "gray",
                }}
              >
                $3499
              </p>
              <p className="price_tag">${item.price * item.quantity}</p>
              <p
                style={{ color: "green", fontWeight: "bold", fontSize: "large" }}
              >
                30% off
              </p>
            </div>
          </div>
          <div className="delete_box">
            <h3>ORDER PLACED...</h3>
          </div>
        </div>
      );
    });
  

  

  return (
    <>
      <div className="order_container">
        <div className="container_box">
          {order}
        </div>
      </div>
    </>
  );
};

export default Order;
