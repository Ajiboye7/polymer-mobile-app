import express from "express";
import {accountType} from '../controller/AccountTypeController'
import requiredAuth from "../middleware/requiredAuth";

const router = express.Router()

router.put('/add-account-type', requiredAuth, accountType)

export default router