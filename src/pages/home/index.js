import { useSearchParams } from 'react-router-dom'
import CategoryList from './categoryList'
import ProductList from './productList'
import Header from "../../components/header"
import NavMenu from "../../components/navMenu"
import './index.css'

const Home = ({itemsListinfo, displayItem, setDisplayItem}) => {
  const [searchParams, setSearchParams] = useSearchParams()

  function showAllItems(){
    setSearchParams({})
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