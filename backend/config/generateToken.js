const jwt=require("jsonwebtoken");

const token=(user_id)=>{
    return jwt.sign({user_id},process.env.jwt_secret,{expiresIn:"1d"})
}

module.exports=token;