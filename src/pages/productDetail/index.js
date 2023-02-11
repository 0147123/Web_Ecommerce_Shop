import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import AddToCartButton from '../../components/addToCartButton'
import Header from '../../components/header'
import NavMenu from '../../components/navMenu'
import './index.css'

const ProductDetail = ({itemsListinfo}) => {
  let parms = useParams()
  let quantityWarning = ''
  function updateProductDetail() {
    return itemsListinfo.find((items) => {
      return items.id == parms.id
    })
  } 

  var [productDetail, setProductDetail] = useState(updateProductDetail())

  if (productDetail === null || productDetail === undefined) {
    setProductDetail(updateProductDetail())
  }

  const quantityDisplay = () =>{
    if (productDetail.quantity <=3 ){
      return 'Only '+ productDetail.quantity + ' left!'
    }
  }

  return (
    <div>
      <Header/>
      <NavMenu paths={parms.id} category={productDetail.subCategory}/>
      <main className='product-detail-container'>
        <img id='product-detail-image' src={'../'+productDetail.img} alt=""/>
        <div className='product-detail-right'>
          <h1 className='product-detail-title'>{productDetail.name}</h1>
          <p>{productDetail.description}</p>
          <p>{productDetail.price}</p>
          <p>Inventory: {productDetail.quantity}</p>
          <p>{quantityDisplay()}</p>


          <div>
            <AddToCartButton addItem={productDetail} displayText='Add to cart' pageClass='product-detail-add-to-cart-button' />
          </div>
        </div>
      </main>

    </div>
  )
}

export default ProductDetail