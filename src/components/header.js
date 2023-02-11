import './header.css'
import websiteIcon from './img/website-icon.png'
import { BsSearch } from 'react-icons/bs';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { CartContext } from '../stores/cartContext';


const Header = () => {
  let {cartItems, setCartItems} = useContext(CartContext)

  // console.log(cartItems)

  function deleteCartItem(deleteItem){
    let newCartItem = [...cartItems]
    newCartItem.splice(newCartItem.findIndex((item) => 
      item.id === deleteItem.id
    ), 1)

    setCartItems(newCartItem)
  }


  function addMinusQuantity(changeItem, valueChange){
    let newCartItem = [...cartItems]
    let changeItemIndex = newCartItem.findIndex((item) => item.id === changeItem.id)

    if (newCartItem[changeItemIndex].quantity+valueChange <= 0) return
    newCartItem[changeItemIndex].quantity +=  valueChange
    setCartItems(newCartItem)
  }

  const noItems = () => {
    if (cartItems.length === 0){
      return <p>There are still nothing inside.</p>
    }
  }

  // remember the () =>
  const cartInfo = cartItems.map((item) =>{
    return (
          <tr key={item.id}>
            <td><Link to={`{${window.location.origin.toString()+'/'+item.id}`}><img className='cart-img' src={`${window.location.origin.toString()+'/'+item.img}`}/></Link></td>
            <td>{item.name}</td>
            <td><button onClick={() => addMinusQuantity(item, -1)}>-</button></td>
            <td>{item.quantity}</td>
            <td><button onClick={() => addMinusQuantity(item, 1)}>+</button></td>
            <td><button id="close-item-button" onClick={() => deleteCartItem(item)}>X</button></td>
          </tr>
    )
  })


  return (
    <header className="header-container">
      <div className="header-wrapper">
        <div className="header-left">
          <Link to='/'><img id="website-icon" src={websiteIcon} alt=""/></Link>
        </div>

        <nav className="header-right">
          <div className="search-bar-wrapper">
              <input id='search-button' type="text" placeholder="Search.." name="search"/>
              <button type="search"><BsSearch /></button>      
          </div>
    
          <div className="user">

            <div className="login-buttion-container">
              <Link to=''>Login</Link>
            </div>    
          </div>
      
          <div className="shopping-cart-container">
            {/* <!-- need to think how to show the icon with items number --> */}
            <button id='shopping-cart'><AiOutlineShoppingCart size={'2em'}/></button>
            <div className="shopping-cart-items-num"></div>
            <div className="shoping-cart-items-list">
              {noItems()}
              <table>
                <tbody>
                  {cartInfo}
                </tbody>
              </table>
              <button id='check-out'>Check out</button>
            </div>
          </div>  
        </nav>
      </div>
    </header>
  )
}

export default Header