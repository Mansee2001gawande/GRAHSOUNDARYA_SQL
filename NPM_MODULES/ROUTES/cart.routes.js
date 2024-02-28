import express from 'express';
import {addTocart} from '../CONTROLLER/cart.controller.js';

const router = express.Router();
router.post("/addTocart",addTocart);
export default router ;
