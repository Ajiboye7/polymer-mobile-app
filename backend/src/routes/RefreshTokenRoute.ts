import { refreshToken } from "../controller/RefreshTokenController";
import express, { Router } from "express"
import requiredAuth from "../middleware/requiredAuth";

const router = express.Router()

router.get('/refresh-token', requiredAuth, refreshToken)

export default router