import express from "express";
import requiredAuth from "../middleware/requiredAuth";
import { getBalance, deductBalance } from "../controller/BalanceController";

const router = express.Router();

router.get("/get-balance", requiredAuth, getBalance);
router.post("/deduct-balance", requiredAuth, deductBalance);

export default router;
