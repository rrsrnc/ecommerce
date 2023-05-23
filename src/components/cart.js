import React, { useEffect } from 'react';
import './cart.css'
import { useContext, useState } from 'react';
import { CartContext } from '../context/cartContext';
import { useNavigate } from 'react-router-dom';
import CheckOut from './checkOut';

const Cart=({})=>{

    const [cartItems, setCartItems] = useState([]);
    const navigate=useNavigate()
    const [cartTotal,setCartTotal]=useState(0);
    const {getcartItems,clearCart,increaseQuantity,decreaseQuantity,deleteItem}=useContext(CartContext);

    useEffect(()=>{
        setCartItems(getcartItems)
        console.log(getcartItems)
    },[getcartItems])
    useEffect(() => {
        calculateCartTotal();
      }, [cartItems]);

    const calculateCartTotal = () => {
        let cartTotal = 0;
        cartItems.forEach((item) => {
          cartTotal += item.price * item.quantity;
        });
        setCartTotal(cartTotal);
      };
    
    // console.log(cartItems)
    const renderCartItems=()=>{

        if(cartItems.length>0){
            return cartItems.map((item,pos) => (
                <tr key={item._id}>
                    <td>{item.name}</td>
                    <td><div className='quantity'>{item.quantity}</div>
                        <div className='icons'>
                        <span><img className={'icon'} src='/icons/plus.png' onClick={()=>increaseQuantity(pos)}/></span>
                        <span><img className={'icon'} src='/icons/minus.png' onClick={()=>decreaseQuantity(pos)}/></span>
                        <span><img className={'icon'} src='/icons/delete.png' onClick={()=>deleteItem(pos)}/></span>
                        </div>
                    </td>
                    <td>{item.price*item.quantity}</td>
                </tr>
            ));
        }
        else{
            return(
                <tr>
                    <td>
                    No items in cart. Please add products to cart
                    </td>
                </tr>
            )
        }
        
    }

    const orderConfirmation=()=>{
        return (navigate("/orderConfirmation"))
        // console.log("check")
        
    }


    return(
        <>
            <div>
                Shopping Cart
            </div>

            <table>
                <thead>
                    <tr>
                        <th className='col'>Item</th>
                        <th className='col'>Quantity</th>
                        <th className='col'>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCartItems()}
                    <tr>
                        <td></td>
                        <td></td>
                        {cartItems.length>0?<td className='last-td'>Total=<span>&#8377;</span>{cartTotal}</td>:""}
                    </tr>
                </tbody>
            </table>
            {cartTotal>0?<button onClick={clearCart}>CLear</button>:""}
            {cartTotal>0?<button onClick={orderConfirmation}>CheckOut</button>:""}
        </>
    )
}

export default Cart;