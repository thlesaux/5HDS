const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const usersPathFile = 'data/users.json'

let user = {
    add: (req, res) => {
        fs.readFile(usersPathFile, 'utf-8', function (err, data) {
            if (err) {
                console.log('Error writing file', err)
                res.send(err)
                throw err
            }

            //Date format
            let dateObj = new Date()
            let date = dateObj.getUTCDate()
            let month = dateObj.getUTCMonth() + 1
            let year = dateObj.getUTCFullYear()

            let dateStr = year + '-' + month + '-' + date

            const user = {
                token: uuidv4(),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                role: req.body.role,
                created_at: dateStr,
                update_at: dateStr
            }

            let arrayOfObjects = JSON.parse(data)
            arrayOfObjects.push(user)

            fs.writeFile(usersPathFile, JSON.stringify(arrayOfObjects), (err) => {
                if (err) {
                    console.log('Error writing file', err)
                    res.send(err)
                    throw err
                }
                console.log('Successfully wrote file')
                res.send(200)
            })
        })
    },
    update: (req, res) => {
        fs.readFile(usersPathFile, 'utf-8', function (err, data) {
            if (err) {
                console.log('Error writing file', err)
                res.send(err)
                throw err
            }

            const token = req.params.token

            //Date format
            let dateObj = new Date()
            let date = dateObj.getUTCDate()
            let month = dateObj.getUTCMonth() + 1
            let year = dateObj.getUTCFullYear()

            let dateStr = year + '-' + month + '-' + date

            let arrayOfObjects = JSON.parse(data)

            const users = arrayOfObjects.map(user => {
                if (user.token === token) {
                    return {
                        token: user.token,
                        firstName: req.body.firstName ?? user.firstName,
                        lastName: req.body.lastName ?? user.lastName,
                        role: req.body.role ?? user.role,
                        created_at: user.created_at,
                        update_at: dateStr
                    }
                }

                return user
            })

            fs.writeFile(usersPathFile, JSON.stringify(users), (err) => {
                if (err) {
                    console.log('Error writing file', err)
                    res.send(err)
                    throw err
                }
                console.log('Successfully updated file')
                res.send(200)
            })
        })
    },
    delete: (req, res) => {
        fs.readFile(usersPathFile, 'utf8', function (err, data) {
            if (err) {
                console.log('Error reading file', err)
                res.send(err)
                throw err
            }

            const token = req.params.token

            let arrayOfObjects = JSON.parse(data)

            let index = -1

            arrayOfObjects.find(function (item, i) {
                if (item.token === token) {
                    index = i
                }
            })

            arrayOfObjects.splice(index, 1)

            fs.writeFile(usersPathFile, JSON.stringify(arrayOfObjects), (err) => {
                if (err) {
                    console.log('Error writing file', err)
                    res.send(err)
                    throw err
                }
                console.log('Successfully updated file')
                res.send(200)
            })
        })
    },
    list: (req, res) => {
        fs.readFile(usersPathFile, 'utf8', function (err, data) {
            if (err) {
                console.log('Error reading file', err)
                res.send(err)
                throw err
            }

            res.json(JSON.parse(data))
        })
    },
}


module.exports = user