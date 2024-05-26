const Order = require("../models/orderModel");
const Product = require("../models/productModel");


exports.newOrder = async(req,res,next)=>{
    try {
        const {
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
          } = req.body;
          if(!shippingInfo || !orderItems || !paymentInfo || !itemsPrice || !taxPrice ||!shippingPrice || !totalPrice){
            res.status(400).json({
                success:false,
                message:"enter all details"
            })
          }
         else{ const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id,
          });

          res.status(200).json({
            success: true,
            order,
          });}
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
};

exports.getSingleOrder = async(req,res,next)=>{
    try {
        const order = await Order.findById(req.params.id).populate("user","name email");
        if(!order){
            res.status(400).json({
                sucess:false,
                message:"Order not found"
            })
        }
        else{
            res.status(200).json({
                success:true,
                order
            })
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.myOrders = async(req,res,next)=>{
    
    try {
       
       const orders = await Order.find({user:req.user._id});
        res.status(200).json({
            success:true,
           orders
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getAllOrders = async(req,res,next)=>{
    try {
        const orders = await Order.find();

        let totalAmmount =0;
        orders.forEach((i)=>{
            totalAmmount = totalAmmount + i.totalPrice
        });
        res.status(200).json({
            success:true,
            totalAmmount,
            orders
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.updateOrder = async(req,res,next)=>{
    try {
        
        const order = await Order.findById(req.params.id);
        if(!order){
            res.status(400).json({
                success:false,
                message:"no order found"
            })
        }
        else{
            
            if(order.orderStatus == 'Delivered'){
                res.status(400).json({
                    success:false,
                    message:"The order is already delivered"
                })
            }
            
            if(req.body.status == 'Shipped'){
                order.orderItems.forEach(async(i)=>{
                
                    const product = await Product.findById(i.product);
                    
                    product.Stock = product.Stock - i.quantity;
                    
                    await product.save({validateBeforeSave : false});
                    
                })
                order.orderStatus = req.body.status;
            }
            else{
                
                if(req.body.status === 'Delivered'){
                    order.deliveredAt = Date.now();
                }
                order.orderStatus = req.body.status;
                
            }
            await order.save({validateBeforeSave : false});
            res.status(200).json({
                success:true,
            })
        }
    } catch (error) {
       res.status(500).json({
        success:false,
        message:error.message
       }) 
    }
}

exports.deleteOrder = async(req,res,next)=>{
    try {
        const order = await Order.findById(req.params.id);
        if(!order){
            res.status(400).json({
                success:false,
                message:"The order is already delivered"
            })
        }
        else{
            await order.deleteOne();
            res.status(200).json({
                success:true,
                message:"Order removed successfully"
            })
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}