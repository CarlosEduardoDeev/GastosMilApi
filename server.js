const express = require('express')
const app = express()

app.use(express.json())






app.get('/', (req,res) =>{
    res.status(200).json({msg:"connect"})
})



require('./Routes/UserCreate/UserCreate')(app)


const connectMongo = require('./DATABASE/DB.js')

connectMongo
.then(() =>{
    app.listen('3000')
    console.log('connect')
})

