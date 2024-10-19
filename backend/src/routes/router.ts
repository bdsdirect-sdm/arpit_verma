import { Router } from "express";
import {
  createuser,
  getallagencies,
  loginUser,
  getJobSeekers,
  getAgencyDetails,
 updateUserStatus
} from "../controller/usercontroller";
import { upload } from "../middleware/multer";
import { JWT } from "../middleware/token";
import { validateUser } from "../middleware/Validate";
const userRoutes = Router();

userRoutes.post(
  "/",
  upload.fields([{ name: "photopath" }, { name: "cvpath" }]),
  // validateUser,
  createuser
);

userRoutes.get("/allagencies", getallagencies);
userRoutes.post("/login", loginUser);
userRoutes.get("/jobseekers", JWT, getJobSeekers);
userRoutes.put("/users/:id", updateUserStatus)
userRoutes.get("/agencydetails", JWT, getAgencyDetails);

export default userRoutes;
