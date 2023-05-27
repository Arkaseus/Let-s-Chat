const User=require("../models/userModel");
const jwt=require("jsonwebtoken");

const protect=async (req,res,next)=>{
  
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.jwt_secret);

      req.user = await User.findById(decoded.user_id);

      next();
    } catch (error) {
      res.status(401).json("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401).json("Not authorized, no token");
  }
}
module.exports=protect;