import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import Stripe from "stripe";
import { prisma } from "../../../server/db/client";
import { env } from "../../../server/env";
import NextCors from "nextjs-cors";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

const whSecret = env.STRIPE_WEBHOOK_SECRET;

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    methods: ["POST", "HEAD"],
    origin: "*",
  });

  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"]!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig, whSecret);

      if (event.type === "charge.succeeded") {
        const charge = event.data.object as Stripe.Charge;

        // Handle successful charge by creating or updating user in db
        await prisma.user.upsert({
          where: {
            email: charge.billing_details.email!,
          },
          create: {
            email: charge.billing_details.email,
            name: charge.billing_details.name,
            stripeCID: charge.customer as string,
          },
          update: {
            email: charge.billing_details.email,
            name: charge.billing_details.name,
          },
        });

        const protocol = req.headers["x-forwarded-proto"] || "http";
        const baseUrl = req ? `${protocol}://${req.headers.host}` : "";

        const csrfTokenResponse = await fetch(`${baseUrl}/api/auth/csrf`);
        const { csrfToken } = await csrfTokenResponse.json();

        // console.log("BODY:", charge.billing_details.email, csrfToken);

        await fetch(`${baseUrl}/api/auth/signin/email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: charge.billing_details.email,
            csrfToken: csrfToken,
          }),
        });

        res.status(200).send(`✅ Success!`);
      } else {
        console.warn(`Unhandled event type: ${event.type}`);

        res.status(500).send(`⚠️ Unhandled event type: ${event.type}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";

      // On error, log and return the error message.
      if (err! instanceof Error) console.log(err);

      console.log(`❌ Error message: ${errorMessage}`);

      res.status(400).send(`Webhook Error: ${errorMessage}`);

      return;
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default handler;
