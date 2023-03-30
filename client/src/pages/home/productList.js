import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getProductItems, getProductItemsByPage } from "../../actions/items";
import { AddToCartButton } from "../../components/Button";
import { CartContext } from "../../stores/cartContext";

const ProductList = ({displayItem, itemsListinfo}) => {
  // const itemsListinfo = useSelector((state) => state.items)
  // const dispatch = useDispatch()
  // useEffect(()=> {
  //   dispatch(getProductItems)
  // }, []) 
  const itemsListInfoByPage = useSelector((state) => state.itemsByPage)
  const dispatch = useDispatch()
  const observer = useRef()
  const [page, setPage] = useState(1)

  // const lastItemInPage = useCallback((node) => {
  //   if (itemsListInfoByPage?.loading) return
  //   // connect the observer to the new last item in the page
  //   if (observer.current) observer.current.disconnect()
  //   observer.current = new IntersectionObserver(entries => {
  //     // isIntersecting is true when the last item on the page 
  //     if (entries[0].isIntersecting && itemsListInfoByPage?.hasMore) {
  //       console.log(itemsListInfoByPage?.items)
  //       console.log('page', page)
  //       setPage(prevPage => prevPage + 1)
  //       console.log('visible')
  //     }
  //   })
  //   if (node) observer.current.observe(node)
  //   console.log(node)
  // }, [itemsListInfoByPage.hasMore, itemsListInfoByPage.loading])

  
  const itemsList = displayItem?.map((items, index) => {
    return (
      // itemsListInfoByPage?.items.length === index + 1 ?
      // // last item in the page
      // <div key={items.id} ref={lastItemInPage} >
      //   <Link to={"product/"+items.id}><img className="product-item" src={`data:image/${items.imgtype};base64,${items.img}`} alt="88"/></Link>
      //   <div>
      //     {items.name}<br />{items.category}<br/>{'$'+items.price}
      //     <AddToCartButton addItem={items} displayText='Add to cart' itemsListinfo={itemsListinfo} pageClass='home-page-add-to-cart-button'/>
      //   </div>
      // </div>
      // :
      // // other items in the page
      // <div key={items.id}>
      //   <Link to={"product/"+items.id}><img className="product-item" src={`data:image/${items.imgtype};base64,${items.img}`} alt="88"/></Link>
      //   <div>
      //     {items.name}<br />{items.category}<br/>{'$'+items.price}
      //     <AddToCartButton addItem={items} displayText='Add to cart' itemsListinfo={itemsListinfo} pageClass='home-page-add-to-cart-button'/>
      //   </div>
      // </div>

      <div key={items.id}>
        <Link to={"product/"+items.id}><img className="product-item" src={`data:image/${items.imgtype};base64,${items.img}`} alt="88"/></Link>
        <div>
          {items.name}<br />{items.category}<br/>{'$'+items.price}
          <AddToCartButton addItem={items} displayText='Add to cart' itemsListinfo={itemsListinfo} pageClass='home-page-add-to-cart-button'/>
        </div>
      </div>
  )})


  // after first time 
  useEffect(()=> {
    dispatch(getProductItemsByPage(1))
  }, [])


  
  return (
    <div id="items-list">
      {/* {itemsList} */}
      {itemsList}
    </div>
  )
}

export default ProductList