import express from "express";
import { updateIdentity , identityNumber} from "../controller/IdentityController"
import requiredAuth from "../middleware/requiredAuth";


const router = express.Router()

router.put('/add-identity-type', requiredAuth,  updateIdentity);
router.put('/add-identity-number',requiredAuth,  identityNumber);

export default router