const express = require("express")
const multer = require("multer")
const path = require("path")
const router = express.Router()
const bookDb = require("../model/book")
 

const storage = multer.diskStorage({
    destination: (req, res, cb)=>{
        cb(null, "uploads")
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now().toString() + path.extname(file.originalname))
    }
})

const uploads = multer({
    storage,
    limits: {fieldSize: 3*1024*1024},
    fileFilter: (req, file, cb)=>{
        const extname = path.extname(file.originalname)
        if(extname!==".jpg" && extname!==".jpeg" && extname!==".png") {
            const err = new Error("error")
            err.code=404
            return cb(err)
        }
        cb(null, true)
    } ,
    preservePath: true
}).single("img")

router.get("/add", (req, res)=>{
    res.render("add")
})

router.post("/add", uploads,(req, res)=>{
    const {name, aftor, year, cost, discount, date, comment, img}= req.body

    const db = new bookDb({
        name: name,
        aftor: aftor,
        year: year,
        cost: cost,
        discount: discount,
        date: date,
        comment: comment,
        img: req.file.path
    })

    db.save()
    res.redirect("/add")

})


module.exports = router