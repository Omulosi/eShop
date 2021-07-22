import axios from "axios";
import toast from "react-hot-toast";
import { useShoppingCart } from "use-shopping-cart";

export default function useCheckout() {
  const { redirectToCheckout, cartDetails } = useShoppingCart();

  const handleCheckout = async () => {
    const session = await axios
      .post("/api/checkout-session", cartDetails)
      .then((res) => res.data)
      .catch((err) => {
        toast.error("Checkout failed!");
        console.log("Error handling checkout: ", err.message);
      });

    if (session) {
      redirectToCheckout({ sessionId: session.id });
    }
  };

  return handleCheckout;
}
