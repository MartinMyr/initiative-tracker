const mongoose = require("mongoose");

const initiativeSchema = new mongoose.Schema({
    name: String,
    initiative: Number,
    shield: Number,
    retaliate: Number,
})

module.exports = mongoose.model("Initiative", initiativeSchema);