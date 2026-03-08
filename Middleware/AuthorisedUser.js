import jw from 'jsonwebtoken'
export const AuthorisedUser = async (req,res,next) =>{
    try{
const auth = req.headers.authorization
if(!auth){
    // res.status(500).json({sataus:500,error:"Token not provided"})
    throw new Error("Please provide token")
}
const token  = auth.split(" ")[1]
if(!token){
    throw new Error("Token not found!!")
}
const matched =  jw.verify(token,process.env.JWT_SECRET)
req.user = matched
next()
    }catch(error){
        console.log(error)
        next(error)
    }
}