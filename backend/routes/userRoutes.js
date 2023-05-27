const express =require("express");
let {registerUser,authUser,upload_profile,allUsers}=require("../controllers/userControllers");
let multer=require("multer");
let upload=multer({dest:"./uploads/profile_pic"});
const protect=require("../middleware/auth")

const router=express.Router();

 router.route("/register").post(registerUser)
 router.post("/upload_pic",upload.single("profile_pic"),upload_profile)

 router.route("/login").get().post(authUser);

 router.route("/user").get(protect,allUsers);

module.exports=router;