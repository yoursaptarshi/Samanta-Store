import React, { Fragment, useEffect, useState } from 'react'
import "./ProductDetails.css"
import {Dialog,DialogActions,DialogContent,DialogTitle,Button,Rating,Alert} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import ReviewCard from './ReviewCard';
import {useDispatch,useSelector} from "react-redux"
import {getProductDetails, newReview} from "../../actions/productAction"
import {useParams} from "react-router-dom"
import axios from 'axios'
const ProductDetails = ({match}) => {
    const dispatch = useDispatch();

    const {loading,error,product} = useSelector((state)=>state.productDetails);
    const { success, error: reviewError } = useSelector(
      (state) => state.newReview
    );
    const {id} = useParams();
    useEffect(()=>{
      if(error){
        <Alert severity="error">{error}</Alert>
      }
      if(reviewError){
        <Alert severity="error">{reviewError}</Alert>
      }
      if(success){
        <Alert severity="success">Review Submitted Successfully</Alert>
      }
      dispatch(getProductDetails(id));
    },[dispatch, id, error, reviewError])
    const options = {
        size: "large",
        value: 4.5,
        readOnly: true,
        precision: 0.5,
      };
      const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  
  const increaseQuantity = ()=>{
   if(product.Stock <= quantity){
    return;
   }
   else{
    const qty = quantity + 1;
    setQuantity(qty);
   }
}
const decreaseQuantity = () =>{
    if(1 >= quantity){
        return;
    }
    else{
        const qty = quantity -1;
        setQuantity(qty);
    }
}
const addToCartHandler = ()=>{
  //dispatch(addItemsToCart(match.params.id, quantity));
    <Alert severity="success">Item added to cart</Alert>
    
}
const submitReviewToggle = ()=>{
    open ? setOpen(false) : setOpen(true);
}
const reviewSubmitHandler = () =>{
    const myForm = new FormData();

    myForm.set("rating",rating);
    myForm.set("comment",comment);
    myForm.set("productId",id);
    
    dispatch(newReview({rating,comment,productId:id}));
    setOpen(false);
}
const check =async()=>{
  
const {data}=await axios.post('http://127.0.0.1:4000/api/v1/login',{email:'t@t.com',password:'test'})
console.log(data)
}
  return (
    <Fragment>
   <Fragment>
    
   <div className="ProductDetails">
            <div >
              <Button onClick={check}>Login</Button>
              <Carousel className='carousel'>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                  
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
    </Fragment>
    </Fragment>
  )
}

export default ProductDetails