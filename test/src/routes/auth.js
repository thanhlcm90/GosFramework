
module.exports = [{
    route: '/api/v1/auth/level1',
    method: 'post',
    controller: require('../controllers/auth/level1')
}, {
    route: '/api/v1/auth/level2',
    method: 'post',
    controller: require('../controllers/auth/level2')
}]
