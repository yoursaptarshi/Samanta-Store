import React, { Fragment, useEffect } from 'react'
import {CgMouse} from "react-icons/cg"
import "./Home.css"
import ProductCard from './ProductCard'
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";

const product = {
    name:"Blue Tshirt",
    images:[{url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeLe4iPaMnjKY_GlZSK4PBHseU6c82xJxtdw&usqp=CAU"}],
    price:"400",
    ratings:3.5,
    numOfReviews:5,
    _id:"6b723717991"
}

const Home = () => {
    const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);
  return (
    <Fragment>
        <MetaData title="Samanta Store"/>
        <div className='banner'>
            <p style={{color:"black"}}>Welcome to</p><p style={{backgroundColor:'orange', borderRadius:'2vw',width:'25vh'}}> Samanta Store</p>
            <h1 style={{color:"#666665",backgroundImage:'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(242,242,242,1) 18%, rgba(255,199,92,1) 100%)',width:'65vw',borderRadius:'2vw'}}>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
                <button>
                    Scroll <CgMouse/>
                </button>
            </a>
        </div>
        <h2 className='homeHeading'>Featured Products</h2>
        <div className="container" id="container">
            <ProductCard product={product}/>
        </div>
        </Fragment>
  )
}

export default Home