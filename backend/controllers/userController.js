const User = require('../models/userModel');
const { sendEmail } = require('../utils/sendEmail');


exports.registerUser = async(req,res,next)=>{
    try {
        
        const {name,email,password} = req.body;

        if(!name || !email || !password){
            res.status(400).json({
                success:false,
                message:"Please enter name,email,password"
            })
        }
        else{
            
            let user = await User.findOne({email});
        if(user){
            res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }

        else{
            
            user = await User.create({
                name,email,password,
                avatar:{public_id:"public_id",url:"url"}
            })
            
            const token = user.getJWTToken();
            res.status(200).cookie("token",token,{httpOnly:true}).json({
                success:true,
                user,
                token
            })
        }
        }
    } catch (error) {
        
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.loginUser = async(req,res,next)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            res.status(400).json({
                success:false,
                message:"Please enter both email and password"
            })
        }
        else{
            const user = await User.findOne({email});
        if(!user){
            res.status(400).json({
                success:false,
                message:"User does not exist"
            })
        }
        else{
            const isPasswordMatched = await user.comparePassword(password);
            if(!isPasswordMatched){
                res.status(400).json({
                    success:false,
                    message:"Password do not match"
                })
            }
            else{
                const token = user.getJWTToken();
                res.status(200).cookie("token",token,{httpOnly:true}).json({
                    success:true,
                    user,
                    token
                })
            }
        }
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.logout = async(req,res)=>{
try {
    res.status(200).cookie("token",null,{expires:new Date(0),httpOnly:true}).json({
        success:true,
        message:"Logout successful"
    })
    
} catch (error) {
    res.status(500).json({
        success:false,
        message:error.message
    })
}
}

exports.forgotPassword = async(req,res,next) =>{
    try {
        const user = await User.findOne({email:req.body.email});

    if(!user){
        res.status(400).json({
            success:false,
            message:"User not found, please register"
        })
    }
    else{
        const resetToken = user.getResetPasswordToken();
        await user.save();

        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

        const message = `Your reset password url is\n\n ${resetPasswordUrl}\n\n if you have not requested for this mail, then please ignore it \n\n Thanks&Regards\nSamanta Store`

        try {
            
            await sendEmail({
                email:user.email,
                subject: 'Samanta Store Password Recovery',
                message
            })
            res.status(200).json({
                success:true,
                message:'Mail sent successfully'
            })
        } catch (error) {
            user.resetPasswordToken = null;
            user.resetPasswordExpire = null;
            await user.save();
            res.status(400).json({
                success:false,
                message:error.message
            })
        }
    }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.resetPassword = async(req,res,next)=>{
    try {
        const {token} = req.params;
        const user = await User.findOne({resetPasswordToken:token});
        if(!user){
            res.status(400).json({
                success:false,
                message:"No user found with the token"
            })
        }
        else{
            if(user.resetPasswordExpire > Date.now()){
                user.password = req.body.password;
                user.resetPasswordToken = null;
                user.resetPasswordExpire = null;
                await user.save();
                res.status(200).json({
                    success:true,
                    user
                })
            }
            else{
                res.status(400).json({
                    success:false,
                    message:"token expired"
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }

}

exports.getUserDetails = async(req,res,next) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success:true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.updatePassword = async(req,res,next)=>{
    try {
        const user = await User.findById(req.user.id);
        const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
        if(!isPasswordMatched){
            res.status(400).json({
                success:false,
                message:"You entered wrong old password"
            })
        }
        else{
            user.password = req.body.newPassword;
            await user.save();

            res.status(200).json({
                success:true,
                message:"Password Changed Successfully"
            })
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.updateProfile = async(req,res,next)=>{
    try {
        const newUserData = {
            name:req.body.name,
            email:req.body.email
        }
    
        //add cloudinary
    
        const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
            new:true,runValidators:true,useFindAndModify:false
        })
    
        res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getAllUsers = async(req,res,next)=>{
    try {
        const users = await User.find();
        res.status(200).json({
            success:true,
            users
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message 
        })
    }
}

exports.getSingleUser = async(req,res,next)=>{
    try {
        
        const user = await User.findById(req.params.id);
        if(!user){
            res.status(400).json({
                success:false,
                message:"User does not exist"
            })
        }
        else{
            res.status(200).json({
                success:true,
                user
            })
        }

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


exports.updateUserRole = async(req,res,next)=>{
    try {

        const newUserData = {
            name:req.body.name,
            email:req.body.email,
            role:req.body.role
        };
        await User.findByIdAndUpdate(req.params.id,newUserData,{new:true,useFindAndModify:false});

        res.status(200).json({
            success:true,
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.deleteUser = async(req,res,next)=>{
    try {
        const user = await User.findById(req.params.id);

    if(!user){
        res.status(400).json({
            success:false,
            message:"No user found"
        })
    }
    else{
        await user.deleteOne();
        res.status(200).json({
            success:true,
            message:"User removed successfully"
        })
    }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}