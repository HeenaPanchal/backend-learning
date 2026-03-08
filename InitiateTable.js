import { createOTPTable } from "./createOTPTable.js"
import { userTable } from "./createUserTable.js"
import { pool } from "./index.js"

export const InitiateTables = async () =>{
    try{
       await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)
      await userTable()
      await createOTPTable()
    }catch(error){
        console.log(error)
        throw error
    }
}

