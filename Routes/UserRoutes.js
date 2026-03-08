import  {Router} from "express";
import { pool } from "../index.js";
export const getUserRoute  = Router()

getUserRoute.get("/all-users", async(req,res)=>{
    try{
        const {rows} = await pool.query(`SELECT * FROM users`)
        res.status(200).json({data:rows})
    }catch(error)
    {
        console.log(error)
        throw error
    }
})