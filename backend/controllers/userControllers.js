const User=require("../models/userModel");
const generateToken=require("../config/generateToken");
let multer=require("multer");
let upload=multer({dest:"./uploads/profile_pic"});

const registerUser=async(req,res)=>{

const {name,email,pass,pic}=req.body;
console.log(req.body);

const userExists= await User.findOne({email});

if(userExists)
{  
     res.status(400);
    // throw new Error("User already exists");
}

const user=await User.create({
    name,email,pass,pic,
})

if(user)
{   
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        pic:user.pic,
        token:generateToken(user._id)
    })
}
else{
    res.status(400);
    // throw new Error("Failed to create Account ");
}
}

const authUser=async (req,res)=>{

    const {email,pass}=req.body;

    const user=await User.findOne({email});

    if(user &&( user.pass==pass))
    {
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id)
        })
    }
    else{
        
        res.status(401).json("invalid");
      
        // throw new Error("Invalid email or password");
    }
    
}

const upload_profile=(req,res)=>{    //// image
    console.log("here in upload")
    res.send(req.file);
  }

  const allUsers=async (req,res)=>{
console.log("inside search all users")
console.log(req.user);
const keyword = req.query.search
? {
    $or: [
      { name: { $regex: req.query.search, $options: "i" } },
      { email: { $regex: req.query.search, $options: "i" } },
    ],
  }
: {};

const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
res.send(users);
      
  }

module.exports={registerUser,authUser,upload_profile,allUsers};