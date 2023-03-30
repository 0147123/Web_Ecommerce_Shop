import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'
import { getOneProductItems, getProductItems } from '../../actions/items'
import {AddToCartButton} from '../../components/Button'
import Header from '../../components/header'
import NavMenu from '../../components/navMenu'
import './index.css'

const ProductDetail = () => {
  let parms = useParams()
  // var [productDetail, setProductDetail] = useState([])
  var product = useSelector((state) => state.oneitems)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOneProductItems(parms.id))
  }, [])

  useEffect(() => {
    dispatch(getOneProductItems(parms.id))
  }, [parms])

  // useEffect(() => {
  //   setProductDetail(
  //     () => [...itemsListinfo].find((items) => {
  //       return items.id == parms.id
  //     })
  //   )
  // }, [itemsListinfo])


  const quantityDisplay = () =>{
    if (product?.quantity <=3 ){
      return 'Only '+ product?.quantity + ' left!'
    }
  }



  return product ? (
    <div>
      <Header/>
      <NavMenu paths={parms.id} category={product?.subCategory} scid={product?.scid} />
      <main className='product-detail-container'>
        <img id='product-detail-image' src={`data:image/${product?.imgtype};base64,${product?.img}`} alt=""/>
        <div className='product-detail-right'>
          <h1 className='product-detail-title'>{product?.name}</h1>
          {console.log("product", product)}
          <p>{product?.description}</p>
          <p>{'$'+product?.price}</p>
          <p>Inventory: {product?.quantity}</p>
          <p>{quantityDisplay()}</p>

          <div>
            <AddToCartButton addItem={product} displayText='Add to cart' pageClass='product-detail-add-to-cart-button' />
          </div>
        </div>
      </main>
    </div>
  ) : <p>404 page not found</p>
}

export default ProductDetail