import React, { useEffect, useState } from 'react';
import { getCategories } from '../Fetcher';
import { Link } from 'react-router-dom';
import './category.css'
import Home from './home';

function Category(){

    const[categories,setCategories]=useState({errMessage:"",data:[]})
    const[success,setSuccess]=useState(0)

    useEffect(()=>{
        fetchCategoryData();
    },[])

    const fetchCategoryData=async()=>{
        const data=await getCategories()
        // debugger
        // console.log(success)
        setCategories(data)
        if(categories.errMessage===""){
            setSuccess(1)
        }
        else{
            // debugger
        }
        
      }

    const displayCategory=()=>{
        // console.log(categories.data)
        if(success){
            // debugger
           return( 
            categories.data.map((category)=>(
                <Link to={`/categories/${category.id}`} key={category.id} className='link'>
                    {category.category}
                </Link>
            )))
        }
        else{
            // console.log(categories.errMessage)
            return(
                <div>
                    Failed to fetch categories
                </div>
            )
        }
       
    }

    return(
        <div>
            <ul>
                {displayCategory()}
            </ul>
            
        </div>
    )
}

export default Category;