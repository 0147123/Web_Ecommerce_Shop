import { useSearchParams } from 'react-router-dom'
import CategoryList from './categoryList'
import ProductList from './productList'
import Header from "../../components/header"
import NavMenu from "../../components/navMenu"
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getProductItems } from '../../actions/items'

const Home = ({displayItem, setDisplayItem}) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const itemsListinfo = useSelector((state) => state.items)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductItems())
  }, [])

  function showAllItems(){
    setSearchParams({})
    // console.log(itemsListinfo)
    setDisplayItem([...itemsListinfo])
  }

  return (
    <div>
      <Header/>
      <NavMenu paths=''/>
      <main className="content">
        <div className="main-content">
          <aside className="main-left">
            <div id='category-intro'>
              <h2>Category</h2>
              <h2 id='show-all-items' onClick={showAllItems}>Show all</h2>
            </div>
            <CategoryList itemsListinfo={itemsListinfo} setDisplayItem={setDisplayItem} searchParams={searchParams} setSearchParams={setSearchParams}/>
          </aside>
          <div className="main-right">
            <h2>Product</h2>
            <ProductList itemsListinfo={itemsListinfo} displayItem={displayItem}/>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home