const ApiValidator = require('../../../..').ApiValidator;
const uuidv1 = require('uuid/v1');
const jwt = require('jsonwebtoken');

const PARAMETERS = {
    '$mobile': ApiValidator.STRING,
    '$code': ApiValidator.STRING
}

module.exports = async (params, db, config) => {
    const User = db.model('User');
    let data = ApiValidator.validate({
        params: params,
        paramDesc: PARAMETERS
    })

    let user = await User.findOne({
        where: {
            username: data.mobile
        }
    });

    if (!user || !user.comparePassword(params.code)) throw 'Wrong mobile or code';

    const payload = {
        id: user.id,
        username: user.username
    };

    const token = jwt.sign(payload, config.authenticate.jwtSecret, { expiresIn: config.authenticate.jwtDuration });

    await user.update({ refresh_token: uuidv1() });

    return {
        token: token,
        refresh_token: user.refresh_token
    };
}
