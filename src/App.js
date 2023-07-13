import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAsyncItems } from './features/cart/cartSlice';
import { Products } from './features/products/Product';
import './App.css';
import { Cart } from './features/cart/Cart';

function App() {

  const [showCart, setShowCart] = useState(false);
  const items = useSelector(state=>state.cart.items);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchAsyncItems())
  },[])

  return (

    <div className="App">
      <button onClick={()=>setShowCart(!showCart)}>Cart {items.length} </button>
      {showCart ? <Cart /> : null}
      
      <Products />
    </div>
  );
}

export default App;
