const express = require("express")
const app = express()
const path = require("path")
const port =  3030 || process.env.PORT
const rIndex = require("./routers/index")
const rAdd = require("./routers/add")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

mongoose.connect("mongodb://localhost:27017/Kitoblar")
const db = mongoose.connection
db.on("open", ()=>{
    console.log("mongodb running");
})
db.on("error", (err)=>{
    console.log("mongodb is wrong");
})

app.set("view engine", "pug")
app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "uploads")))
app.use(express.static(path.join(__dirname)))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.use(rIndex)
app.use(rAdd)



app.listen(port, ()=>{
    console.log("server running");
})