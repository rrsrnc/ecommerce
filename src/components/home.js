import React, { useEffect , useState } from "react"
import Product from "./product";
import fetcher from "../Fetcher";
// import './categoryProduct.css'

function Home(){

    const[success,setSuccess]=useState(0)
    const[items,setitems]=useState({errMessage:"",data:[]})

    useEffect(()=>{
        fetchData();
    },[])

    const fetchData=async()=>{
        const data=await fetcher("/home/products")
        setitems(data)
        setSuccess(1)
        console.log(data)
    }
    
       if(success){
            return(
                <>
                    <div>
                        All Products
                    </div>
                    <div className="container">
                    {items.data.map((item)=>(
                            <Product key={item._id} product={item}/>
                        ))}
                    </div>
                </>
            )
        }
}

export default Home;