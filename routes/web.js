const express = require('express')
const FrontController = require('../controllers/FrontController')
const route = express.Router()
const checkUserAuth= require ('../middleware/auth')
const CourseController = require('../controllers/CourseController')
const AdminController = require('../controllers/AdminController')

//Routing setting from below code
route.get('/', FrontController.login)
route.get('/dashboard', checkUserAuth,FrontController.dashboard)
route.get('/register',FrontController.register)
route.get('/contact',checkUserAuth,FrontController.contact)
route.get('/about',checkUserAuth,FrontController.about)
route.get('/profile',checkUserAuth,FrontController.profile)

route.post('/insertreg' , FrontController.insertReg)
route.post('/verifylogin',FrontController.verifyLogin)
route.get('/logout',FrontController.logOut)
route.post('/updateProfile',checkUserAuth,FrontController.updateProfile)
route.post('/changePassword',checkUserAuth,FrontController.changePassword)

// Course Controller route
route.post ('/btechFormInsert',checkUserAuth,CourseController.btechFormInsert)
route.get ('/courseDisplay',checkUserAuth,CourseController.courseDisplay)
route.get('/courseView/:id',checkUserAuth,CourseController.courseView)
route.get('/courseEdit/:id',checkUserAuth,CourseController.courseEdit)
route.get('/courseDelete/:id',checkUserAuth,CourseController.courseDelete)
route.post('/courseUpdate/:id',checkUserAuth,CourseController.courseUpdate)

route.post('/bcaFormInsert',checkUserAuth,CourseController.bcaFormInsert)
route.post('/mcaFormInsert',checkUserAuth,CourseController.mcaFormInsert)

//Admin controller
route.get('/admin/dashboard', checkUserAuth, AdminController.getUserDisplay)
route.post('/update_status/:id',checkUserAuth,AdminController.updateStatus)
route.get ('/adminView/:id',checkUserAuth,AdminController.adminView)
route.get ('/adminEdit/:id',checkUserAuth,AdminController.adminEdit)

  module.exports=route