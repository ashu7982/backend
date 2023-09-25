
const employeeSchema= mongoose.Schema({
    firstN:{type:"string", required:true},
    lastN:{type:"string", required:true},
    email:{type:"string", required:true},
    department:{type:"string", required:true},
    salary:{type:Number, required:true}
})

const UserModel=mongoose.model('Employee',employeeSchema);

module.exports={
    UserModel
}