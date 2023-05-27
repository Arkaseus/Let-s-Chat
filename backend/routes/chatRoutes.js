const express=require("express");
const protect=require("../middleware/auth")

const router=express.Router();
const {accessChat,fetchChat}=require("../controllers/chatController")

router.post("/chat",protect,accessChat);
router.get("/chat",protect,fetchChat);
module.exports=router;