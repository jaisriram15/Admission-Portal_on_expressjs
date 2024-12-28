const jwt = require ('jsonwebtoken')
const UserModel = require('../models/user')

const checkUserAuth = async (req,res,next)=>{
    // console.log("hello middle ware");
    const {token}=req.cookies
    // console.log(token);
    if(!token){
        req.flash('error','Unauthorized Login')
        res.redirect('/')
    }
    else{
        const verifytoken =jwt.verify(token,'jaisriram@904052@#$%&*#$#*')
        // console.log(verifytoken);
        const user = await UserModel.findOne({_id : verifytoken.ID})
        // console.log(user);
        req.user = user
        
       next() 
    }
    
}

module.exports=checkUserAuth