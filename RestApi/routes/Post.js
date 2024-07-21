const express = require('express')
const {createPosts , getPosts , getDetail , getUpdate , deletePost , searchPost} = require('../controllers/Post.js')
const Auth = require('../middlewares/Auth.js')



const router = express.Router()



router.get('/getPosts',getPosts)
router.post('createPost',Auth,createPosts)
router.get('/getDetail/:id',getDetail)
router.patch('/getUpdate/:id',Auth,getUpdate)
router.delete('/deletePost/:id',Auth,deletePost)
router.get('/searchPost',searchPost)



module.exports = router