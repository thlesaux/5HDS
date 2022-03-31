const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const productsPathFile = 'data/products.json'

let stock = {
    add: (req, res) => {
        fs.readFile(productsPathFile, 'utf-8', function (err, data) {
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

            const product = {
                token: uuidv4(),
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                stock: req.body.stock,
                reference: req.body.reference,
                created_at: dateStr,
                update_at: dateStr
            }

            let arrayOfObjects = JSON.parse(data)
            arrayOfObjects.push(product)

            fs.writeFile(productsPathFile, JSON.stringify(arrayOfObjects), (err) => {
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
        fs.readFile(productsPathFile, 'utf-8', function (err, data) {
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

            const products = arrayOfObjects.map(product => {
                if (product.token === token) {
                    return {
                        token: product.token,
                        name: req.body.name ?? product.name,
                        description: req.body.description ?? product.description,
                        price: req.body.price ?? product.price,
                        stock: req.body.stock ?? product.stock,
                        reference: req.body.reference ?? product.reference,
                        created_at: product.created_at,
                        update_at: dateStr
                    }
                }

                return product
            })

            fs.writeFile(productsPathFile, JSON.stringify(products), (err) => {
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
        fs.readFile(productsPathFile, 'utf8', function (err, data) {
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

            fs.writeFile(productsPathFile, JSON.stringify(arrayOfObjects), (err) => {
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
        fs.readFile(productsPathFile, 'utf8', function (err, data) {
            if (err) {
                console.log('Error reading file', err)
                res.send(err)
                throw err
            }

            res.json(JSON.parse(data))
        })
    },
}


module.exports = stock