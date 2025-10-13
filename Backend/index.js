const express=require('express')
const dotenv=require('dotenv')
const cors=require('cors')
const connectDB=require("./config/db")
const taskRoutes=require('./routes/taskRoutes')

dotenv.config()
connectDB()

const app=express();
app.use(cors())
app.use(express.json())

app.use("/api/tasks",taskRoutes)

app.get("/",(req,res)=>
{
    res.send("To_Do_List API is working");
})

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>
{
    console.log(`Server running on http://localhost:${PORT}`)
})