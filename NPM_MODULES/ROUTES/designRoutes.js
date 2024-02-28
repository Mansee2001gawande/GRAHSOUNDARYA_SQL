import  express  from "express";
import { roomType, design,design_images , design_feedback,favourite_design ,getDesignByRoomType ,viewalldesign ,description } from "../CONTROLLER/design.controller.js";
import multer from "multer";

const upload = multer({dest : "public1/videos"});

const store = multer ({dest :"images_url/images" });

const router = express.Router();
router.post("/roomType",roomType);
router.post("/Video", upload.single ("video_URL"),design);               
router.post ("/design_images",store.single("image_url") , design_images);
router.post("/design_feedback",design_feedback );
router.post("/addToFavorite",favourite_design);
// router.get("/")
router.get("/DesignByRoomType" , getDesignByRoomType)  
router.get("/viewalldesign",viewalldesign);  
router.get("/Description",description);
// router.get("/viewDesign",particularDesign)

export default router;