
const notFound=()=>{
const error=new Error ("Resource not found ...");
res.status(404);
next(error);
}
module.exports={notFound}