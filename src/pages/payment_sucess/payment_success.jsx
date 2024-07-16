import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, clearCart } from "../../store/slice";
import Lottie from "lottie-react";
import animationData from "../../../public/Animation.json";
import "./payment.success.scss";
import { Button } from "@mui/material";
import { purple } from "@mui/material/colors";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Payment_success = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.carts);

  useEffect(() => {
    dispatch(addOrder());
    dispatch(clearCart());
  }, [dispatch]);

  const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#f44336",
    color: "#ffffff",
  }));

  return (
    <>
      <div className="payment_success">
        <div className="animation_container">
          <div className="animation">
            <Lottie animationData={animationData} loop={false} autoplay />
          </div>
        </div>
        <div className="order_message">
          <p>ORDER SUCCESSFUL !</p>
        </div>
        <div className="button_container">
          <div className="button" onClick={()=>navigate('/order')}>
            <CustomButton variant="contained" className="mui_button">
              show your order
            </CustomButton>
            
          </div>
          <div className="button" onClick={()=>navigate('/')}>
            <CustomButton variant="contained" className="mui_button">
              more shoppingr
            </CustomButton>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment_success;
