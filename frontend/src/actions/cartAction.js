import axios from "axios";

const siteIP = 'http://127.0.0.1:4000'
export const addItemsToCart = (id,quantity) => async(dispatch,getState)=>{
    const {data}  = await axios.get(`${siteIP}/api/v1/product${id}`);
    dispatch({
        type:'ADD_TO_CART',
        payload:{
            product:data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.Stock,
            quantity,
        }
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
      type: 'REMOVE_CART_ITEM',
      payload: id,
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };


  export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
      type: 'SAVE_SHIPPING_INFO',
      payload: data,
    });
  
    localStorage.setItem("shippingInfo", JSON.stringify(data));
  };