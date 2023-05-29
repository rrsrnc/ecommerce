import React from "react";
import Home from "./components/home";
import Cart from "./components/cart";
import Login from "./components/login";
import Layout from "./components/layout";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CategoryProduct from "./components/categoryProduct";
import { CartProvider } from './context/cartContext';
import CheckOut from "./components/checkOut";
import SearchResults from "./components/searchResults";
import Signup from "./components/signup";
import { io } from "socket.io-client";

// const socket=io('http://localhost:5000/')
// socket.on('msg',(msg)=>{
//   console.log(msg.message[0].products)
// })
// socket.emit("data",{data:[1,2,3,4,5,55555]})


function App(){

  return(
    <CartProvider>
    <Router basename="/ecommerce">
      <Routes>
        <Route path="/" element={<Layout/>}>
            <Route index="home" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="orderConfirmation" element={<CheckOut />} />
            <Route path="categories/:id" element={<CategoryProduct />} />
        </Route>
      </Routes>
    </Router>
    </CartProvider>
  );

}

export default App;