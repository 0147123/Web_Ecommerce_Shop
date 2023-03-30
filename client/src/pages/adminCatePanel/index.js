import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getCategory, updateSubcategory, updateCategory } from '../../actions/items'
import Header from '../../components/header'
import './index.css'

const AdminCateDetail = () => {
  const categoryInfo = useSelector((state) => state.category)
  const [editcategoryInfo, setEditcategoryInfo] = useState()
  const [editsubcategoryInfo, setEditsubcategoryInfo] = useState()

  const dispatch = useDispatch()
  const navigate = useNavigate();

  
  const [triggerSubCateID, setTriggerSubCateID] = useState(new Set([]))
  const [triggerCateID, setTriggerCateID] = useState(new Set([]))

  const clear = () => {
    if (window.confirm('Are you sure you return to the last state?')) {
      setEditcategoryInfo([...categoryInfo][1])
      setEditsubcategoryInfo([...categoryInfo][0])
    }
  }   

  useEffect(() => {
    dispatch(getCategory())
  }, [])

  useEffect(() => {
    setEditcategoryInfo([...categoryInfo][1])
    setEditsubcategoryInfo([...categoryInfo][0])
  }, [categoryInfo])

  function handleFormSubmit(e) {
    // console.log("triggerCateID.length", triggerCateID.length)
    if (triggerCateID.size == 0 && triggerSubCateID.size === 0) {
      alert('Please change the category or subcategory name')
      return
    }
    console.log(editsubcategoryInfo)
    console.log(editcategoryInfo)
    if (window.confirm('Are you sure you want to update the list?')) {
      e.preventDefault()
      console.log("triggerCateID", triggerCateID)
      // change item or create item
      dispatch(updateSubcategory([[...editsubcategoryInfo], [...triggerSubCateID]]))
      dispatch(updateCategory([[...editcategoryInfo], [...triggerCateID]]))

      if (window.confirm('Do you want to go back to admin panel?'))
        navigate('/adminpanel')

    }
  }

  function handleCategoryInput(e){
    const { name, value } = e.target
    console.log(e.target, name, value)
    setTriggerCateID((prev) => prev.add(parseInt(name)))

    // console.log("triggerCateID", triggerCateID)
    // update category
    setEditcategoryInfo((prev) => {
      return prev.map((item) => {
        if (item.cid == name) {
          return {
            ...item,
            "name": value
          }
        }
        return item
      })
    })

    // update subcategory
    setEditsubcategoryInfo((prev) => {
      return prev.map((item) => {
        if (item.cid == name) {
          return {
            ...item,
            "category": value
          }
        }
        return item
      })
    })
  }

  function handleSubcategoryInput(e) {
    // console.log("e.target", e.target) 
    const { name, value } = e.target
    const id = name.split(' ')[1]
    const type = name.split(' ')[0]
    setTriggerSubCateID((prev) => prev.add(parseInt(id))) 
    setEditsubcategoryInfo((prev) => {
      return prev.map((item) => {
        if (item.scid == id) {
          if (type === 'category') {
            let newCategory = editcategoryInfo?.find((cate) => {
              return cate.name == value
            })
            if (!newCategory) {
              alert('Please use the category first')
              return item
            }
            return {
              ...item,
              [type]: value,
              "cid": newCategory.cid
            }
          }
          return {
            ...item,
            [type]: value
          }
        }
        return item
      })
    })
  }

  const displayCate = editcategoryInfo?.map((cate) => {
    // console.log(editcategoryInfo)
    return (
        <tr key={cate.cid}>
          <td>{cate.cid}</td>
          <td>
            <input type='text' name={cate.cid} value={cate.name} onChange={(e) => handleCategoryInput(e)} className='cate-input'></input>
          </td>
        </tr>
    )
  })

  const listCategory = () => {
    return editcategoryInfo?.map((cate) => {
      return <option key={cate.cid}>{cate.name}</option>
    })
  }
  
  const displaySubcate = editsubcategoryInfo?.map((cate) => {
    return (
        <tr key={cate.scid}>
          <td>{cate.scid}</td>
          <td>
            <input type='text' name={'subcategory '+cate.scid} value={cate.subcategory} className='cate-input' onChange={(e) => handleSubcategoryInput(e)}></input>
          </td>
          <td>
          <select className='form-select' name={'category '+cate.scid} value={cate.category} onChange={(e) => handleSubcategoryInput(e)}>
            <option value=''></option>
            {editsubcategoryInfo?.length !== 0 && listCategory()}
          </select>
          </td>
          <></>
        </tr>
    )
  })

  return (
    <>
    <Header/>
    <div className="content">
      <div className="admin-main-content">
        <div className='admin-topic-name'>Edit Category</div>
        <div className="add-new-product-container">
        <form onSubmit={(e) => handleFormSubmit(e)} >
          <button type="button" className='submit-button' onClick={() => clear()}>Cancel</button>
          <button className='submit-button'>Submit</button>
          <table className="admin-panel-table">
            <thead className="admin-panel-head">
              <th>#</th>
              <th>Category</th>
            </thead>
            <tbody className="admin-panel-body">
              {displayCate}
            </tbody>
          </table>
          <table className="admin-panel-table">
            <thead className="admin-panel-head">
              <th>#</th>
              <th>Subcategory</th>
              <th>related-category</th>
            </thead>
            <tbody className="admin-panel-body">
              {displaySubcate}
            </tbody>
          </table>
        </form>

        </div>
      </div>
    </div>

    </>
  )
}


export default AdminCateDetail