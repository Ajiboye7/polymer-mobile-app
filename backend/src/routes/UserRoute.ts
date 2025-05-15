import { signInUser,  signUpUser} from "../controller/UserController"
import express from "express"

const router = express.Router()

router.post('/sign-up', signUpUser);

router.post('/sign-in', signInUser);



export default router