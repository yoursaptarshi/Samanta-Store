const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        minLength:[1,"Name must have 1 character at least"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"please enter your password"]
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type: String,
        default:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken:Number,
    resetPasswordExpire:Date
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
        //if user does not change something in the password field then do next() else hash the password
    }
    else{
        this.password = await bcrypt.hash(this.password,10);
    }
})

//generate token
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:'15d'})
}

//compare password
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

//generating password reset token
userSchema.methods.getResetPasswordToken = function(){
    const resetToken = Math.floor(Math.random()*100000);

    this.resetPasswordToken = resetToken;
    this.resetPasswordExpire = Date.now() +15*60*1000;

    return resetToken;
}


module.exports = mongoose.model("User",userSchema)