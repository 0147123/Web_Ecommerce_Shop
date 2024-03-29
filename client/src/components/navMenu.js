import { Link} from "react-router-dom"
import React from 'react'
import ReactDOM from 'react-dom'

import './navMenu.css'

const NavMenu = (props) => {


  const path = () => {
    if (props.paths == '') {
      return (
        <Link to='' className='path-list'>Home</Link>
      )
    }
    
    // remember: inside ${}, variable no need to use {} 
    return (
      <>
        <Link to='/'  className='path-list'>Home</Link>
        <p className='path-list'>{' > '}</p>
        <Link to={'/?scid='+props.scid} className='path-list'>{props.category}</Link>
        <p className='path-list'>{' > '}</p>
        <Link to={props.paths} className='path-list'>Product {props.paths}</Link>
      </>
    )
  }

  return (
      <nav className="hierarchical-nav-menu">
        <div className='path-container'>
          {path()}
        </div>
      </nav>
  )
}

export default NavMenu