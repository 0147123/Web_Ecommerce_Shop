import { useContext, useState } from "react"
import { Link } from 'react-router-dom';
import AddToCartButton from "../../components/addToCartButton";
import { CartContext } from "../../stores/cartContext";

const ProductList = ({displayItem, itemsListinfo}) => {

  const itemsList = displayItem.map((items) => {return (
    <div key={items.id}>
      <Link to={"product/"+items.id}><img className="product-item" src={items.img} alt="88"/></Link>
      <div>
        {items.name}<br />{items.category}<br/>{items.price}
        <AddToCartButton addItem={items} displayText='Add to cart' itemsListinfo={itemsListinfo} pageClass='home-page-add-to-cart-button'/>
      </div>
    </div>
  )})
  
  return (
    <div id="items-list">
      {itemsList}
    </div>
  )
}

export default ProductList