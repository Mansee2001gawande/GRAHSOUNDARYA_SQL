import express from 'express';
import {addcategory ,addproduct,productImage,productFeedback , productByCategory , reviewOnProduct ,ViewReviewer} from '../CONTROLLER/product.controller.js';
import multer from 'multer';

const upload = multer({dest : "ProductIMG/images"});

const router = express.Router();
router.post("/addcategory",addcategory);
router.post("/addproduct",addproduct);
router.post("/ProductImage",upload.single ("imageURL"),productImage);
router.post("/productFeedback",productFeedback);
router.get("/GetProduct" , productByCategory)
router.get("/reviewOnProducts",reviewOnProduct);
router.get("/ViewReviewer",ViewReviewer)   // designer can view reviewes on product
export default router;