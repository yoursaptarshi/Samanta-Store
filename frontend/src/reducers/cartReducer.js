import {createReducer} from '@reduxjs/toolkit'
const state={ cartItems: [], shippingInfo: {} }
export const cartReducer = createReducer(state,(builder)=>{
    builder.addCase('ADD_TO_CART',(state,action)=>{
        
    })
})