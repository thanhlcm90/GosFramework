const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');
const uuidv1 = require('uuid/v1');

exports.jwtStrategy = (db, config) => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwtSecret
    };
    const User = db.model('User');
    passport.use(new Strategy(opts, function(jwt_payload, done) {
        User
            .findOne({
                where: {
                    id: jwt_payload.id
                }
            })
            .then(user => done(null, user))
            .catch(e => done(e, false));
    }));
};

exports.checkAuthenticate = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, function(err, user) {
        req.user = user;
        if (err || !user) {
            res.send(401, { message: 'ERROR_UNAUTHORIZE' });
        } else {
            return next();
        }
    })(req, res, next);
};

exports.authenticate = async (params, config) => {
    if (!params.username) throw 'Missing username';
    if (!params.password) throw 'Missing password';

    let user = await User.findOne({
        where: {
            username: params.username
        }
    });

    if (!user || !user.comparePassword(params.password)) throw 'Wrong username or password';

    const payload = {
        id: user.id,
        username: user.username
    };

    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtDuration });

    await user.update({ refresh_token: uuidv1() });

    return {
        token: token,
        refresh_token: user.refresh_token
    };
}

exports.refreshToken = async (params, config) => {
    if (!params.username) throw 'Missing username';
    if (!params.refresh_token) throw 'Missing refresh_token';

    let user = await User.findOne({
        where: {
            username: params.username,
            refresh_token: params.refresh_token
        }
    });
    if (!user) throw 'Wrong username and refresh_token';

    const payload = {
        id: user.id,
        username: user.username
    };

    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtDuration });

    await user.update({ refresh_token: uuidv1() });

    return {
        token: token,
        refresh_token: user.refresh_token
    };
}
