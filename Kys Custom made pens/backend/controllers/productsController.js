import fs from "fs";

export const getProducts = (req, res) => {
  const db = JSON.parse(fs.readFileSync("backend/database.json"));
  res.json(db.products);
};

export const getProductById = (req, res) => {
  const db = JSON.parse(fs.readFileSync("backend/database.json"));
  const product = db.products.find(p => p.id === parseInt(req.params.id));

  if (!product) return res.status(404).json({ message: "Product not found" });

  res.json(product);
};
