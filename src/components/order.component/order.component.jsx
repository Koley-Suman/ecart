import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Order from "../../pages/order/order";
import { fetchOrder } from "../../store/slice";
import { onAuthStateChanged_Listener } from "../../auth/auth";

const OrderComponent = () => {
  const dispatch = useDispatch();
  const orderItem = useSelector((state) => state.carts.order);
  useEffect(() => {
    onAuthStateChanged_Listener((user) => {
      if (user) {
        dispatch(fetchOrder(user));
      }
    });
  }, [dispatch]);
  console.log(orderItem.length);
  const isOrder = orderItem.length != 0 ? <Order /> : <h2>NO ORDER YET !</h2>;
  return <>{isOrder}</>;
};

export default OrderComponent;
