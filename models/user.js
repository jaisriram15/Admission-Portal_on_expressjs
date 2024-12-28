const mongoose=require ('mongoose')

//field or schema

const UserSchema=new mongoose.Schema({
name:{
    type:String,
    Required: true
},

email:{
    type:String,
    Required: true
},

password:{
    type:String,
    Required: true
},

role:{
    type:String,
    default:'user'
},
image:{
	public_id:{
	type:String,
	Required:true,
	},
	
	url:{
	type:String,
	Required:true,
	},
}

},{timestamps:true})

// model or collection

const UserModel = mongoose.model('users',UserSchema)
module.exports=UserModel