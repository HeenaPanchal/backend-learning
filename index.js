import express, { json } from "express"
import env from 'dotenv'
import pg from "pg"
import { InitiateTables } from "./InitiateTable.js"
import  { route } from "./Routes/RegisterRoute.js"
import { loginRoute } from "./Routes/LoginRout.js"
import { getUserRoute } from "./Routes/UserRoutes.js"
import { AuthorisedUser } from "./Middleware/AuthorisedUser.js"
const {Pool} = pg
export const app = express()

env.config()
app.use(express.json())
export const pool = new Pool({
    database : process.env.DB_NAME,
    host : process.env.HOST_NAME,
    user : process.env.USER_NAME,
    password : process.env.DB_PASSWORD,
    port : process.env.DB_PORT
})
const port = process.env.PORT
app.listen(port,()=>console.log("Server listening on port : ", port))

pool.on("connect",()=>console.log("Connected successfuly"))
pool.on("error",(error)=>console.error(error))
await InitiateTables()
app.get("/",async (req,res)=>{
await pool.query("SELECT NOW()")
res.send("hello world")
})

app.use("/auth",route)
app.use("/auth",loginRoute)
app.use("/users",AuthorisedUser,getUserRoute)
