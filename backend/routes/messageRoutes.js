const express=require("express");
const router=express.Router();

const protect=require("../middleware/auth")
const {sendMessage,allMessage}=require("../controllers/messagecontrollers");

router.post("/message",protect,sendMessage);
router.get("/message:chatId",protect,allMessage)

module.exports=router;