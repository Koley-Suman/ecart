import React from 'react'
import Lottie from "lottie-react";
import animationData from "../../../public/Animation_cancel.json";
import "./payment_cancel.scss";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';

const Payment_cancel = () => {
  const navigate = useNavigate();

  const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#f44336",
    color: "#ffffff",
  }));
  return (
    <>
      <div className="payment_cancel">
        <div className="animation_container">
          <div className="animation">
            <Lottie animationData={animationData} loop={false} autoplay />
          </div>
        </div>
        <div className="order_message">
          <p>CANCEL PAYMENT !</p>
        </div>
        <div className="button_container">
          <div className="button" onClick={()=>navigate('/')}>
            <CustomButton variant="contained" className="mui_button">
              go  to homepage
            </CustomButton>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default Payment_cancel