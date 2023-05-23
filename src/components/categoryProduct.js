import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Product from "./product";
import { getCategoryProduct, getProducts } from '../Fetcher';
import './product.css'


const CategoryProduct=()=>{

    const {id}=useParams();
    // console.log(id)
    const[products,setProducts]=useState({errMessage:"",data:[]});
    const[success,setSuccess]=useState(0);
    // debugger
    useEffect(()=>{
        fetchCategoryProductData();
    },[id])

    const fetchCategoryProductData=async()=>{
        const data=await getProducts(id)
        // debugger
        
        setProducts((prevState)=>{
            // console.log(prevState)
            return data
        })
        setSuccess(1)
      }

    const displayProduct=()=>{

        if(success){
            // debugger
           return( 
            products.data.map((product)=>(
               <Product key={product._id} product={product}/>
            )))
        }
       
    }  

    return(
        <div className="product">
            {
                displayProduct()
            }
        </div>
    )

}

export default CategoryProduct;
