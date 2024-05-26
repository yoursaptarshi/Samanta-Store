import axios from "axios";

export const getProduct = (keyword="",currentPage=1,price=[0,25000],category,ratings=0)=>async(dispatch)=>{
try {
  
    dispatch({ type: 'ALL_PRODUCT_REQUEST' });
    let link = `http://127.0.0.1:4000/api/v1/products?category=${category}&price[gt]=${price[0]}&price[lt]=${price[1]}&keyword=${keyword}&page=${currentPage}&ratings=${ratings}`
    
    if (category) {
      link = `http://127.0.0.1:4000/api/v1/products?category=${category}&price[gt]=${price[0]}&price[lt]=${price[1]}&keyword=${keyword}&page=${currentPage}&ratings=${ratings}`
      
      }
      
    
      const { data } = await axios.get(link);
      
      dispatch({
        type: 'ALL_PRODUCT_SUCCESS',
        payload: data,
      });
} catch (error) {
    dispatch({
        type: 'ALL_PRODUCT_FAIL',
        payload: error.response.data.message,
      });
}
}

export const getAdminProduct = () => async(dispatch)=>{
  try {
    dispatch({type:'ADMIN_PRODUCT_REQUEST'});

    const {data} = await axios.get("http://127.0.0.1:4000/api/v1/admin/products")
    dispatch({
      type: 'ADMIN_PRODUCT_SUCCESS',
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: 'ADMIN_PRODUCT_FAIL',
      payload: error.response.data.message,
    });
  }
}

export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: 'NEW_PRODUCT_REQUEST' });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `http:127.0.0.1:4000/api/v1/admin/product/new`,
      productData,
      config
    );

    dispatch({
      type: 'NEW_PRODUCT_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'NEW_PRODUCT_FAIL',
      payload: error.response.data.message,
    });
  }
}

export const updateProduct = (id, productData) => async (dispatch) => {

  try {
    dispatch({ type: 'UPDATE_PRODUCT_REQUEST' });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData,
      config
    );
    dispatch({
      type: 'UPDATE_PRODUCT_SUCCESS',
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: 'UPDATE_PRODUCT_FAIL',
      payload: error.response.data.message,
    });
  }
}

export const deleteProduct = (id) => async (dispatch) =>{

  try {
    dispatch({ type: 'DELETE_PRODUCT_REQUEST' });

    const { data } = await axios.delete(`http:127.0.0.1:4000/api/v1/admin/product/${id}`);

    dispatch({
      type: 'DELETE_PRODUCT_SUCCESS',
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: 'DELETE_PRODUCT_FAIL',
      payload: error.response.data.message,
    });
  }
}

export const getProductDetails = (id) => async (dispatch)=>{
  try {
    dispatch({ type: "PRODUCT_DETAILS_REQUEST" });

    const {data} = await axios.get(`http://127.0.0.1:4000/api/v1/product/${id}`)

    dispatch({
      type:"PRODUCT_DETAILS_SUCCESS",
      payload: data.product,
    })
  } catch (error) {
    dispatch({
      type: "PRODUCT_DETAILS_FAIL",
      payload: error.response.data.message,
    });
  }
}

export const newReview = ({rating,comment,productId}) => async (dispatch)=>{
  try {
    dispatch({ type: "NEW_REVIEW_REQUEST" });
    const config = {
      headers :{"Content-Type" : "application/json"}
    };
    
    const {data} = await axios.put(`http://127.0.0.1:4000/api/v1/review`,{rating,comment,productId},config);

    dispatch({
      type: 'NEW_REVIEW_SUCCESS',
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: 'NEW_REVIEW_FAIL',
      payload: error.response.data.message,
    });
  }
}

// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'ALL_REVIEW_REQUEST' });

    const { data } = await axios.get(`http://127.0.0.1:4000/api/v1/reviews?id=${id}`);

    dispatch({
      type: 'ALL_REVIEW_SUCCESS',
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: 'ALL_REVIEW_FAIL',
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: 'DELETE_REVIEW_REQUEST' });

    const { data } = await axios.delete(
      `/api/v1/reviews?id=${reviewId}&productId=${productId}`
    );

    dispatch({
      type: 'DELETE_REVIEW_SUCCESS',
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: 'DELETE_REVIEW_FAIL',
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = ()=>async(dispatch)=>{
  dispatch({type:'CLEAR_ERRORS'});
}