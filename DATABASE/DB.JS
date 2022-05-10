
const mongoose = require('mongoose')

require('dotenv').config()


const user = process.env.DB_USER
const pass = process.env.DB_PASS


const connectMongo = mongoose.connect(`mongodb+srv://${user}:${pass}@cluster0.4gkrm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)


module.exports = connectMongo;