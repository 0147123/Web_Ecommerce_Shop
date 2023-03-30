import axios from 'axios'
// `{${window.location.origin.toString()+'/'+item.id}`

const url = 'http://localhost:8080/'
// const url = 'https://s69.ierg4210.ie.cuhk.edu.hk/api/'


// user


// category
export const fetchCategory = () => axios.get(url+'category')

export const deleteCategory = () => axios.delete(url+'category')

export const createCategory = (newCategory) => axios.post(url+'category', newCategory)

export const updateCategory = (updateCategory) => axios.patch(url+'category', updateCategory)

// subcategory

export const fetchSubCategory = () => axios.get(url+'category/subcates')

export const deleteSubCategory = () => axios.delete(url+'category/subcates')

export const createSubCategory = (newSubCategory) => axios.post(url+'category/subcates', newSubCategory)

export const updateSubCategory = (updateSubCategory) => axios.patch(url+'category/subcates', updateSubCategory)

// only one item

export const fetchOneItem = (id) => axios.get(url+'item/'+id)

// product item
export const fetchItems = () =>  axios.get(url+'itemslist')

export const fetchItemsOnlyText = () => axios.get(url+'itemslist/text')

export const fetchItemByPage = (page) => axios.get(url+'itemslist/bypage/'+page)

export const deleteProductItem = (id) => axios.delete(url+'itemslist/'+id)

export const createItems = (newItem) => axios.post(url+'itemslist', newItem)

export const updateProductItem = (updateItem) => axios.patch(url+'itemslist/', updateItem)

export const createItemsImage = (image) => axios.post(url+'itemslist/createimage', image)

export const updatedItemimage = (image) => axios.post(url+'itemslist/updateimage', image)