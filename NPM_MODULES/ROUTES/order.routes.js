import express from 'express';
import {addOrderItem ,OrderListByDate} from '../CONTROLLER/order.controller.js';
const router = express.Router();
router.post("/placeOrder",addOrderItem);
router.get("/viewOrderByDate",OrderListByDate)
export default router;