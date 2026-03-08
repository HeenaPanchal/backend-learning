import {pool} from "./index.js"

export const createOTPTable =async () =>{
    try{
 await pool.query(`CREATE TABLE IF NOT EXISTS otp (
    email TEXT PRIMARY KEY NOT NULL,
    otp INT NOT NULL,
    expiry_date TIMESTAMP
 )`)
    }catch(error){
        console.log(error)
        throw error
    }
}

