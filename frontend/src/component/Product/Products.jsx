import React, { Fragment, useEffect, useState } from 'react'
import {Typography,Slider} from '@mui/joy';
import {Alert, Pagination} from "@mui/material"
import ProductCard from '../Home/ProductCard';
import MetaData from "../layout/MetaData";
import {useDispatch,useSelector} from "react-redux";
import { useParams } from 'react-router-dom'
import "./Products.css"
import { getProduct } from '../../actions/productAction';


const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ]

const Products = ({match}) => {

    const dispatch = useDispatch();

    const {
        products,
        loading,
        error,
        productsCount,
        resultPerPage,
        filteredProductsCount,
      } = useSelector((state) => state.products);
      const { keyword } = useParams()

const  count=filteredProductsCount;
   
   

    const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);

  

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
    
  };
  useEffect(() => {
   if(error){
    <Alert severity='error'>{error}</Alert>
   }

    dispatch(getProduct(keyword, currentPage, price, category, ratings));
    
  }, [dispatch, keyword, currentPage, price, category, ratings,error ]);


  return (
    
    <Fragment>
      
        <MetaData title="PRODUCTS --SAMANTA STORE"/>
        <h2 className="productsHeading">Products</h2>
        <div className="products">
            {products && products.map((product)=>(
                <ProductCard key={product._id} product={product} />
              ))}
        </div>
        <div className="filterBox">
            <Typography>Price</Typography>
            {/* slider is like a form which returns a array of 2 prices */}
            <Slider value={price} onChange={priceHandler} 
            valueLabelDisplay='auto' aria-labelledby='range-slider' min={0} max={25000}/>
            <Typography>Categories</Typography>
            <ul className='categoryBox'>
                {categories.map((category)=>(
                    <li className='category-link' key={category} onClick={()=>setCategory(category)}>{category}</li>
                ))}
            </ul>
            <fieldset>
                <Typography component='legend'>Ratings Above</Typography>
            <Slider value={ratings} onChange={(e,newRating)=>{setRatings(newRating)}} aria-labelledby='continuous-slider' valueLabelDisplay="auto" min={0} max={5}/>
            </fieldset>
        </div>
        {resultPerPage < count && (
            <div className="paginationBox">
                <Pagination activePage={currentPage} itemsCountPerPage={resultPerPage} totalItemsCount={productsCount} onChange={setCurrentPageNo} nextPageText="Next" prevPageText="Prev" firstPageText="1st" lastpageText="Last" itemClass="page-item" linkClass="page-link" activeClass="pageItemActive" activeLinkClass="pageLinkActive"/>
            </div>)}
        
    </Fragment>
  )
}

export default Products