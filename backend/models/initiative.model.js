const mongoose = require("mongoose");

const initiativeSchema = new mongoose.Schema({
    name: String,
    initiative: Number,
})

module.exports = mongoose.model("Initiative", initiativeSchema);