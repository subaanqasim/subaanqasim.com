import { env } from "@env/client.mjs";
import { type Stripe } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";

/**
 * This is a singleton to ensure we only instantiate Stripe once.
 */

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export default getStripe;
