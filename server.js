// Loads dot env contents into process.env by default
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const router=require('./routes/router')

const server = express()

require('./db/connection')


const PORT = 8000 || process.env.PORT

// Use cors & express.json
server.use(cors())
server.use(express.json())


// User routes in server
server.use(router)


server.get('/', (req, res) => {
    res.write("<h1>Ecommerce server started running at Port 8000</h1>")
})

server.listen(PORT, () => {
    console.log(`server started running at port ${PORT}`);
})