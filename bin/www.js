const http = require('http')
const serverHandle = require('../app')

const PORT = 3001

const app = http.createServer(serverHandle)

app.listen(PORT)
