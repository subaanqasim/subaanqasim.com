import { type NextApiRequest, type NextApiResponse } from "next";
import Stripe from "stripe";
import { env } from "../../server/env";
import { prisma } from "../../server/db/client";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const { amount, currency, mode } = req.body;

      // Create Checkout Sessions from body params.

      const prevCustomer = await prisma.user.findUnique({
        where: {
          email: req.body.email,
        },
      });

      const prevCustomerStripeID = prevCustomer
        ? prevCustomer.stripeCID!
        : undefined;

      const session = await stripe.checkout.sessions.create({
        mode: mode === "once" ? "payment" : "subscription",
        success_url: `${req.headers.origin}/support?success=true&email=${req.body.email}`, // &session_id={CHECKOUT_SESSION_ID}
        cancel_url: `${req.headers.origin}/support?canceled=true`,
        customer_creation: !prevCustomerStripeID ? "always" : undefined,
        customer: prevCustomerStripeID,
        customer_email: !prevCustomer ? req.body.email : undefined,
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

      res.status(200).json({ checkoutSessionId: session.id });
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
