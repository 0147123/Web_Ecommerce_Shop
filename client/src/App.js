import { useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductItems } from './actions/items'

import ProductDetail from './pages/productDetail'
import ProdectedRoutes from './protectedRoutes';
import { CartContext } from './stores/cartContext';
import Home from './pages/home';
import CheckOut from './pages/checkOut';
import Login from './pages/login';
import AdminPanel from './pages/adminPanel';
import AdminProductDetail from './pages/adminProductDetail';
import AdminCateDetail from './pages/adminCatePanel';
import AdminCateDetailPage from './pages/adminCateDetail';


const App = () => {
  // store data
  const itemsListinfo = useSelector((state) => state.items)
  const Auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    dispatch(getProductItems())
  }, [])

  const [displayItem, setDisplayItem] = useState([...itemsListinfo])

  

  return (
    <BrowserRouter basename='/'>
      <CartContext.Provider value={{cartItems, setCartItems}}>
        <Routes>
          <Route path='/' element={<Home itemsListinfo={itemsListinfo} displayItem={displayItem} setDisplayItem={setDisplayItem} />}/>
          <Route path='/product' element={<ProductDetail itemsListinfo={itemsListinfo}/>}>
            <Route path=':id' element={<ProductDetail itemsListinfo={itemsListinfo}/>}/>
          </Route>
          <Route path='/adminpanel' component={<AdminPanel/>} />
          <Route path='/adminproductdetail' element={<AdminProductDetail/>} >
            <Route path=':id' element={<AdminProductDetail/>}/>
          </Route>
          <Route path='/checkout' element={<CheckOut />}/>
          <Route path='/admincategorypanel' element={<AdminCateDetail/>} />
          <Route path='/admincategorydetail' element={<AdminCateDetailPage/>}/>
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<p>404</p>}/>  
        </Routes>
      </CartContext.Provider>
    </BrowserRouter>
  )
}

export default App