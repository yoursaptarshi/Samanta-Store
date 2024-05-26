const Product = require("../models/productModel")


// create product -- admin feature
exports.createProduct = async(req,res,next)=>{
    try {
        req.body.user = req.user.id;
        const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


//get all products
exports.getAllProducts = async(req,res)=>{

   try {
    const productsCount = await Product.countDocuments();
    const resultPerPage = 8;

    const keyword = req.query.keyword || "";
    const category = req.query.category || "" ;
    const price_gt = req.query.price.gt || 0;
    const price_lt = req.query.price.lt || Infinity;
    const currentPage = req.query.page || 1;
    const rating = req.query.ratings || 0;
    const skip = (currentPage -1)*resultPerPage;
    
    let allproducts = await Product.find({
        name:{$regex:`.*${keyword}.*`,$options:'i'},
        category:{$regex:`.*${category}.*`,$options:'i'},
       price:{$gte:price_gt,$lte:price_lt},
        ratings:{$gte:rating}
});

//skip(n) : inbuilt function of mongoDB, used to skip the first 'n'number of documents
//limit(n) : inbuilt function of mongoDB, used to show how many documents are to be shown 
let filteredProductsCount =allproducts.length;
 let products =  await Product.find({
    name:{$regex:`.*${keyword}.*`,$options:'i'},
    category:{$regex:`.*${category}.*`,$options:'i'},
   price:{$gte:price_gt,$lte:price_lt},
    ratings:{$gte:rating}
}).skip(skip).limit(resultPerPage);

    res.status(200).json({
        success:true,
        products,
        allproducts,
        productsCount,
    resultPerPage,
    filteredProductsCount,
    })
   } catch (error) {
    res.status(500).json({
        success:false,
        message:error.message
    })
   }
}

exports.getAdminProducts = async (req, res, next) => {
    const products = await Product.find();
  
    res.status(200).json({
      success: true,
      products,
    });
  };

//update product --admin feature
exports.updateProduct = async (req,res,next)=>{
try {
    let product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    //using findByIdAndUpdate , we dont need to add aditional logic, like we do in model.name =req.body.name, 
    //new:true, findByIdAndUpdate returns both updated and not updated documents, we can get the updated one by using new true

    //useFindAndModify:false means mongoose will use findOneAndUpdate instead of findAndModify

    //runValidators:true will check the validators in mongoose schema. price is required true, so  runValidators will ensure price is not null
    res.status(200).json({
        success:true,
        product
    })
} catch (error) {
    res.status(500).json({
        success:false,
        message:error.message
    })
}
}
//get product details (single product)
exports.getProductDetails = async(req,res,next)=>{
    try {
        const product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    res.status(200).json({
        success:true,
        product
    })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        }) 
    }
}


//delete product 

exports.deleteProduct = async(req,res,next)=>{


   try {
    const product = await Product.findById(req.params.id);

    if(!product){
        return res.status(400).json({
            success:false,
            message:"Product not found"
        })
    }
    await product.deleteOne();

    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    })
   } catch (error) {
    res.status(500).json({
        success:false,
        message:error.message
    })
   }
}

exports.createProductReview = async(req,res,next)=>{
    try {
        
        const {rating,comment,productId} = req.body;
        
        const review = {
            user:req.user._id,
            name:req.user.name,
            rating:Number(rating),
            comment
        }
        
        const product = await Product.findById(productId);
        
        const isReviewed = product.reviews.find(
            (i)=>{
              return  i.user.toString() === req.user._id.toString();
            }
        )
       
        if(isReviewed){
            isReviewed.rating=rating;
            isReviewed.comment=comment; 
            product.numOfReviews = product.reviews.length;

            let avg = 0;
             product.reviews.forEach(i => {
                avg = avg+i.rating;
            })
            product.ratings =avg/product.reviews.length;
            
            await product.save({ validateBeforeSave: false });
        res.status(200).json({
            success:true,
            message:"Review Updated"
        })
        }

        else{
            
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length;
            
            let avg = 0;
            product.reviews.forEach(i => {
                avg = avg+i.rating;
            })/product.reviews.length;

            product.ratings =avg/product.reviews.length;

            await product.save({ validateBeforeSave: false });
            
            res.status(200).json({
                success:true,
                message:"Review Added"
            })
           
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getProductReviews = async(req,res,next)=>{
    try {
        const product = await Product.findById(req.query.id);
        if(!product){
            res.status(400).json({
                success:false,
                message:"Product not found"
            })
        }
        else{
            res.status(200).json({
                success:true,
                reviews:product.reviews
            })
        }
    } catch (error) {
        res.status(500).jsoN({
            success:false,
            message:error.message
        })
    }
}

exports.deleteReview = async(req,res,next) =>{
    try {
        const product = await Product.findById(req.query.productId);

        if(!product){
            res.status(400).json({
                success:false,
                message:"Product not found"
            })
        }
        else{
            const reviews = product.reviews.filter(
                (rev) => rev._id.toString() !== req.query.id.toString()
              );
              
              product.reviews = reviews;
              let avg = 0;
            product.reviews.forEach(i => {
                avg = avg+i.rating;
            })/product.reviews.length;

            product.ratings =avg/product.reviews.length;
            product.numOfReviews = reviews.length;
            await product.save({ validateBeforeSave: false });
            res.status(200).json({
                success:true,
                message:"Deleted successfully"
            })
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}