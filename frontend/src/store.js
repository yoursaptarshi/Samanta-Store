import {configureStore} from "@reduxjs/toolkit";
import {newReviewReducer, productDetailsReducer, productReviewsReducer, productsReducer, reviewReducer} from "./reducers/productReducer.js"

const store = configureStore({
    reducer:{
        products:productsReducer,
        productDetails: productDetailsReducer,
        newReview: newReviewReducer,
        productReviews: productReviewsReducer,
        review: reviewReducer,
    }
})

export default store;