const mongoose = require('mongoose')

const swordSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: String,
    doubleEdged: { type: Boolean, default: false }
})

const Sword = mongoose.model('Sword2', swordSchema);
module.exports = Sword;
