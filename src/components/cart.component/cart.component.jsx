import React from 'react'
import Cart from '../../pages/cart/cart'
import { useSelector } from 'react-redux'

function Cartcomponent() {
    const cartItem = useSelector((state)=>state.carts.carts);
    console.log(cartItem.length);
    const iscart = cartItem.length==0?<h1>hello cart</h1>:<Cart/>
  return (
    <div>
        {iscart}
    </div>
  )
}

export default Cartcomponent
