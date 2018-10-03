module.exports = {
    host: process.env.HTTP_PORT || 'localhost',
    port: process.env.HTTP_HOST || '8082',
    ssl: false,
    certs: {
        key: 'key.pem',
        certificate: 'certificate.pem'
    }
}
