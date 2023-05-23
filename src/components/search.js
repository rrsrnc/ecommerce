import React from 'react';
import { useNavigate } from 'react-router-dom';
import './search.css'

const Search=()=>{
    const navigate=useNavigate()
    let timer;
    const delay=500;

    const handleSearch=(e)=>{
        const query=e.target.value;
        clearTimeout(timer)
        timer=setTimeout(()=>searchQuery(query), delay);
        
    }

    const searchQuery=(query)=>{
        navigate('/search?s='+query)
    }

    return(
        <input placeholder='Search' className='search' onChange={handleSearch} onBlur={(e)=>{e.target.value=""}}></input>
    )

}

export default Search;