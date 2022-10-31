const express = require("express")
const router = express.Router()
const bookDb = require("../model/book")

router.get("/", (req, res)=>{
    bookDb.find({}, (err, data)=>{
        res.render("index", {
            title: "Index",
            data: data
        })
    })
})


router.get("/card/:id", (req, res)=>{
    bookDb.findById(req.params.id, (err, data)=>{
        res.render("cards", {
            title: "Product",
            db: data
        })
    })
})

router.get("/delete/:id", (req, res)=>{
   bookDb.findByIdAndDelete(req.params.id, (err, data)=>{
    if(err){
        console.log("Xatolik bor")
    }
    else{
        res.redirect('/')
        console.log(data)
    }
   })
})
module.exports = router