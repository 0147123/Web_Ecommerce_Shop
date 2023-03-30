const reducers = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_CATEGORY':
      return action.payload
    case 'CREATE':
      return state
    case 'UPDATE_CATEGORY':
      return action.payload
    case 'DELETE_CATEGORY':
      return action.payload
    case 'CREATE_CATEGORY':
      return action.payload
    case 'UPDATE_SUBCATEGORY':
      return action.payload
    case 'DELETE_SUBCATEGORY':
      return action.payload
    case 'CREATE_SUBCATEGORY':
      return action.payload
    default:
      // if use break, it cannot run the app, I don't know why
      return state
  }
}

export default reducers