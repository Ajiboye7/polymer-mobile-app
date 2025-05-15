import express from "express"
import { createPin, confirmPin } from "../controller/PinController"
import requiredAuth from "../middleware/requiredAuth";

const router = express.Router()


router.put('/create-pin', requiredAuth, createPin);
router.post('/confirm-pin', requiredAuth,  confirmPin);


export default router