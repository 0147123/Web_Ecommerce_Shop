import './index.css'

import { useEffect } from "react"
import Header from "../../components/header"
import { useSelector, useDispatch } from 'react-redux'
import { getProductItems } from '../../actions/items'
import { DeleteProductButton, EditProductButton, LinkToCategoryButton, NewItemButton } from '../../components/Button'
import { Link } from 'react-router-dom'

const AdminPanel = () => {
  const itemsListinfo = useSelector((state) => state.items)
  const dispatch = useDispatch()
  // fetching categroy data
  useEffect(() => {
    dispatch(getProductItems())
  }, [])


  const displayProductItemsEditInfo = itemsListinfo?.map((item) => {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.category}</td>
        <td>{item.subCategory}</td>
        <td>{item.price}</td>
        <td>{item.quantity}</td>
        <td>{item.description}</td>
        <td><EditProductButton editItemID={item.id}/><DeleteProductButton deleteItemID={item.id}/></td>
      </tr>
    )
  })

  return(
    <>
      <Header/>
      <div className="content">
        <div className="admin-main-content">
          <h3>Edit Product</h3>
          <div className="add-new-product-container">
            <LinkToCategoryButton/>
            <NewItemButton/>
          </div>
          <div className="admin-panel-container">
            <table className="admin-panel-table">
              <thead className="admin-panel-head">
                <th>#</th>
                <th>Product</th>
                <th>Category</th>
                <th>Subcategory</th>
                <th>Price</th>
                <th>Inventory</th>
                <th>Description</th>
                <th>Actions</th>
              </thead>
              <tbody className="admin-panel-body">
                {displayProductItemsEditInfo}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminPanel