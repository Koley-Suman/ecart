import Lottie from 'lottie-react';
import React from 'react';
import './empty_order.scss';
import animationData from '../../../public/Animation_no_order.json';

const Empty_order = () => {
  return (
    <div className='empty_order_container'>
        <div className="container_box">
            <div className="animation">
            <Lottie animationData={animationData} loop={true} autoplay />
            </div>
            <div className="message">
                <h2>NO ORDER YET !</h2>
            </div>
        </div>
    </div>
  )
}

export default Empty_order