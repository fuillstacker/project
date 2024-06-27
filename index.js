require("dotenv").config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 9990
const cors = require('cors')
const models = require('./models/models')
const FileUpload = require('express-fileupload')
const sequelize = require('./db')
const Router = require('./routers/index')

app.use(cors())
app.use(express.json())
app.use(FileUpload({}))
app.use('/api', Router)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log('Connected to DB!')
        app.listen(PORT, (req, res) => {
            console.log(`server started in port ${PORT}`)
        })
    } catch(e) {
        console.log(e)
    }
 
}

start()