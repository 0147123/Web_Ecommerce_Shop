import { useState } from 'react'
import * as api from '../api'


// category and subcategory
export const getCategory = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCategory()
    console.log(data)

    dispatch({type: 'FETCH_CATEGORY', payload: data})
  } catch (error) {
    console.log(error)
  }
}

// category

export const createCategory = (newCategory) => async (dispatch) => {
  try {
    const { data } = await api.createCategory(newCategory)
    dispatch({type: 'CREATE_CATEGORY', payload: data})
  } catch (error) {
    console.log(error)
  }
}

export const deleteCategory = (id) => async (dispatch) => {
  try {
    await api.deleteCategory(id)
    dispatch({type: 'DELETE_CATEGORY', payload: id})
  } catch (error) {
    console.log(error)
  }
}

export const updateCategory = (updatedCategory) => async (dispatch) => {
  try {
    console.log(updatedCategory)
    const { data } = await api.updateCategory(updatedCategory)
    dispatch({type: 'UPDATE_CATEGORY', payload: data})
  } catch (error) {
    console.log(error)
  }
}

// subcategory

export const createSubcategory = (newSubcategory) => async (dispatch) => {
  try {
    const { data } = await api.createSubCategory(newSubcategory)
    dispatch({type: 'CREATE_SUBCATEGORY', payload: data})
  } catch (error) {
    console.log(error)
  }
}

export const deleteSubcategory = (id) => async (dispatch) => {
  try {
    await api.deleteSubCategory(id)
    dispatch({type: 'DELETE_SUBCATEGORY', payload: id})
  } catch (error) {
    console.log(error)
  }
}

export const updateSubcategory = (updateSubCategory) => async (dispatch) => {
  // updateSubCategory[0] is the new subcategory info
  // updateSubCategory[1] is the id of updated subcategory
  try {
    console.log("updateSubCategory", updateSubCategory)
    const { data } = await api.updateSubCategory(updateSubCategory)
    dispatch({type: 'UPDATE_SUBCATEGORY', payload: data})
  } catch (error) {
    console.log(error)
  }
}



// product items
export const getProductItems = () => async (dispatch) => {
  try {
    const { data } = await api.fetchItems()
    dispatch({type: 'FETCH_ITEMLISTS', payload: data})
  } catch (error) {
    console.log(error)
  } 
}

export const getOneProductItems= (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchOneItem(id)
    // console.log("data", data)
    dispatch({type: 'FETCH_ITEM_ONLY_ONE', payload: data})
  } catch (error) {
    console.log(error)
  }
}

export const getitemsListOnlyText = () => async (dispatch) => {
  try {
    const { data } = await api.fetchItemsOnlyText()
    dispatch({type: 'FETCH_ITEMLISTS_ONLY_TEXT', payload: data})
  } catch (error) {
    console.log(error)
  }
}

export const getProductItemsByPage = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchItemByPage(id).then((items) => {
      return items
    })
    dispatch({type: 'FETCH_IEMLISTS_BY_PAGE', payload: { hasMore: data[0], items: data[1]}})
  } catch (error) {
    console.log(error)
    return
  }
}


export const deleteProductItem = (id) => async (dispatch) => {
  try {
    await api.deleteProductItem(id)
    

    dispatch({type: 'DELETE_PRODUCTITEM', payload: id})
    dispatch({type: 'DELETE_PRODUCTITEM_ONLY_TEXT', payload: id})
  } catch (error) {
    console.log(error)
  }
}

export const createItems = (newItem) => async (dispatch) => {
  try {
    console.log("createItems in front end")
    const { data } = await api.createItems(newItem)
    
    dispatch({type: 'CREATE_ITEM', payload: data})
    // delete data.image
    // delete data.image
    // dispatch({type: 'CREATE_ITEM_ONLY_TEXT', payload:  })
  } catch (error) {
    console.log(error)
  }
}

export const updateItems = (updatedItem) => async (dispatch) => {
  try {
    const { data } = await api.updateProductItem(updatedItem)

    // updateItem in frontend

    dispatch({type: 'UPDATE_ITEM', payload: data})
  } catch (error) {
    console.log(error)
  }
}

export const uploadItemsImage = (image, id) => async (dispatch) => {
  try {
    console.log("uploadItemsImage in front end")

    const formData = new FormData();

    formData.append("image", image)
    formData.append("pid", id?.toString())

    // if user create new item 
    if (!id){
      const { data } = await api.createItemsImage(formData)
      console.log(data, "this is data")
      dispatch({type: 'CREATE_IMAGE', payload: data})
      let dataOnlyText = {...data}
      delete dataOnlyText.img
      dispatch({type: 'CREATE_ITEM_ONLY_TEXT', payload: dataOnlyText})
      return
    }

    // if user update new item
    const { data } = await api.updatedItemimage(formData)
    console.log(data, "this is data")
    let dataOnlyText = {...data}
    delete dataOnlyText.img
    dispatch({type: 'UPDATE_IMAGE', payload: data})
    dispatch({type: 'UPDATE_ONLY_TEXT', payload: data})
  } catch (error) {
    console.log(error)
  }
}

