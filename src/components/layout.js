import React, { useEffect, useState } from "react"
import './layout.css'
import { Link, Outlet } from "react-router-dom";
import Category from "./category"
import { useContext } from "react";
import { CartContext } from '../context/cartContext';
import Search from "./search";



const Layout=()=>{

    const {getcartItems,accessToken,setAccessTokenfunc,clearCart}=useContext(CartContext)

    const image=getcartItems.length>0?"/icons/cartfull.png":"/icons/cart.png"

    // const [login,setLogin] = useState([accessToken])


    const handleLogout=()=>{
        localStorage.clear()
        // setLogin("")
        setAccessTokenfunc("")
        clearCart()

    }

    return(
             <>
            <header className='header'>
                <Link className="homeicon" to={'/'}>
                            <img src={`${process.env.PUBLIC_URL}/icons/home.png`}></img>
                </Link>
                <span className="search">
                    <Search/>
                </span>
                <span>
                        <p>Ecommerce Website</p>
                </span>
                <Link className="carticon" to={'cart'}>
                    <img src={`${process.env.PUBLIC_URL}${image}`}>

                    </img>
                </Link>
                <Link className={`btn ${accessToken?"hide":"show"}`}  to={'login'} >
                    login
                </Link>
                <Link className={`btn ${accessToken?"show":"hide"}`}  to={'/'} onClick={handleLogout}>
                    logout
                </Link>
                <Link className={`btn ${accessToken?"hide":"show"}`}  to={'signup'} onClick={handleLogout}>
                    signup
                </Link>
            </header>
            <section className='section'>
                <nav className='nav'>
                    <Category/>
                </nav>
                <main className="main">
                    <Outlet/>
                </main>
            </section>
            <footer className='footer'>
                Contact Us
            </footer>
        </>
        
    )
}

export default Layout;