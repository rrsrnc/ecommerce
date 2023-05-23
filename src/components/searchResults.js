import React,{ useState,useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
import fetcher from '../Fetcher';
import Product from './product';

const SearchResults=()=>{
    const [search]=useSearchParams();
    const[success,setSuccess]=useState(0)
    const[items,setitems]=useState({errMessage:"",data:[]})

    const query=search.get('s')

    useEffect(()=>{
        fetchData();
    },[search])

    const fetchData=async()=>{
        const data=await fetcher("/products?q="+query)
        setitems(data)
        setSuccess(1)
    }
    
   
        if(items.data.length>0){
            return(
            items.data.map((item)=>(
                <Product key={item.id} product={item}/>
            )))
        
        }
        else{
            return <div>Apologies! No Items Found we need to expand or refine your search</div>
        }

}

export default SearchResults;