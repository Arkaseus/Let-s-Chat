const Chat=require("../models/chatmodel")
const User=require("../models/userModel")

const accessChat=async (req,res)=>{
console.log("inside access chat")
const { userId } = req.body;

if (!userId) {
  console.log("UserId param not sent with request");
  return res.sendStatus(400);
}

var isChat = await Chat.find({
  isGroupChat: false,
  $and: [
    { users: { $elemMatch: { $eq: req.user._id } } },
    { users: { $elemMatch: { $eq: userId } } },
  ],
})
//   .populate("users", "-pass")
//   .populate("latestMessage");

// isChat = await User.populate(isChat, {
//   path: "latestMessage.sender",
//   select: "name pic email",
// });

if (isChat.length > 0) {

  res.send(isChat[0]);
}  
    else
      {
        var chatData={
            chatName:"sender",
            isGroupChat:false,
            users: [req.user._id, userId],
        };
 
        try{
            const createdChat= await Chat.create(chatData);
             
            const fullChat=await Chat.findOne({_id: createdChat._id}).populate(

                "users","-pass"
            );
            console.log("sending new ischat :")
            res.status(200).send(fullChat);
        }
        catch(error){
            res.status(400);
            throw new Error(error.message);
        }
    }
}

const fetchChat=async (req,res)=>{

    try{
           Chat.find({users:{ $elemMatch : { $eq: req.user._id}}})
           .populate("users","-pass")
           .populate("groupAdmin","-pass")
           .populate("latestMessage")
           .sort({updatedAt: -1})
           .then( async (result)=>{
            result=await User.populate(result,{
                path:"latestMessage.sender",
                select:"name pic email",
            })

            res.status(200).send(result);
           })
    }
    catch(error)
    {
            res.status(400);
            throw new Error(error.message);
    }
}

module.exports={accessChat,fetchChat};