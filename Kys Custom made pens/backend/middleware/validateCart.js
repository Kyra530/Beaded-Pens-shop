import fs from "fs";

export const validateCart = (req, res) => {
  const { cart } = req.body;

  const db = JSON.parse(fs.readFileSync("backend/database.json"));
  const products = db.products;

  let valid = true;
  let total = 0;

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) valid = false;
    else total += product.price * item.qty;
  });

  res.json({ valid, total });
};
