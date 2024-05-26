import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CheckoutForm from "@/components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_apiKey_stripe);
import { Elements } from "@stripe/react-stripe-js";
import { useRef } from "react";
import Spinner from "./Spinner";

const PaymentDialog = ({ open, setOpen, update, gettingIntent, clientSecret }) => {
  const payRef = useRef(null);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
          </DialogHeader>
          {gettingIntent === false && clientSecret ? (
            <Elements
              stripe={stripePromise}
              options={{ clientSecret: clientSecret }}
            >
              <CheckoutForm payRef={payRef} update={update} setOpen={setOpen} />
            </Elements>
          ) : (
            <Spinner />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentDialog;
