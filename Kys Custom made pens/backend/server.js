import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productsRoute from "./routes/products.js";
import cartRoute from "./routes/cart.js";
import ordersRoute from "./routes/orders.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productsRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", ordersRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
