const ApiValidator = require('../../../../index').ApiValidator;
const Book = require('../../models').Book;

const PARAMETERS = {
    '$code': ApiValidator.STRING,
    '$name': ApiValidator.STRING,
    '$price': ApiValidator.NUMBER,
    '$date': ApiValidator.DATE,
    'sold': ApiValidator.BOOLEAN,
    'year': ApiValidator.NUMBER,
    'description': ApiValidator.STRING,
    'authors': [{
        'name': ApiValidator.STRING,
        'country': ApiValidator.STRING
    }],
    tags: [ApiValidator.STRING],
    'extra': {
        'name': ApiValidator.STRING,
        'value': ApiValidator.STRING
    }
}

module.exports = async params => {
    let data = ApiValidator.validate({
        params: params,
        paramDesc: PARAMETERS,
        isParse: true
    })
    let book = await Book.create({
        code: data.code,
        name: data.name
    })
    return book;
}
