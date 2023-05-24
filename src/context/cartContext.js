import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();


// const Storage =  localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

// Create a provider component to provide the cart data

export const CartProvider = ({ children }) => {
  // console.log(Storage)
  let cartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem(['cart'])) : [];
  const storage = localStorage.getItem('token') ? localStorage.getItem('token') : ""
  const [accessToken, setAccessToken] = useState(storage);
  const [getcartItems, setgetCartItems] = useState(cartItems);
  // Function to add a product to the cart
  // useEffect(() => {
  //   setAccessToken(storage)
  //   setgetCartItems(cartItems)
  // },[])
  const cart = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'accessToken': localStorage.getItem('token') },
    };

    const response = await fetch('https://backenedecommerce-rrsrnc.onrender.com/cart/products', requestOptions)
    console.log(response.status)
    if(response.status !=501){
      const data = await response.json()
      cartItems = data.products
    }

    else{
      cartItems=[]
    }
    

    
    return cartItems

  }
  const fetchCart = async () => {
    setAccessToken(localStorage.getItem('token'))
    cartItems = await cart()
    // console.log(cartItems)
    if (cartItems) {
      setgetCartItems(cartItems)
      localStorage.setItem('cart', JSON.stringify(cartItems))
    }
    else {
      setgetCartItems([])
    }
  }


  const addToCart = async (product) => {
    const index = getcartItems.findIndex((item) => item.id === product.id);
    
    if (index === -1) {
      const updatedCartItems = [...getcartItems, { ...product, quantity: 1 }];
      // console.log(updatedCartItems)
      localStorage.setItem('cart', JSON.stringify(updatedCartItems))
      

      if (product._id) {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'accessToken': localStorage.getItem('token')
          },
          body: JSON.stringify({ name: product.name, price: product.price, quantity: 1, pId: product._id })
        };
        console.log(product._id)
        const response = await fetch('https://backenedecommerce-rrsrnc.onrender.com/cart/addproduct', requestOptions)
        console.log(response)
        setgetCartItems(updatedCartItems);
      }



    }

    else {
      const updatedCartItems = [...getcartItems];
      let quantity = updatedCartItems[index].quantity
      quantity += 1
      updatedCartItems[index].quantity = quantity
      setgetCartItems(updatedCartItems);
      localStorage.setItem('cart', JSON.stringify(updatedCartItems))
    }

  };

  const clearCart = async () => {

    const requestOptions = {
      method: 'DELETE',
      headers: { 'accessToken': localStorage.getItem('token') },
    };
    const response = await fetch('https://backenedecommerce-rrsrnc.onrender.com/cart/clearcart', requestOptions)
    console.log(response)
    localStorage.setItem('cart', "")
    setgetCartItems([]);


    return getcartItems;
  };

  const increaseQuantity = async (index) => {
    const id = getcartItems[index]._id
    console.log(id)
    const requestOptions = {
      method: 'PUT',
      headers: { 'accessToken': localStorage.getItem('token') },
    };
    const response = await fetch(`https://backenedecommerce-rrsrnc.onrender.com/cart/updateproductincrease/${id}`, requestOptions)
    console.log(response)
    const updatedCartItems = [...getcartItems];
    let quantity = updatedCartItems[index].quantity
    quantity += 1
    updatedCartItems[index].quantity = quantity
    setgetCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems))

  };
  const decreaseQuantity = async (index) => {
    const id = getcartItems[index]._id
    const updatedCartItems = [...getcartItems];
    let quantity = updatedCartItems[index].quantity
    if (quantity > 1) {
      quantity -= 1
      const requestOptions = {
        method: 'PUT',
        headers: { 'accessToken': localStorage.getItem('token') },
      };
      const response = await fetch(`https://backenedecommerce-rrsrnc.onrender.com/cart/updateproductdecrease/${id}`, requestOptions)
      console.log(response)
    }
    updatedCartItems[index].quantity = quantity
    
    setgetCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems))
  };
  const deleteItem = async(index) => {
    const updatedCartItems = [...getcartItems];
    const newCartItems = updatedCartItems.filter(x => x.id !== updatedCartItems[index].id)
    // console.log(newCartItems)
    const id = getcartItems[index]._id
   
      const requestOptions = {
        method: 'DELETE',
        headers: { 'accessToken': localStorage.getItem('token') },
      }
      const response = await fetch(`https://backenedecommerce-rrsrnc.onrender.com/cart/deleteproduct/${id}`, requestOptions)
      console.log(response)

    setgetCartItems(newCartItems);
    localStorage.setItem('cart', JSON.stringify(newCartItems))
  };

  const setAccessTokenfunc = (token) => {
    console.log(token)
    setAccessToken(token)
  }

  // Create the context value
  const contextValue = {
    getcartItems,
    addToCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    deleteItem,
    accessToken,
    setAccessTokenfunc,
    fetchCart
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
