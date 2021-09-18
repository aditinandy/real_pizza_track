const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userShema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'customer' }
}, { timestamps: true });

// const Menu = mongoose.model('Menu', menuShema);

// module.exports = Menu;

module.exports = mongoose.model('User', userShema);