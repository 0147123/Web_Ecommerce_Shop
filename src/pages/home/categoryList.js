import { useEffect, useState } from "react"
import { useLocation } from "react-router"


const CategoryList = ({setDisplayItem, itemsListinfo, searchParams, setSearchParams}) =>{
  // const location = useLocation()
  // filter by category
  useEffect(() => {
    // filteringByCategory(searchParams.get('Category'))

    let filter = searchParams.get('Category')
    if(filter == null ) {
      setDisplayItem(itemsListinfo)
      return
    }

    const filteredData = [...itemsListinfo].filter((item) => {
      return item.subCategory === filter
    })
    setDisplayItem(filteredData)

  }, [searchParams, itemsListinfo, setDisplayItem])

  const [categoryInfo, setCategoryInfo] = useState([
    {id: 1, name:'Shoe', subCategory:['Nike', 'Conserve', 'New Balance']},
    {id: 2, name:'Clothes', subCategory:['Male', 'Female']}
  ])

  const categoryItems = categoryInfo.map(  (category) => {
    let counter = 0
    return (
    <ul key={category.id}>
      <p>{category.name}</p>
      {category.subCategory.map( subCategory => {
        return (
          <li id={counter++}>
            {/* <input type="checkbox"></input> */}
            <button onClick={() => setSearchParams({ 'Category': subCategory})}>{subCategory}</button>
          </li>
        )
      })}
    </ul>
    )
  })
  

  return (
  <div id="category">
      {categoryItems}
  </div>
  )
}

export default CategoryList