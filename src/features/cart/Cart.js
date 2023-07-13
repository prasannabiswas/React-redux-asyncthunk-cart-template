import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteAsync,
  fetchAsync, fetchAsyncItems,
} from './cartSlice';
import './Cart.css';
import { updateAsync } from './cartSlice';



export function Cart() {

  const dispatch = useDispatch();
  const items = useSelector(state=>state.cart.items);

  const handleChange = (e, id) => {
    // console.log(e.target.value);
    dispatch(updateAsync({id, change:{quantity:+e.target.value}}));
  }

  return (
    <div className="shopping-cart">
      <div className="title">
        Shopping Bag - Total: ${items.reduce((acc,item)=>item.price*item.quantity+acc,0)}
      </div>

      {
        items.map((item,key)=>(
          <div className="item" key={key}>
            <div className="buttons">
              <span className="delete-btn" onClick={()=>dispatch(deleteAsync(item.id))} />
              <span className="like-btn" />
            </div>

            <div className="image">
              <img src={item.thumbnail} alt={item.description} className='image' />
            </div>

            <div className="description">
              <p>{item.description}</p>
            </div>
            <div className="quantity">
              <select value={item.quantity} onChange={(e)=>handleChange(e,item.id)} >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
              {/* <button className="plus-btn" type="button" name="button">
                <img src="https://designmodo.com/demo/shopping-cart/plus.svg" alt="" />
              </button>
              <input type="text" name="name" value={item.quantity}/>
              <button className="minus-btn" type="button" name="button">
                <img src="https://designmodo.com/demo/shopping-cart/minus.svg" alt="" />
              </button> */}
            </div>

            <div className="total-price">${item.price}</div>
          </div>
        ))
      }

     
    </div>
  );
}
