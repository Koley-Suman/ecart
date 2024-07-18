import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { additemtoCart, fetchCarts } from "../../store/slice";
import "./details.scss";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import { onAuthStateChanged_Listener } from "../../auth/auth";

const Details = () => {
  const product = useSelector((state) => state.carts.products);
  const carts = useSelector((state) => state.carts.carts);
  const user = useSelector((state) => state.user.currentUser);
  const params = useParams();
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(carts);
  console.log(params);

  let Initial_image;

  {
    product.map((e) => {
      if (e.title == params.categori) {
        return e.items.map((item) => {
          if (item.id == params.productId) {
            Initial_image = item.imageUrl;
            console.log(item.id);
          }
        });
      }
    });

    const [iscart, setIscart] = useState(false);

    setTimeout(() => {
      carts.map((e) => {
        if (e.id == params.productId) {
          setIscart(true);
        }
      });
    }, "1000");

    const [image, setImage] = useState(Initial_image);
    const [border, setBorder] = useState(null);

    const imageHandel = (image, index) => {
      setImage(image);
      setBorder(index);
    };
    const dispatch = useDispatch();

    const addcartEvent = (item) => {
      const { id, name, imageUrl, price } = item;
      const cartItem = {
        id: id,
        name: name,
        imageUrl: imageUrl,
        price: price,
        categori: params.categori,
      };
      if (iscart == true) {
        Navigate("/cart");
      }
      if (!user) {
        Navigate("/authentication");
      }
      if (user) {
        dispatch(additemtoCart(cartItem));
      }
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
                      <div className="image_section">
                        <div className="more_image">
                          {item.details_image.map((e, index) => {
                            return (
                              <div
                                className={`details_image_container ${
                                  border === index ? "select_image" : null
                                }`}
                                onClick={() => imageHandel(e.image, index)}
                                key={index}
                              >
                                <div
                                  className="details_image"
                                  style={{ backgroundImage: `url(${e.image})` }}
                                ></div>
                              </div>
                            );
                          })}
                        </div>
                        <div
                          className="image"
                          style={{ backgroundImage: `url(${image})` }}
                        ></div>
                      </div>

                      <div
                        className="button_container"
                        onClick={() => addcartEvent(item)}
                      >
                        {iscart == false ? (
                          <div className="button">
                            <p>
                              <ShoppingCartSharpIcon /> Add To Cart
                            </p>
                          </div>
                        ) : (
                          <div className="button">
                            <p>
                              <ShoppingCartSharpIcon /> Go To Cart
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="details">
                      <div className="name">
                        <h2>{item.name}</h2>
                      </div>
                      <div className="rating">
                        <div className="icon_box">
                          <p>4.5</p>
                          <StarHalfIcon />
                        </div>
                        <p style={{ marginLeft: "4px" }}>
                          192 Ratings & 29 Reviews
                        </p>
                      </div>
                      <h4 style={{ color: "green", fontWeight: 500 }}>
                        Best price
                      </h4>
                      <div className="price">
                        <p className="price_tag">${item.price}</p>
                        <p
                          style={{
                            textDecorationLine: "line-through",
                            color: "gray",
                          }}
                        >
                          ${item.p_price}
                        </p>
                        <p style={{ color: "green" }}>30% off</p>
                      </div>
                      <div className="description">
                        <h2>DESCRIPTION</h2>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Autem hic inventore assumenda saepe incidunt ut
                          in ipsa reiciendis omnis corrupti! Nulla corporis,
                          tenetur, est nihil nostrum magni consectetur atque
                          repellat totam adipisci amet minus velit molestiae
                          asperiores, voluptatem harum praesentium aut debitis
                          doloremque hic esse! Officiis praesentium
                          exercitationem, mollitia sed voluptatem ipsum. Quos ea
                          a laudantium inventore ullam, nobis assumenda nam
                          consequatur cum ex veniam perspiciatis dolor
                          quibusdam, ratione in mollitia eos quis eveniet autem!
                          Nobis dolore architecto accusantium quidem.
                        </p>
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
  }
};

export default Details;
