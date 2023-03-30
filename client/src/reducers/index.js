import { combineReducers } from "redux";
import items from './itemsReducers'
import category from './categoryReducers'
import oneitems from './onlyitemReducers'
import auth from './authReducers'


export default combineReducers({ 
  items,
  category,
  oneitems,
  auth
})