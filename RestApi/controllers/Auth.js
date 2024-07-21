const Auth = require('../models/Auth.js')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')



const register = async (req,res) => {
try {

    const {username , email , password} = req.body

    const user = await Auth.findOne({email})

    if(user){
        return res.status(500).json({message:'This E Mail Is Already In Use!'})
    }

    if(password.length < 6){
        return res.status(500).json({message:'Your Password Cant Be Shorter Than 6 Digits!'})
    }

    const passwordHash = await bcryptjs.hash(password,12)

    const newUser = await Auth.create({username,email,password:passwordHash})

    const userToken = jwt.sign({id:newUser.id},process.env.SECRET_TOKEN,{expiresIn:'1h'})

    res.status(201).json({
        status:"OK",
        newUser,
        userToken
    })

    } catch (error) {

        return res.status(500).json({message:error.message})
    
    }
}


const login = async (req,res) => {

    try {

        const {email,password} = req.body

        const user = await Auth.findOne({email})

        if(!user){
            return res.status(5000).json({message:'User Not Found!'})
        }

        const comparePassword = await bcryptjs.compare(password,user.password)

        if(comparePassword){
            return res.status(500).json({message:'Password Is Wrong!'})
        }

        const token = jwt.sign({id:user.id},process.env.SECRET_TOKEN,{expiresIn:'1h'})

        res.status(200).json({
            status:'OK',
            user,
            token
        })

    } catch (error) {
        return res.status(500).json({message:error.message})
    }

}


module.exports = {register , login}