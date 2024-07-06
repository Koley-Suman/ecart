import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { additemtoCart } from "../../store/slice";
import "./details.scss";
import StarHalfIcon from "@mui/icons-material/StarHalf";

const Details = () => {
  const params = useParams();
  const product = useSelector((state) => state.carts.products);
  const dispatch = useDispatch();

  const addcartEvent = (item) => {
    const { id, name, imageUrl, price } = item;
    const cartItem = {
      id: id,
      name: name,
      imageUrl: imageUrl,
      price: price,
    };

    dispatch(additemtoCart(cartItem));
    console.log("dispatch cart");
  };
  return (
    <div className="details_container">
      {product.map((e) => {
        if (e.title == params.categori) {
          console.log(e);
          return e.items.map((item) => {
            if (item.id == params.productId) {
              return (
                <div key={item.id} className="details_box">
                  <div className="picture">
                    <div className="image">
                      
                    </div>
                    <button onClick={() => addcartEvent(item)}>
                      Add to cart
                    </button>
                  </div>
                  <div className="details">
                    <h2>{item.name}</h2>
                    <div className="rating">
                      <div className="icon_box">
                        <p>4.5</p>
                        <StarHalfIcon />
                      </div>
                      <p style={{ marginLeft: "4px" }}>
                        192 Ratings & 29 Reviews
                      </p>
                    </div>
                    <h4 style={{color:"green",fontWeight:500}}>Best price</h4>
                    <div className="price">
                      <p>${item.price}</p>
                      <p style={{textDecorationLine:"line-through",color:"gray"}} >$3499</p>
                      <p style={{color:"green"}}>30% off</p>
                    </div>
                  </div>
                </div>
              );
            }
          });
        }
      })}
    </div>
  );
};

export default Details;
