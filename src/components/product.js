import React from "react";
import './product.css'
import Cart from "./cart";
import { useContext } from 'react';
import { CartContext } from '../context/cartContext';




const Product=({product})=>{
    // console.log(product.name)
    const {addToCart}=useContext(CartContext);

    // const handleViewProduct=(product)=>{
    //     return <Product product={product}/>
    // }

    return(
        <>
            <div className="card">
                <h3>{product.name}</h3>
                <div className="details">
                    <h3>
                        Description
                        <div className="feature">
                            <p >ProductId :{product.id}</p>
                            <p >Price=<span>&#8377;</span>{product.price}</p>
                        </div>
                    </h3>
                
                <img src={`${process.env.PUBLIC_URL}${product.img}`}></img> 
                </div>
                
                <button className="btn addToCart" onClick={()=>addToCart(product)}>
                    Add to Cart
                </button>
                {/* <button className="btn viewProduct" onClick={handleViewProduct}>
                    View Product
                </button> */}
            </div>
            
        </>
        
    )
}

export default Product