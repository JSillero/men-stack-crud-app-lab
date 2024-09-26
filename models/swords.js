const mongoose = require('mongoose')

const swordSchema = new mongoose.Schema({
    id: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: String,
})

const Sword = mongoose.model('Sword', swordSchema);
module.exports = Sword;
