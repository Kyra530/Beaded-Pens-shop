import fs from "fs";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET);

export const createOrder = async (req, res) => {
  const { cart } = req.body;

  const db = JSON.parse(fs.readFileSync("backend/database.json"));
  const products = db.products;

  const lineItems = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    return {
      price_data: {
        currency: "usd",
        product_data: { name: product.name },
        unit_amount: product.price * 100
      },
      quantity: item.qty
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:5500/frontend/checkout.html?success=true",
    cancel_url: "http://localhost:5500/frontend/checkout.html?canceled=true"
  });

  res.json({ url: session.url });
};
