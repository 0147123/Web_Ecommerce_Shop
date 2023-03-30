import { useContext } from "react"
import { CartContext } from "../stores/cartContext"
import { useDispatch } from "react-redux";
import { deleteProductItem } from "../actions/items";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import "./Button.css";
import { Link } from "react-router-dom";

export const AddToCartButton = (({addItem, displayText, itemsListinfo, pageClass}) => {
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
        {isDetailPage && (<AiOutlineShoppingCart id="product-add-to-cart-icon" size={24} />)}
        <p>{displayText}</p>  
      </button>
    </div>
  )
})

export const NewItemButton = () => {
  return (
    <div className="new-item-button-container">
      <Link to='/adminproductdetail' className="new-item-button">
        {/* <Link to='/adminpanel'>Admin</Link> */}
        New
      </Link>

    </div>
  )
}

export const LinkToCategoryButton = () => {
  return (
    <div className="new-item-button-container">
    <Link to='/admincategorypanel' className="new-item-button">
      {/* <Link to='/adminpanel'>Admin</Link> */}
      Category
    </Link>

  </div>
  )
}

export const EditCateButton = ({editCateID}) => {
  return(
    <div className="edit-button-container">
      <Link to={'/category/'+editCateID} className="edit-button">
        {/* <Link to='/adminpanel'>Admin</Link> */}
        Edit
      </Link>
    </div>

  )
}

export const DeleteCateButton = ({editCateID}) => {
  const dispatch = useDispatch()
  
  function deleteItem(){
    if (window.confirm('Are you sure you delete this Category?')) {
      // dispatch(deleteCategory(editCateID))
      // console.log('Thing was saved to the database.');
    } else {
      // Do nothing!
      // console.log('this is canneled');
    }
    
  }
  return (
    <div className="delete-button-container">
      <button className="delete-button" onClick={() => deleteItem()}>
        Delete
      </button>
    </div>
  )

}


export const EditProductButton = ({editItemID}) => {
  return (
    <div className="edit-button-container">
      <Link to={'/adminproductdetail/'+editItemID} className="edit-button">
        {/* <Link to='/adminpanel'>Admin</Link> */}
        Edit
      </Link>
    </div>

  )
}

export const DeleteProductButton = ({deleteItemID}) => {
  const dispatch = useDispatch()
  
  function deleteItem(){
    if (window.confirm('Are you sure you delete this Product?')) {
      dispatch(deleteProductItem(deleteItemID))
      // console.log('Thing was saved to the database.');
    } else {
      // Do nothing!
      // console.log('this is canneled');
    }
    
  }
  return (
    <div className="delete-button-container">
      <button className="delete-button" onClick={() => deleteItem()}>
        Delete
      </button>
    </div>
  )
}

// export default AddToCartButton