class ProductoNoExiste extends Error {
    constructor(message) {
        super(message);
        this.message = message || 'Producto no existe. Sin completar';
        this.status = 404;
        this.name = 'ProductoNoExiste';
    }
}

module.exports = {
    ProductoNoExiste,
};