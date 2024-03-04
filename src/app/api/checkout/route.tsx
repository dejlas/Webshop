import Stripe from "stripe";
import { ProductWithQuantity } from "~/components/productWithQuantity";
type Cart = {
  cart: ProductWithQuantity[];
};

const stripeSecretKey = process.env.NEXT_SECRET_STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("Stripe secret key is not provided.");
}
const stripe = new Stripe(stripeSecretKey);
export async function POST(req: Request) {
  try {
    const { cart } = (await req.json()) as Cart;
    const lineItems = cart.map((item: ProductWithQuantity) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/cancel`,
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("Error processing payment:", error);
    return Response.json({ error: "Error processing payment" });
  }
}
