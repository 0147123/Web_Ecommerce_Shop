import { useState } from 'react';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ProductDetail from './pages/productDetail';
import { CartContext } from './stores/cartContext';
import Home from './pages/home';


const App = () => {
  // store data
  const [cartItems, setCartItems] = useState([])

  const [itemsListinfo, setItemsListinfo] = useState([
    {id: 1, name:'Very nice Shoe', img:'img/prod1.png', price:'$329', category:'Shoe', subCategory:'Nike', quantity: 33, description: "This is description"},
    {id: 2, name:'Conserve Shoe', img:'img/prod2.png', price:'$329', category:'Shoe', subCategory:'Conserve', quantity: 3, description: "This is description"},
    {id: 3, name:'New Balance Shoe', img:'img/prod3.png', price:'$329', category:'Shoe', subCategory:'New Balance', quantity: 32, description: "This is description"},
    {id: 4, name:'Black clothes', img:'img/prod4.png', price:'$329', category: 'Clothes', subCategory:'Male', quantity: 23, description: "This is description"},
    {id: 5, name:'Dress', img:'img/prod5.png', price:'$329', category: 'Clothes', subCategory:'Female', quantity: 38, description: "This is description"},
    {id: 6, name:'White T-shirt', img:'img/prod6.png', price:'$329', category: 'Clothes', subCategory:'Male', quantity: 100, description: "This is description"},
    {id: 7, name:'Conserve Shoe 2', img:'img/prod7.png', price:'$329', category: 'Shoe', subCategory:'Conserve', quantity: 323, description: "This is description"}
  ])

  const [displayItem, setDisplayItem] = useState([...itemsListinfo])

  return (
    <BrowserRouter basename=''>
      <CartContext.Provider value={{cartItems, setCartItems}}>
        <Routes>
          <Route path='/' element={<Home itemsListinfo={itemsListinfo} displayItem={displayItem} setDisplayItem={setDisplayItem} />}/>
          <Route path='/product' element={<ProductDetail itemsListinfo={itemsListinfo}/>}>
            <Route path=':id' element={<ProductDetail itemsListinfo={itemsListinfo}/>}/>
          </Route>
          <Route path='*' element={<p>404</p>}/>
        </Routes>
      </CartContext.Provider>
    </BrowserRouter>
  )
}

export default App