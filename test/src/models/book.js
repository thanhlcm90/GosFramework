const Sequelize = require('sequelize');

const BookSchema = {
    code: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    }
}

module.exports = function(db) {
    db.define('book', BookSchema);
}
