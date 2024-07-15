import "./payment.component.scss";
import { StripePromise } from "../../utils/stripe";
import { useDispatch, useSelector } from "react-redux";


const PaymentForm = () => {
  const carts = useSelector((state)=>state.carts.carts)
  const dispatch = useDispatch();
  const paymentHandler = async () => {
    try {
      
      const response = await fetch(
        "/.netlify/functions/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({carts}),
        }
      )

      const data = await response.json();
      if(response.ok){
        console.log("checkout sucessful",data);
        window.location = data.url;
      }
      else{
        console.error("error creating checkout session", data.error);
      }
      
    //     .then((res) => {
    //       if (res.ok) return res.json();
    //       return res.json().then((json) => Promise.reject(json));

    //     })
    //     .then(({ url }) => {
    //       window.location = url;
    //     });
    } catch (error) {
      console.error("error:", error);
      alert("error: " + error.message);
    }
  };
  return (
    <>
      <div className="button" onClick={paymentHandler}>
        <p>Place Order</p>
      </div>
    </>
  );
};
export default PaymentForm;
