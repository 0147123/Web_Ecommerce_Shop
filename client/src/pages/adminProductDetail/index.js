import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createItems, getCategory, getProductItems, updateItems, uploadItemsImage } from '../../actions/items'
import Header from '../../components/header'
import './index.css'

const AdminProductDetail = () => {
  const parms = useParams()
  const navigate = useNavigate();


  // image file path
  const [uploadedFile, setUploadedFile] = useState()
  const [imgPreview, setImgPreview] = useState()
  const categoryInfo = useSelector((state) => state.category)
  const itemsListinfo = useSelector((state) => state.items)
  // const itemsListinfo = useSelector((state) => parms ? state.items.find((item) => item.id === parms.id): null)

  // newitem
  const [newItem, setNewItem] = useState({
    id: '',
    name: '',
    img: '',
    price: '',
    quantity: '',
    description: '',
    scid: '',
    subCategory: '',
    category: ''
  })

  const dispatch = useDispatch()

  // fetching categroy data
  useEffect(() => {
    dispatch(getCategory())
    dispatch(getProductItems())
  }, [])

  useEffect(() => {
    // console.log(itemsListinfo)
    if (parms) {
      setNewItem(
        () => [...itemsListinfo]?.find((items) => {
          return items.id == parms.id
        })
      )
      setImgPreview(newItem?.img)
      // setNewItem(itemsListinfo)
    }
  }, [itemsListinfo])


  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!uploadedFile) {
      setImgPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(uploadedFile)
    setImgPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [uploadedFile])

  
  function handleNormalInput(e) {
    const { name, value } = e.target
    // console.log(newItem)
    console.log("newItem", newItem)
    setNewItem({...newItem, [name]: value})
  }

  function changeCategoryBySubcategory(subCategory) {
    let newCategory = categoryInfo[0]?.find((cate) => {
      return cate.subcategory === subCategory
    })

    // set category, subcategory info
    setNewItem((prevState) => { 
      return ({
        ...prevState, 
        category: newCategory.category, 
        subCategory: subCategory, 
        scid: newCategory.scid  
      })})
  }

  function uploadFileChangeHandler(e) {
    let file = e.target.files
    const MAX_FILE_SIZE = 1024 * 1024 * 5 // 5MB

    if (!file || file.length === 0){
      // console.log("file eufhsuidhfuisdhuifh")
      setUploadedFile(undefined)
      return
    }

    if (file[0].size > MAX_FILE_SIZE) {
      alert('File size must below or equal to 5MB!')
      e.target.value = null
      return
    }

    setUploadedFile(file[0])  

    // file[0].arrayBuffer().then((arrayBuffer) => {
    //   const blob = new Blob([new Uint8Array(arrayBuffer)], {type: file.type });
    //   console.log(blob);

    //   console.log(typeof file[0])

    //   setUploadedFile(file[0])  
    // });
  }

  function handleFormSubmit(e) {
    // console.log(newItem)
    if (window.confirm(!parms ? 'Are you sure you want to add this object?' : 'Are you sure you want to edit this object?')) {
      e.preventDefault()

      // console.log(parms.id)
      // change item or create item
      if (parms.id){
        dispatch(updateItems(newItem))
        dispatch(uploadItemsImage(uploadedFile, parms.id))
      } else {
        dispatch(createItems(newItem))
        dispatch(uploadItemsImage(uploadedFile, undefined))
      }
      if (window.confirm('Do you want to go back to admin panel?'))
        navigate('/adminpanel')
    }
    e.preventDefault()

  }

  const listCategory = (type) => {
    switch (type) {
      case "Category":
        return categoryInfo[1].map((cate) => {
          return <option key={cate.cid}>{cate.name}</option>
        })
      case "Subcategory":
        return categoryInfo[0].map((cate) => {
          return <option key={cate.scid}>{cate.subcategory}</option>
        })
      default:
        break;
    }
  }

  const adminForm = () => {
      return (
        <form className='admin-form' onSubmit={(e) => handleFormSubmit(e)}>
          <div className='admin-form-button-container'>
            <button className='submit-button'>Submit</button>
          </div>

          <div className='admin-form-name-container'>
            <p className='form-text'>Name</p>
            <input type="text" name='name' value={newItem?.name} onChange={(e) => handleNormalInput(e)} className='form-input'  required></input>
          </div>

          <div className='admin-space-between-container'>
            <div className='admin-form-name-big-container'>
              <p className='form-text'>Price</p>
              <input type="text" name='price' value={newItem?.price} onChange={(e) => handleNormalInput(e)}  className='form-input' required></input>
            </div>
            <div className='admin-form-name-small-container'>
              <p className='form-text' >Category</p>
              <select className='form-select' name='category' value={newItem?.category} onChange={(e) => handleNormalInput(e)} disabled>
                <option value=''></option>
                {categoryInfo.length !== 0 && listCategory("Category")}
              </select>
            </div>
          </div>

          <div className='admin-space-between-container'>
            <div className='admin-form-name-big-container'>
              <p className='form-text'>Inventory</p>
              <input type="text" name='quantity' value={newItem?.quantity} onChange={(e) => handleNormalInput(e)}  className='form-input' required></input>
            </div>
            <div className='admin-form-name-small-container'>
              <p className='form-text'>Subcategory</p>
              <select className='form-select' name='subCategory' value={newItem?.subCategory} onChange={(e) => changeCategoryBySubcategory(e.target.value)}>
                <option value=''></option>
                {categoryInfo.length !== 0 && listCategory("Subcategory")}
              </select>
            </div>
          </div>

          <div className='admin-form-name-big-container'>
              <p className='form-text'>Description</p>
              <textarea rows={7}  name='description' value={newItem?.description} onChange={(e) => handleNormalInput(e)} className='form-input'></textarea>
          </div>

          <div className='admin-form-name-big-container'>
              <p className='form-text'>Image</p>
              <input type='file' name='img' accept=".jpg,.gif,.png" onChange={(e) => uploadFileChangeHandler(e)} className='form-input'></input>
          </div>

          {imgPreview || parms ?  (
                  <div className='admin-form-name-container'>
                      <p className='form-text'>Preview</p>
                      <div className='admin-form-image-preview-container'>
                        {/* need fix src problem */}
                        {newItem?.imgtype && !uploadedFile ? (
                          <img className="thumbnail" src={`data:image/${newItem?.imgtype};base64,${imgPreview}`}/>)
                          :( 
                            <img className="thumbnail" src={imgPreview}/>
                          )
                        }
                      </div>
                  </div>
          ) : null}
        </form>
      )  
  }

  return(
    <>
    <Header/>
    <div className='content'>
      <div className='admin-main-content'>
        <div className='new-item'>
          <h2>{parms.id == null ? "New Product": "Edit Product"}</h2>
        </div>
        {adminForm()}
      </div>
    </div>
    </>
  )
}

export default AdminProductDetail