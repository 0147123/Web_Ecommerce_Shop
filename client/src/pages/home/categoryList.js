import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { getCategory } from "../../actions/items"


const CategoryList = ({setDisplayItem, itemsListinfo, searchParams, setSearchParams}) =>{
  // const location = useLocation()
  // const [categoryInfo, setCategoryInfo] = useState([])
  const categoryInfo = useSelector((state) => state.category)
  const dispatch = useDispatch()
  // fetching categroy data
  useEffect(() => {
    dispatch(getCategory())
    // function getCategory() {
    //   axios.get("http://localhost:8080/category")
    //     .then((response) => {
    //       setCategoryInfo(response.data)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // }

    // getCategory()
  }, [])
  // console.log(categoryInfo)




  // filter by category
  useEffect(() => {
    // filteringByCategory(searchParams.get('Category'))

    let filter = searchParams.get('scid')
    let cidFilter = searchParams.get('cid')
    if(!filter && !cidFilter) {
      setDisplayItem(itemsListinfo)
      return
    }

    if (cidFilter){
      const filteredData = [...itemsListinfo].filter((item) => {
        // console.log( item.cid)
        return item.cid == cidFilter
      })
      setDisplayItem(filteredData)
      // console.log(itemsListinfo)
      return
    }

    const filteredData = [...itemsListinfo].filter((item) => {
      console.log(item.scid)
      return item.scid == filter
    })
    setDisplayItem(filteredData)
  }, [searchParams, itemsListinfo, setDisplayItem])

  // const [categoryInfo, setCategoryInfo] = useState([
  //   {id: 1, name:'Shoe', subCategory:['Nike', 'Conserve', 'New Balance']},
  //   {id: 2, name:'Clothes', subCategory:['Male', 'Female']}
  // ])

  // if cannot do rendering, can try ?.
  const categoryItems = categoryInfo[1]?.map(  (category) => {
    return (
    <ul key={category?.cid}>
      <button onClick={() => setSearchParams({ 'cid': category?.cid})}>{category?.name}</button>

      {categoryInfo[0].map( (subCategory) => subCategory.cid === category.cid ? 
        (
          <li id={subCategory.scid}>
            {/* <input type="checkbox"></input> */}
            <button onClick={() => setSearchParams({ 'scid': subCategory.scid})}>{subCategory.subcategory}</button>
          </li>
        )
      :  <></> )}
    </ul>
    )
  })
  

  return (
  <div id="category">
      {categoryItems}
      {/* <p>{categoryInfo}</p> */}
  </div>
  )
}

export default CategoryList