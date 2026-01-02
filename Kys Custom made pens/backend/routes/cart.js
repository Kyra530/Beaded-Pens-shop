import express from "express";
import { validateCart } from "../middleware/validateCart.js";

const router = express.Router();

router.post("/validate", validateCart);

export default router;
