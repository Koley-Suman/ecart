import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

import SHOP_DATA from "../../shop";
import product from "../../product";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { db, onAuthStateChanged_Listener } from "../auth/auth";

//----add middlewire add cart----

export const additemtoCart = createAsyncThunk(
  "carts/additemtoCart",
  async (carts) => {
    onAuthStateChanged_Listener(async (user) => {
      if (user) {
        const docRef = doc(db, "userCarts", user.uid);
        const colRef = collection(docRef, "carts");
        const querysanap = await getDocs(query(colRef));
        const cartData = querysanap.docs.map((e) => e.data());
        const isfindCart = cartData.find((cart) => cart.id === carts.id);
        console.log(isfindCart);
        if (!isfindCart) {
          await addDoc(colRef, { ...carts, quantity: 1 });
        }
      }
    });
    const cartsRef = carts;
    return cartsRef;
  }
);

//-----add middlewire for fetch cart data----
export const fetchCarts = createAsyncThunk("carts/fetchcart", async (user) => {
  const querysnapshot = await getDocs(
    collection(db, "userCarts", user.uid, "carts")
  );
  console.log(querysnapshot.docs.map((e) => e.data()));
  const carts = querysnapshot.docs.map((e) => e.data());
  return carts;
});

export const increaseCart = createAsyncThunk(
  "cart/increaseCart",
  async (carts) => {
    onAuthStateChanged_Listener(async (user) => {
      if (user) {
        const querysnapshot = await getDocs(
          collection(db, "userCarts", user.uid, "carts")
        );
        for (let cartData of querysnapshot.docs) {
          const iscarts = cartData.data().id === carts.id;
          if (iscarts) {
            await updateDoc(
              doc(db, "userCarts", user.uid, "carts", cartData.id),
              { quantity: cartData.data().quantity + 1 }
            );
          }
        }
      }
    });
    const cartsRef = carts;
    return cartsRef;
  }
);

export const reduceCart = createAsyncThunk("cart/reduceCart", async (carts) => {
  onAuthStateChanged_Listener(async (user) => {
    if (user) {
      const querysnapshot = await getDocs(
        collection(db, "userCarts", user.uid, "carts")
      );
      for (let cartData of querysnapshot.docs) {
        const iscarts = cartData.data().id === carts.id;
        if (iscarts && cartData.data().quantity > 1) {
          await updateDoc(
            doc(db, "userCarts", user.uid, "carts", cartData.id),
            { quantity: cartData.data().quantity - 1 }
          );
        }
      }
    }
  });
  const cartsRef = carts;
  return cartsRef;
});

export const removeCart = createAsyncThunk("cart/removeCart", async (carts) => {
  onAuthStateChanged_Listener(async (user) => {
    if (user) {
      const querysnapshot = await getDocs(
        collection(db, "userCarts", user.uid, "carts")
      );
      for (let cartData of querysnapshot.docs) {
        const iscarts = cartData.data().id === carts.id;
        if (iscarts) {
          await deleteDoc(doc(db, "userCarts", user.uid, "carts", cartData.id));
        }
      }
    }
  });
  const cartsRef = carts;
  return cartsRef;
});

export const clearCart = createAsyncThunk('cart/clearCart', async () => {
  onAuthStateChanged_Listener(async (user) => {
    try {
      if (user) {
        const querysnapshot = await getDocs(
          collection(db, "userCarts", user.uid, "carts")
        );
        for (let cartData of querysnapshot.docs) {
          await deleteDoc(doc(db, "userCarts", user.uid, "carts", cartData.id));
        }
      }
    }
    catch (error) {
      console.log(error.message);
      return error.message
    }

  })
})

export const addOrder = createAsyncThunk('order/addOrder', async () => {
  onAuthStateChanged_Listener(async (user) => {
    try {
      if (user) {
        const querysnapshot = await getDocs(
          collection(db, "userCarts", user.uid, "carts")
        );
        for (let cartdata of querysnapshot.docs) {
          console.log("add order", cartdata.id);
          const colleRef = doc(db, `userOrder/${user.uid}/orders`, cartdata.id);
          await setDoc(colleRef, cartdata.data());

        }
      }
    }
    catch (error) {
      console.log(error.message);
      return error.message
    }
  })
})
export const fetchOrder = createAsyncThunk('order/fetchOrder', async (user) => {

  const querysnapshot = await getDocs(
    collection(db, "userOrder", user.uid, "orders")
  );
  console.log(querysnapshot.docs.map((e) => e.data()));
  const orders = querysnapshot.docs.map((e) => e.data());
  return orders;

})
const initialState = {
  products: product,
  carts: [],
  order: []
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state,action){
      state.carts=action.payload
    },
    setOrder(state,action){
      state.order=action.payload
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(additemtoCart.fulfilled, (state, action) => {
        const isfind = state.carts.find(
          (cart) => cart.id === action.payload.id
        );
        if (isfind) {
          return;
        } else {
          state.carts = [...state.carts, { ...action.payload, quantity: 1 }];
        }
      })
      .addCase(fetchCarts.fulfilled, (state, action) => {
        state.carts = action.payload;
      })
      .addCase(increaseCart.fulfilled, (state, action) => {
        const isfind = state.carts.find(
          (cart) => cart.id === action.payload.id
        );
        if (isfind) {
          state.carts = state.carts.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
      })
      .addCase(reduceCart.fulfilled, (state, action) => {
        const isfind = state.carts.find(
          (cart) => cart.id === action.payload.id
        );
        if (isfind && isfind.quantity > 1) {
          state.carts = state.carts.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        }
      })
      .addCase(removeCart.fulfilled, (state, action) => {
        state.carts = state.carts.filter(
          (cart) => cart.id != action.payload.id
        );
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.carts = [];
      })
      .addCase(addOrder.fulfilled, () => {

      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrder.pending,(state,action)=>{
        state.orderLoading = true;
      })


  },
});

export const {setCart,setOrder} = cartSlice.actions;
export default cartSlice.reducer;
