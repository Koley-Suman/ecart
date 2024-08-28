import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./navigation.scss";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import DehazeIcon from "@mui/icons-material/Dehaze";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import CloseIcon from "@mui/icons-material/Close";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { Logout } from "@mui/icons-material";
import { signOutUser } from "../../auth/auth";
import { setCart } from "../../store/slice";
import Footer from "../footer/footer";

const Navigation = () => {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.carts.carts);
  const user = useSelector((state) => state.user.currentUser);
  console.log(carts);
  // console.log("hello navber"+ user!=null?user.displayName:"not");

  const count = carts.reduce((total, cart) => total + cart.quantity, 0);

  const [width, setwidth] = useState(window.innerWidth);
  const [logoUser,setLogoUser]=useState('');

  useEffect(()=>{
    setTimeout(() => {
      setLogoUser(user.displayName[0].toUpperCase())
    }, 3000);
  })

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
  const signOut = (popupState) => {
    signOutUser();
    dispatch(setCart([]));
    dispatch(setOrder([]));
    popupState.close();
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
          <Link to="/cart">CART</Link>
        </li>
        <li>
          <Link to="/order">ORDER</Link>
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
              <Link to="order">ORDER</Link>
            </li>
            {user != null ? (
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <>
                    <Avatar
                      sx={{ bgcolor: deepOrange[500], width: 35, height: 35 }}
                      {...bindTrigger(popupState)}
                    >
                      {logoUser}
                    </Avatar>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem>
                        <Typography variant="h6">{user.displayName}</Typography>
                      </MenuItem>
                      <MenuItem onClick={() => signOut(popupState)}>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </PopupState>
            ) : (
              <li>
                <Link to="/authentication">SIGN IN</Link>
              </li>
            )}

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
            {user != null ? (
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <>
                    <Avatar
                      sx={{ bgcolor: deepOrange[500], width: 35, height: 35 }}
                      {...bindTrigger(popupState)}
                    >
                      A
                    </Avatar>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem>
                        <Typography variant="h6">{user.displayName}</Typography>
                      </MenuItem>
                      <MenuItem onClick={() => signOut(popupState)}>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </PopupState>
            ) : (
              <ul className="links">
                <li>
                  <Link to="/authentication">SIGN IN</Link>
                </li>
              </ul>
            )}

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
      {/* <Footer/> */}
    </>
  );
};

export default Navigation;
