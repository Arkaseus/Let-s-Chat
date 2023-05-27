const express=require('express');
const app=express();
const dotenv=require('dotenv');
dotenv.config();
const notFound=require("./config/errorHandle")

let multer=require("multer");
let upload=multer({dest:"./uploads/profile_pic"});

const cors=require("cors")
app.use(cors({
    origin:"*"
}))

const connectDB=require("./config/db");
connectDB();

app.use(express.static("uploads"))
app.use(express.json());

// app.use(notFound);


const userRoutes=require("./routes/userRoutes");
app.use("/",userRoutes)

const chatRoutes=require("./routes/chatRoutes");
app.use("/",chatRoutes)

const MessageRoutes=require("./routes/MessageRoutes");
app.use("/",MessageRoutes)

app.get("/",(req,res)=>{
    res.send("server running at port  "+4000);
})
const server=app.listen(4000,()=>{
    console.log("server running !")
})

const io=require("socket.io")(server,{
    pingTimeout:60000,
    cors:{
        origin:"*"
    }
})


io.on("connection",async (socket) => {
    console.log("Connected to socket.io");

    socket.on("setup",async  (userData) => {
      await socket.join(userData._id);
      socket.emit("connected");
    });
  
    socket.on("join chat", async (room) => {
      await socket.join(room);
      console.log("User Joined Room: " + room);
    });

    socket.on("new message", async (newMessageRecieved) => {
      var chat = newMessageRecieved.chat;
  
      if (!chat.users) return console.log("chat.users not defined");
  
      if (chat.users[0]._id == newMessageRecieved.sender._id) return;
     
        await socket.broadcast.emit("message recieved", newMessageRecieved);
     
    });
  
    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
    });
  });
  