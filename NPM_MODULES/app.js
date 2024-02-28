import bodyParser from 'body-parser';
import express from 'express';
import AdminRouter from './ROUTES/admin.routes.js';
import UserRouter from './ROUTES/user.routes.js';
import roomTypeRouter from './ROUTES/designRoutes.js';
import ProfessionalRouter from './ROUTES/professional.routes.js';
import ProductRouter from './ROUTES/product.routes.js'
import CartRouter from './ROUTES/cart.routes.js';
import OrderRouter from './ROUTES/order.routes.js'

import path from "path";
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname (__filename);


app.use( bodyParser.urlencoded ({extended:true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname ,"public"))); // Professional profile
app.use(express.static(path.join(__dirname , "public1"))); // video (design)
app.use(express.static(path.join(__dirname , "images_url"))); // image_URL design
app.use(express.static(path.join(__dirname , "ProductIMG"))); //Product image

app.use("/admin",AdminRouter);
app.use("/user",UserRouter);
app.use("/Design",roomTypeRouter);
app.use("/professional",ProfessionalRouter);
// app.use("/subscription",subscription);
app.use("/product",ProductRouter)
app.use("/cart",CartRouter);
app.use("/Order",OrderRouter);


app.listen(3000,()=>{
    console.log("server started")
})
