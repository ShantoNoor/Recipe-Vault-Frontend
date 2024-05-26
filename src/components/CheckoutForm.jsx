import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useAxiosSecure } from "@/hooks/useAxios";
import { toast } from "sonner";
import { Button } from "./ui/button";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ payRef, update, setOpen }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user, setUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const tid = toast.loading("Paying ...");

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (result.error) {
      console.log(result.error.message);
      toast.dismiss(tid);
      toast.error(result.error.message);
    } else {
      toast.dismiss(tid);
      toast.success(
        "Payment Successful. Your transactionId: " + result.paymentIntent.id
      );

      const id = toast.loading("Updating, wait ....");
      try {
        const reqBody = {
          payment_amount: update?.price,
          tnxid: result.paymentIntent.id,
          email: user.email,
        };

        const purchase_result = await axiosSecure.post(
          "/purchase-update",
          reqBody
        );
        setUser(purchase_result.data);

        toast.dismiss(id);
        toast.success("Update Successful");

        navigate("/recipes"); // TODO: take state when navigate
      } catch (err) {
        console.error(err);
        toast.dismiss(id);
        toast.error("Unable to update");
      }

      setOpen(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} ref={payRef}>
      <PaymentElement />
      <Button type="submit" className="mt-5 ml-auto block">
        Pay
      </Button>
    </form>
  );
};

export default CheckoutForm;
