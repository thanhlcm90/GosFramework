
module.exports = [{
    route: '/api/v1/book',
    method: 'post',
    controller: require('../controllers/books/create'),
    auth: true
}, {
    route: '/api/v1/book',
    method: 'get',
    controller: require('../controllers/books/get'),
    auth: true
}]
