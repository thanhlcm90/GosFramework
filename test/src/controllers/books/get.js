const Book = require('../../models').Book;

module.exports = async (params, db, config) => {
    let data = await Book.findAll();
    return data;
}
