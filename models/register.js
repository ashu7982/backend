

const mongoose = require('mongoose')

const registerSchema= mongoose.Schema({
    email:{type:"string", required:true},
    password:{type:"string", required:true}
})

const UserModel=mongoose.model('user',registerSchema);

module.exports={
    UserModel
}