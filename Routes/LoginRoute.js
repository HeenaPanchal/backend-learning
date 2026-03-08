import express from "express"
import { pool } from "../index.js"
export const route = express.Router()
route.post("/register", async(req,res,next)=>{
    const {user_name,phone_number,email,password} = req.body
    try{
      const {rows} =  await pool.query(`INSERT INTO users (
            user_name,
            phone_number,
            email,
            password
        ) VALUES ($1,$2,$3,$4) RETURNING *` ,[
            user_name,
            phone_number,
            email,
            password
        ])
        if(!rows){
            throw new Error("Registration failed!!")
        }

        res.status(200).json(rows[0])
    }catch(error)
    {
        console.log(error)
    }
})