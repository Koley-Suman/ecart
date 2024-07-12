import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/homepage/homepage";
import Navigation from "./components/navigation/navigation";
import Categoripage from "./pages/categoripage/categoripage";
import Cart from "./pages/cart/cart";
import Details from "./pages/details/details";
import Authentication from "./pages/authentication/authentication";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { setCurrentUser } from "./store/user-slice";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { onAuthStateChanged_Listener } from "./auth/auth";
import { fetchCarts } from "./store/slice";
import Cartcomponent from "./components/cart.component/cart.component";
import PaymentForm from "./components/payment.component/payment.component";
import Payment_success from "./pages/payment_sucess/payment_success";
import Payment_cancel from "./pages/payment_cancel/payment_cancel";
function App() {
  const catagoris = [
    {
      id: 1,
      name: "Earphones",
      imageurl: "./photos/earphone.png",
      background: "rgba(43, 43, 43, 1)",
      color: "rgba(68, 68, 68, 1)",
    },
    {
      id: 2,
      name: "Phone",
      imageurl: "./photos/phone.png",
      rout: "shop/jackets",
      background: "rgba(244, 211, 148, 1)",
      color: "rgba(193, 173, 66, 0.58)",
    },
    {
      id: 3,
      name: "Watch",
      imageurl: "./photos/smart_watch.png",
      rout: "shop/sneakers",
      size: "semiSmall",
      background: "rgba(111, 97, 227, 1)",
      color: "rgba(159, 117, 245, 1)",
    },
    {
      id: 4,
      name: "Shoes",
      imageurl: "./photos/shoes.png",
      rout: "shop/sneakers",
      size: "semilarge",
      background: "rgba(168, 39, 189, 1)",
      color: "rgba(185, 138, 202, 0.49)",
    },
    {
      id: 5,
      name: "Headset",
      imageurl: "./photos/headset.png",
      rout: "shop/sneakers",
      size: "semiSmall",
      background: "rgba(241, 115, 115, 1)",
      color: "rgba(224, 30, 30, 0.37)",
    },
    {
      id: 6,
      name: "Womens",
      size: "large",
      imageurl: "./photos/women.png",
      rout: "shop/womens",
      background: "rgba(168, 247, 232, 1)",
      color: "rgba(104, 185, 171, 1)",
    },
    {
      id: 7,
      name: "Mens",
      size: "large",
      imageurl: "./photos/intro.png",
      rout: "shop/mens",
      background: "rgba(255, 235, 184, 1)",
      color: "rgba(183, 153, 77, 0.48)",
    },
  ];

  const dispatch = useDispatch();
 

  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setCurrentUser(user));
        console.log(user);
      }
    });
    return unsubscribe;
  }, []);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged_Listener((user) => {
      if (user) {
        dispatch(fetchCarts(user));
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Homepage categori={catagoris} />} />
          <Route path="cart" element={<Cartcomponent />} />
          <Route path="checkOut" element={<PaymentForm/>}/>
          <Route path="success" element={<Payment_success/>}/>
          <Route path="cancel" element={<Payment_cancel/>}/>
          <Route path="categori/:categori/:productId" element={<Details />} />
          <Route path="categori/:categori" element={<Categoripage />} />
          <Route path="authentication/*" element={<Authentication />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
