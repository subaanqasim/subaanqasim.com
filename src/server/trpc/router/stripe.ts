import { t } from "../utils";
import { z } from "zod";

import Stripe from "stripe";
import { env } from "../../env";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export const stripeRouter = t.router({
  createCheckoutSession: t.procedure
    .input(
      z.object({
        amount: z.string(),
        currency: z.enum(["usd", "eur", "gbp"]),
        mode: z.enum(["once", "monthly"]),
        email: z.string().email(),
      }),
    )
    .mutation(
      async ({
        input: { amount, currency, mode, email },
        ctx: { prisma, req },
      }) => {
        const prevCustomer = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        const prevCustomerStripeID = prevCustomer
          ? prevCustomer.stripeCID!
          : undefined;

        const session = await stripe.checkout.sessions.create({
          mode: mode === "once" ? "payment" : "subscription",
          success_url: `${req.headers.origin}/support?success=true&email=${email}`, // &session_id={CHECKOUT_SESSION_ID}
          cancel_url: `${req.headers.origin}/support?canceled=true`,
          customer_creation: !prevCustomerStripeID ? "always" : undefined,
          customer: prevCustomerStripeID,
          customer_email: !prevCustomer ? email : undefined,
          line_items: [
            {
              price_data: {
                unit_amount: parseInt(amount) * 100,
                currency: currency,
                product_data: {
                  name: "Support Subaan",
                },
              },
              quantity: 1,
            },
          ],
        });

        return { checkoutSessionId: session.id };
      },
    ),
});
