import { useContext } from "react"
import { CartContext } from "../stores/cartContext"
import { AiOutlineShoppingCart } from 'react-icons/ai';
import "./addToCartButton.css";

const AddToCartButton = (({addItem, displayText, itemsListinfo, pageClass}) => {
  let {cartItems, setCartItems} = useContext(CartContext)
  let isDetailPage = pageClass === 'product-detail-add-to-cart-button'

  function addToCart(addItem){
    if (cartItems !== [] && cartItems.some(function(element){return element.id === addItem.id})){
      let updateObject = cartItems.findIndex((obj => obj.id == addItem.id))
      setCartItems(cartItems.map((item) => item.id == addItem.id ? {
        ...item, quantity: ++cartItems[updateObject].quantity
      } : item))

      // since after buy a items, the inventory will change in that time, not in this time
      // so I comment it

      // let lessQuantity = itemsListinfo.findIndex((obj => obj.id == addItem.id))
      // itemsListinfo[lessQuantity].quantity--

    }
    else {
      let updateObject = Object.assign({}, addItem)
      updateObject.quantity = 1

      setCartItems([...cartItems, updateObject])
    }

  }

  return (
    <div id="add-to-cart-button-container">
      <button className={pageClass} onClick={() => addToCart(addItem)}>
        {isDetailPage && (<AiOutlineShoppingCart id="product-add-to-cart-icon"/>)}
        <p>{displayText}</p>  
      </button>
    </div>
  )
})

export default AddToCartButton