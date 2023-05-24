import React, { useEffect, useState } from "react"
import Product from "./product";
import { getAccessToken } from "../Fetcher";
import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import { useNavigate, useParams } from "react-router-dom";

function Login() {

    const { setAccessTokenfunc, fetchCart } = useContext(CartContext)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        //USer Login
        const email = e.target[0].value;
        const password = e.target[1].value
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        };

        const response = await fetch('https://backenedecommerce-rrsrnc.onrender.com/auth/login', requestOptions);
        if (response.status == 401) {
            alert("Please use correct credentials")
        }
        const data = await response.json()
        await localStorage.setItem("token", data.accessToken)
        setAccessTokenfunc(data.accessToken)
        console.log(data.accessToken)
        if (data.accessToken) {
            // fetchUser()
            await fetchCart()
            navigate(-1)
          
        }

    }

    // getting user
    const fetchUser = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'accessToken': localStorage.getItem('token') },
        };

        const response = await fetch('https://backenedecommerce-rrsrnc.onrender.com/auth/getuser', requestOptions)
        const data = await response.json()
        console.log(data)
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div >
    )
}

export default Login;