const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

exports.isAuthenticatedUser = async(req,res,next)=>{
    try {
        const {token} = req.cookies;

    if(!token){
        res.status(403).json({
            success:false,
            message:"Please Login First"
        })
    }
    else{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        
        next();
    }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


exports.authorizeRoles = (role) => async(req,res,next)=>{
    if(role != req.user.role){
        res.status(400).json({
            success:false,
            message:"You do not have previledge to access this route"
        })
    }
    else{
        next();
    }
}