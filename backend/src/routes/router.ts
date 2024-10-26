import { Router } from "express";
import { createUser, login } from "../controllers/userController";
import { upload } from "../middlewares/multer";
import { addProduct, getProduct, productListing } from "../controllers/productController ";
import { JWT } from "../middlewares/token";
// import {} from  "../middlewares/"

const userRoutes =  Router();


userRoutes.post("/", upload.fields([{ name: "companyLogo" }, { name: "ProfileImage" }]),createUser);
userRoutes.post("/login", login);




userRoutes.post("/products", upload.fields([{name: "image", maxCount: 1}]), addProduct); // Add product route
userRoutes.get("/products/:id", getProduct); // Get a product by ID
userRoutes.post("/products/list", productListing); // List products for a user

export default userRoutes;




