const express = require('express')
const app = express()

const port = 8080

app.use(express.json())

const routes = require('./api/routes')
routes(app)

app.listen(port, () => {
    console.log('Server listening on port: ' + port)
})