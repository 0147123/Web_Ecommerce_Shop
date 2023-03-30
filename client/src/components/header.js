import './header.css'
import websiteIcon from './img/website-icon.png'
import { BsSearch } from 'react-icons/bs';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { CartContext } from '../stores/cartContext';


const Header = () => {
  let {cartItems, setCartItems} = useContext(CartContext)
  let noItem = cartItems.length === 0

  // load cartItems data
  useEffect(() => {
    const saved = localStorage.getItem("cartItems");
    const initialValue = JSON.parse(saved);
    setCartItems(initialValue || [])
  }, [])

  // store cart item info to localstorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartItems])


  function deleteCartItem(deleteItem){
    let newCartItem = [...cartItems]
    newCartItem.splice(newCartItem.findIndex((item) => 
      item.id === deleteItem.id
    ), 1)

    setCartItems(newCartItem)
  }


  function addMinusQuantityInCart(changeItem, valueChange){
    let newCartItem = [...cartItems]
    let changeItemIndex = newCartItem.findIndex((item) => item.id === changeItem.id)

    // for change value by the input field
    if (typeof valueChange === 'string'){
      valueChange = Number(valueChange)
      newCartItem[changeItemIndex].quantity = valueChange
      setCartItems(newCartItem)
      return
    }

    // for change value by add/Minus button
    if (newCartItem[changeItemIndex].quantity+valueChange <= 0) return  // if quantity will become <=0, do nothing
    newCartItem[changeItemIndex].quantity +=  valueChange
    setCartItems(newCartItem)
  }


  // remember the () =>
  const cartInfo = cartItems.map((item) =>{
    return (
      <div className='item-container' key={item.id}>
        <div className='cart-img-container'><Link to={'/product/'+item.id}><img className='cart-img' src={`data:image/${item.imgtype};base64,${item.img}`}/></Link></div>
        <div className='item-detail-container'>
          <div className='display-shopping-cart-info-top-row'>
            <h3>{item.name}</h3>
            <button className="close-item-button" onClick={() => deleteCartItem(item)}>X</button>
          </div>
          <div className='display-shopping-cart-info-botton-row'>
            <button className='quantity-control' onClick={() => addMinusQuantityInCart(item, -1)}>-</button>
            <input type="num" className='quantity-control' value={item.quantity} onChange={(e) => addMinusQuantityInCart(item, e.target.value) }></input>
            <button className='quantity-control' onClick={() => addMinusQuantityInCart(item, 1)}>+</button>
            <p className='shopping-cart-item-price'>{item.price}</p>
          </div>
        </div>
      </div>
    )
  })

  const cartTotal = () => {
    let sum = 0
    const total = [...cartItems].forEach((item) =>{
      sum += item.price * item.quantity
    })

    return(
      <>
        <h1>Total:</h1>
        <p>${sum}</p>
        <button id='check-out-button'>Check out</button>
      </>
    )
  }


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
            <Link to='/login' className="login-buttion-container">
              {/* <Link to='/adminpanel'>Admin</Link> */}
              Login
            </Link>    
          </div>
      
          <div className="shopping-cart-container">
            {/* <!-- need to think how to show the icon with items number --> */}
            <button id='shopping-cart'><AiOutlineShoppingCart size={'2em'}/></button>
            <div className="shopping-cart-items-list">
              <div className='shopping-cart-items-list-area'>{cartInfo}</div>
              {noItem && <div  id='noItemsWarning'>There are still nothing inside.</div>}
              {!noItem && cartTotal()}
            </div>
          </div>  
        </nav>
      </div>
    </header>
  )
}

export default Header