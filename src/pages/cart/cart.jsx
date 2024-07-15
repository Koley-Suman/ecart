import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCarts,
  increaseCart,
  reduceCart,
  removeCart,
} from "../../store/slice";
import { onAuthStateChanged_Listener } from "../../auth/auth";
import "./cart.scss";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Avatar, Divider, IconButton } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useNavigate } from "react-router-dom";
import PaymentForm from "../../components/payment.component/payment.component";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItem = useSelector((state) => {
    return state.carts.carts;
  });
  const navigateEvent = (item) => {
    navigate(`/categori/${item.categori}/${item.id}`);
  };
  const totalprice = cartItem.reduce(
    (total, cart_Item) => total + cart_Item.quantity * cart_Item.price,
    0
  );
  const cart = cartItem.map((item) => {
    return (
      <div key={item.id} className="cart_item_container">
        <div className="image_container">
          <div className="image_box" onClick={() => navigateEvent(item)}>
            <div
              className="image"
              style={{ backgroundImage: `url(${item.imageUrl})` }}
            ></div>
          </div>
          <div className="increase_decrease_box">
            <IconButton
              label="Clickable"
              onClick={() => dispatch(increaseCart(item))}
            >
              <AddIcon />
            </IconButton>
            <Avatar sx={{ height: 30 }} variant="square">
              {item.quantity}
            </Avatar>
            <IconButton
              label="Clickable"
              onClick={() => dispatch(reduceCart(item))}
            >
              <RemoveIcon />
            </IconButton>
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
          <IconButton onClick={() => dispatch(removeCart(item))}>
            <DeleteOutlinedIcon sx={{ fontSize: 35 }} />
          </IconButton>
        </div>
      </div>
    );
  });
  return (
    <>
      <div className="cart_container">
        <div className="cart_item_box">{cart}</div>
        <div className="check_out">
          <div className="check_out_container">
            <div className="checkout_box">
              <h3>PRICE DETAILS</h3>
              <Divider />
              <div className="price_name">
                <div className="p_name_box">
                  <p>Price ({cartItem.length} items )</p>
                  <p> ${totalprice + 32}</p>
                </div>
                <div className="p_name_box">
                  <p>Discount</p>
                  <p style={{ color: "green" }}> - $20</p>
                </div>
                <div className="p_name_box">
                  <p>Buy more & save more</p>
                  <p style={{ color: "green" }}>-$10</p>
                </div>
                <div className="p_name_box">
                  <p>Secured Packaging Fee</p>
                  <p>$0</p>
                </div>
              </div>
              <Divider />
            </div>
            <div className="total_price_checkout_button">
              <div className="total_price">
                <p> Total Amount</p>
                <p>${totalprice}</p>
              </div>
              <div className="check_button">
                <PaymentForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
