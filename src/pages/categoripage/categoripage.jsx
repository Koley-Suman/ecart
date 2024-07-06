import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./categori.scss";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { IconButton } from "@mui/material";

const Categoripage = () => {
  const params = useParams();
  const products = useSelector((state) => state.carts.products);
  const navigate = useNavigate();
  console.log(params);
  console.log(products);

  return (
    <div className="product_container">
      {products.map((e) => {
        if (e.title == params.categori) {
          console.log(e);
          return e.items.map((items, i) => {
            return (
              <div
                key={i}
                className="productCard"
                onClick={() => navigate(`${items.id}`)}
              >
                <div
                  className="image"
                  style={{ backgroundImage: `url(${items.imageUrl})` }}
                ></div>
                <div className="description">
                  <div className="p_name">
                    <h4>{items.name.toUpperCase()}</h4>
                  </div>
                  <div className="price">
                    <p style={{ fontWeight: "bold" }}>${items.price}</p>
                    <p
                      style={{
                        textDecorationLine: "line-through",
                        color: "gray",
                      }}
                    >
                      $3499
                    </p>
                    <p style={{ color: "green" }}>30% off</p>
                  </div>
                  <div className="rating">
                    <div className="icon_box">
                      <p>4.5</p>
                      <StarHalfIcon />
                    </div>
                    <p style={{ marginLeft: "4px" }}>(297)</p>
                  </div>
                </div>
              </div>
            );
          });
        }
      })}
    </div>
  );
};

export default Categoripage;
