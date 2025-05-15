import express from "express"
import { verifyOtp } from "../controller/OtpController";

import requiredAuth from "../middleware/requiredAuth";

const router = express.Router()


//router.use(requiredAuth)

router.post('/verify-otp', verifyOtp);

export default router