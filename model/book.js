const mongoose = require("mongoose")
const schema = mongoose.Schema

const db = new schema({
    name: String,
    aftor: String,
    year: Date,
    cost: Number,
    discount: Number,
    comment: String,
    img: String,
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Book", db)