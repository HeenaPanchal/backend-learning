import route from "express"
import { pool } from "../index.js"
import JW from "jsonwebtoken"
export const loginRoute = route.Router()


loginRoute.post("/login",async(req,res)=>{
    const {email , password} = req.body

    try{
        const {rowCount ,rows} = await pool.query(`SELECT uuid , email , password FROM users WHERE email=$1`,[email])
        if(rowCount === 0){
            throw new Error("User does not exist")
        }

        if(rows[0].password !== password){
            throw new Error("Incorrect password !!")
        }
        //generate token
       const token =  JW.sign({id:rows[0].uuid},process.env.JWT_SECRET,{
            expiresIn:"3d"
        })
        res.status(200).json({token})
    }catch(error){
        console.log(error)
        throw error
    }
 
})
