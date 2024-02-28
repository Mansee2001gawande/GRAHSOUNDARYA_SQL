import express from 'express';
import { subscription ,getDesignerByCity ,reviewOnDesign} from '../CONTROLLER/professional.controller.js';
import multer from 'multer';

const upload = multer({dest :"public/images/"});


const  router = express.Router();
// router.post("/ProfileDesigner",upload.single ("profileImg_URL") ,ProfileDesigner);
router.post("/ProfileDesigner",upload.single("profileImg_URL"),subscription)
router.get("/city",getDesignerByCity)
router.get ("/reviewOnDesign",reviewOnDesign); // by professional

export default router;