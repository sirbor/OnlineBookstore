const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    availability: { type: Boolean, default: true },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
