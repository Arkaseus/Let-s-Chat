const mongoose=require("mongoose");

const connectDB=async ()=>{
    try{
      const con=await mongoose.connect(process.env.mongo_uri,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        
      })


      console.log("mongo connected "+ con.connection.host)
    }
    catch(error)
    {
        console.log(`error : ${error}`)
    }
}

module.exports=connectDB;