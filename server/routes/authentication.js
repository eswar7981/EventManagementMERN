const express=require('express')
const router=express.Router()
const controller=require('../controllers/authentication')

router.post('/register',controller.registerNewUser)

router.post('/sign-in',controller.signIn)

router.post('/log-out',controller.logOut)


module.exports=router