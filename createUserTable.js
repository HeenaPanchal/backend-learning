import { pool } from "./index.js";

const userTable = async () =>{
    try{
        await pool.query(`CREATE TABLE IF NOT EXISTS users (
            uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_name TEXT NOT NULL,
            phone_number TEXT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );`)
    console.log("User Table created successfuly");
    }catch(error){
     console.log(error)  
     throw error 
    }
}

export {userTable}