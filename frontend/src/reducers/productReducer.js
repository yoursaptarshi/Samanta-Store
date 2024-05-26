import {createReducer} from "@reduxjs/toolkit";

const state = {
   
    products:[],
    product:{},
    success:false,
    reviews:[],
    isDeleted:false
}
export const productsReducer = createReducer(state,(builder)=>{
   builder.addCase( 'ADMIN_PRODUCT_REQUEST',(state)=>{
    state.loading=true;
    state.products=[];
})
    .addCase('ALL_PRODUCT_SUCCESS',(state,action)=>{
        state.loading=false;
        state.products=action.payload.products;
        state.productsCount=action.payload.productsCount;
        state.resultPerPage=action.payload.resultPerPage;
        state.filteredProductsCount=action.payload.filteredProductsCount;
    })
    .addCase('ADMIN_PRODUCT_SUCCESS',(state,action)=>{
        state.loading=false;
        state.products=action.payload;
    })
    .addCase('ALL_PRODUCT_FAIL',(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    })
    .addCase('CLEAR_ERRORS',(state)=>{
        state.error=null;
    })
});

export const productDetailsReducer = createReducer(state,(builder)=>{
    builder.addCase('PRODUCT_DETAILS_REQUEST',(state)=>{
        state.loading=true
    })
    .addCase('PRODUCT_DETAILS_SUCCESS',(state,action)=>{
        state.loading=false;
        state.product=action.payload
    })
    .addCase('PRODUCT_DETAILS_FAIL',(state,action)=>{
        state.loading=false;
        state.error=action.payload
    })
    .addCase('CLEAR_ERRORS',(state)=>{
        state.error=null;
    })
});

export const newReviewReducer = createReducer(state,(builder)=>{
    builder.addCase('NEW_REVIEW_REQUEST',(state)=>{
        state.loading=true
    })
    .addCase('NEW_REVIEW_SUCCESS',(state,action)=>{
        state.loading=false;
        state.success=action.payload
    })
    .addCase('NEW_REVIEW_FAIL',(state,action)=>{
        state.loading=false;
        state.error=action.payload
    })
    .addCase("NEW_REVIEW_RESET",(state,action)=>{
        state.success=false;
    })
    .addCase('CLEAR_ERRORS',(state)=>{
        state.error=null;
    })
})
export const newProductReducer = createReducer(state,(builder)=>{
    builder.addCase('NEW_PRODUCT_REQUEST',(state)=>{
        state.loading=true;
    })
    .addCase('NEW_PRODUCT_SUCCESS',(state,action)=>{
        state.loading=false;
        state.success=action.payload.success;
        state.product=action.payload.product;
    })
    .addCase('NEW_PRODUCT_FAIL',(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    })
    .addCase('NEW_PRODUCT_RESET',(state,action)=>{
        state.success=false
    })
    .addCase('CLEAR_ERRORS',(state)=>{
        state.error=null;
    })
})

export const productReducer = createReducer(state,(builder)=>{
    builder.addCase('DELETE_PRODUCT_REQUEST')
    .addCase('UPDATE_PRODUCT_REQUEST',(state)=>{
        state.loading=true
    })
    .addCase('DELETE_PRODUCT_SUCCESS',(state,action)=>{
        state.loading=false;
        state.isDeleted=action.payload;
    })
    .addCase('UPDATE_PRODUCT_SUCCESS',(state,action)=>{
        state.loading=false;
        state.isUpdated=action.payload;
    })
    .addCase('DELETE_PRODUCT_FAIL')
    .addCase('UPDATE_PRODUCT_FAIL',(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    })
    .addCase('DELETE_PRODUCT_RESET',(state)=>{
        state.isDeleted=false;
    })
    .addCase('UPDATE_PRODUCT_RESET',(state)=>{
        state.isUpdated=false;
    })
    .addCase('CLEAR_ERRORS',(state)=>{
        state.error=null;
    })
})

export const productReviewsReducer = createReducer(state,(builder)=>{
    builder.addCase('ALL_REVIEW_REQUEST',(state)=>{
        state.loading=true;
    })
    .addCase('ALL_REVIEW_SUCCESS',(state,action)=>{
        state.loading=false;
        state.reviews=action.payload
    })
    .addCase('ALL_REVIEW_FAIL',(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    })
    .addCase('CLEAR_ERRORS',(state)=>{
        state.error=null;
    })
})

export const reviewReducer = createReducer(state,(builder)=>{
    builder.addCase('DELETE_REVIEW_REQUEST',(state)=>{
        state.loading=true;
    })
    .addCase('DELETE_REVIEW_SUCCESS',(state,action)=>{
        state.loading=false;
        state.isDeleted=action.payload;
    })
    .addCase('DELETE_REVIEW_FAIL',(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    })
    .addCase('DELETE_REVIEW_RESET',(state)=>{
        state.isDeleted=false;
    })
    .addCase('CLEAR_ERRORS',(state)=>{
        state.error=null;
    })
})