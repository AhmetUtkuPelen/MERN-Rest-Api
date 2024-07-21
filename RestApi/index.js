const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const db = require('./config/DataBase.js')
const Auth = require('./routes/Auth.js')
const Post = require('./routes/Post.js')



dotenv.config()


const app = express()
app.use(cors())
app.use(express.json({limit:'50mb',extended:true}))
app.use(express.urlencoded({limit:'50mb',extended:true}))



app.use('/',Auth)
app.use('/',Post)



// app.get('/' , (req,res) => {
//     res.json({message:'deneme'})
// })


const PORT = process.env.PORT || 5000

db()

app.listen(PORT, () => {
    console.log(`Server Is Running On ${PORT}. Port !`)
})