import React from 'react';
import Cart from '../../pages/cart/cart';
import { useSelector } from 'react-redux';
import Empty_cart from '../empty_cart/empty_cart';

function Cartcomponent() {
    const cartItem = useSelector((state)=>state.carts.carts);
    console.log(cartItem.length);
    const iscart = cartItem.length==0?<Empty_cart/>:<Cart/>
  return (
    <div>
        {iscart}
    </div>
  )
}

export default Cartcomponent
