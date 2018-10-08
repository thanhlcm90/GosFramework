const ApiValidator = require('../../../..').ApiValidator;

const PARAMETERS = {
    '$mobile': ApiValidator.STRING
}
const defaultSMSCode = '123456';

module.exports = async (params, db) => {
    const User = db.model('User');
    let data = ApiValidator.validate({
        params: params,
        paramDesc: PARAMETERS
    })
    let user = await User
        .findOne({
            where: {
                username: data.mobile
            }
        });
    if (user) {
        user.changePassword(defaultSMSCode);
        await user.save();
    } else {
        user = User.create({ username: data.mobile, password: defaultSMSCode });
    }
}
