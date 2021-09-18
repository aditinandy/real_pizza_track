const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const menuShema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true }
})

// const Menu = mongoose.model('Menu', menuShema);

// module.exports = Menu;

module.exports = mongoose.model('Menu', menuShema);