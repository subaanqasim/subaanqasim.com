import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { env } from "../../server/env";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        success_url: `${req.headers.origin}/support?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/support?canceled=true`,
        line_items: [
          {
            price_data: {
              unit_amount: 1000, // req.body.amount,
              currency: "gbp", //req.body.currency,
              product_data: {
                name: "Test",
              },
            },
            quantity: 1,
          },
        ],
      });
      res.redirect(303, session.url!);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
