import React from 'react';
import './empty_cart.scss';
import animationData from '../../../public/Animation_empty_cart.json';
import Lottie from 'lottie-react';
const Empty_cart = () => {
  return (
    <div className='empty_cart_container'>
        <div className="container_box">
            <div className="animation">
            <Lottie animationData={animationData} loop={true} autoplay />
            </div>
            <div className="message">
                <h2>FILL YOUR CART</h2>
            </div>
        </div>
    </div>
  )
}

export default Empty_cart