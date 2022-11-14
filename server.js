const express = require('express')
const cors = require('cors')

const db = require ('./db')
const router = require('./router')

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

db.on('error', console.error.bind(console, 'MongoDB connection failed...'))

app.get('/', (req, res) => {
    res.send("Main Page")
})
app.use('', router)

app.listen(port, () => console.log(`Server running on ${port}`))