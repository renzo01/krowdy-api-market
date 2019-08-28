/* process argv retorna como un tipo de string */
exports.port = process.argv[2] || 8080;
exports.dbUrl = 'mongodb://127.0.0.1:27017/training';
exports.secret = 'esta-es-la-api-copy-burger';