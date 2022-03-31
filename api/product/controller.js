const productService = require('../../services/stock')

let controllers = {
    addProduct: function (req, res) {
        productService.add(req, res, function (err) {
            if (err) {
                res.send(err)
            }
        })
    },
    updateProduct: function (req, res) {
        productService.update(req, res, function (err) {
            if (err) {
                res.send(err)
            }
        })
    },
    deleteProduct: function (req, res) {
        productService.delete(req, res, function (err) {
            if (err) {
                res.send(err)
            }
        })
    },
    listProduct: function (req, res) {
        productService.list(req, res, function (err) {
            if (err) {
                res.send(err)
            }
        })
    },
}

module.exports = controllers