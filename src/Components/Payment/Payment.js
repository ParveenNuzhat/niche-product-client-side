import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import useAuth from "../../Hook/useAuth";
import CheckoutForm from "../CheckoutForm/CheckoutForm";

const Payment = () => {
  const stripePromise = loadStripe(
    "pk_test_51KGrFtDABHoOE5dnubK1lKJUhbaFWeyIA4OvOdjlGriIdb1we7UrmA8TlapEnkkMuo2o1Xa2fGOPPZlKAQhTCEQC00kSXGeS8r"
  );
  const { totalPrice } = useAuth();
  return (
    <div
      className="detail-container card-container text-center"
      style={{ minHeight: "60vh" }}
    >
      <div>
        <h3>
          Total Price <b>${totalPrice}</b>
        </h3>
      </div>

      <div className="m-5">
        {totalPrice && (
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Payment;
