import Stripe from "stripe";
type Amount = { amount: number };

const stripeSecretKey = process.env.NEXT_SECRET_STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("Stripe secret key is not provided.");
}
const stripe = new Stripe(stripeSecretKey);
export async function POST(req: Request) {
  try {
    const { amount } = (await req.json()) as Amount;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Your order price:",
            },

            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/cancel`,
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("Error processing payment:", error);
    return Response.json({ error: "Error processing payment" });
  }
}
