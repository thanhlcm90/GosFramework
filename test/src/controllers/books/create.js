const ApiValidator = require('../../../framework').ApiValidator;
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
    return data;
}
