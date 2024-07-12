import "./payment.component.scss";
import { StripePromise } from "../../utils/stripe";

const PaymentForm = () => {
  const paymentHandler = async () => {
    try {
      await fetch(
        "/.netlify/functions/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: 2 }),
        }
      )
        .then((res) => {
          if (res.ok) return res.json();
          return res.json().then((json) => Promise.reject(json));
        })
        .then(({ url }) => {
          window.location = url;
        });
    } catch (error) {
      console.error("error:", error);
      alert("error: " + error.message);
    }
    
  };
  return (
    <div>
      <div className="button" onClick={paymentHandler}>
        <p>Place Order</p>
      </div>
    </div>
  );
};
export default PaymentForm;
