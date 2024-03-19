require("dotenv").config()
const express = require('express')
const connectToDb = require('./db/db.connect')
const app = express()
const cors = require("cors")
const employeRoute = require("./routes/employe.route")

//connect to db
connectToDb()

app.use(express.json())
app.use(cors({origin : "*"}))
app.use("/api/employe" , employeRoute)

app.use("*" , (req,res)=>{
    res.status(404).json({message : "Ressouces not found" , status : 404})
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})