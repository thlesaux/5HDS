const userService = require('../../services/user')

let controllers = {
    addUser: function (req, res) {
        userService.add(req, res, function (err) {
            if (err) {
                res.send(err)
            }
        })
    },
    updateUser: function (req, res) {
        userService.update(req, res, function (err) {
            if (err) {
                res.send(err)
            }
        })
    },
    deleteUser: function (req, res) {
        userService.delete(req, res, function (err) {
            if (err) {
                res.send(err)
            }
        })
    },
    listUser: function (req, res) {
        userService.list(req, res, function (err) {
            if (err) {
                res.send(err)
            }
        })
    },
}

module.exports = controllers