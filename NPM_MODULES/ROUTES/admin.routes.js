import  express  from "express";
import {signUp,signIn} from '../CONTROLLER/admin.controller.js'
const router = express.Router();
router.post("/signUp",signUp);
router.get("/signIn",signIn)
export default router;
