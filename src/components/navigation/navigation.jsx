import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./navigation.scss";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { Avatar, Badge, Box, Drawer, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import DehazeIcon from "@mui/icons-material/Dehaze";

import CloseIcon from "@mui/icons-material/Close";

const Navigation = () => {
  const carts = useSelector((state) => state.carts.carts);
  console.log(carts);
  const count = carts.reduce((total, cart) => total + cart.quantity, 0);

  const [width, setwidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleWidth() {
      setwidth(window.innerWidth);
    }
    window.addEventListener("resize", handleWidth);
  });
  console.log(width);

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <IconButton>
        <CloseIcon />
      </IconButton>
      <ul className="drawer_links">
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="authentication">SIGN UP</Link>
        </li>
        <li>
          <Link to="cart">ORDER</Link>
        </li>
      </ul>
    </Box>
  );

  return (
    <>
      {width >= 810 ? (
        <nav className="nav">
          <div className="logo">
            <h2>ECART</h2>
          </div>
          <div className="search">
            <div className="searchComponent">
              <IconButton>
                <SearchIcon />
              </IconButton>
              <input
                type="text"
                className="searchInput"
                placeholder="Search for product,brand and more"
              />
            </div>
          </div>
          <ul className="links">
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="authentication">SIGN UP</Link>
            </li>
            <li>
              <Link to="cart">
                Cart
                <IconButton aria-label="Example">
                  <Badge badgeContent={count} color="secondary">
                    <LocalMallOutlinedIcon />
                  </Badge>
                </IconButton>
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className="r_nav">
          <div className="top">
            <DehazeIcon onClick={toggleDrawer(true)} />
            <Drawer open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
            <div className="logo">
              <h2>ECART</h2>
            </div>
            <Avatar src="/broken-image.jpg" style={{ width: 30, height: 30 }} />
            <Link to="cart">
              <IconButton aria-label="Example">
                <Badge badgeContent={count} color="secondary">
                  <LocalMallOutlinedIcon />
                </Badge>
              </IconButton>
            </Link>
          </div>
          <div className="bottom">
            <div className="search">
              <div className="searchComponent">
                <IconButton>
                  <SearchIcon />
                </IconButton>
                <input
                  type="text"
                  className="searchInput"
                  placeholder="Search for product,brand and more"
                />
              </div>
            </div>
          </div>
        </nav>
      )}
      <Outlet />
    </>
  );
};

export default Navigation;
