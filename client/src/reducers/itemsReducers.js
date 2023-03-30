const reducers = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_ITEMLISTS':
      return action.payload
    case 'CREATE_ITEM':
      return [...state, action.payload]
    case 'CREATE_IMAGE':
      return [...state, action.payload]
    case 'DELETE_PRODUCTITEM':
      return state.filter((item) => item.id !== action.payload)
    case 'UPDATE_ITEM':
      return state.map((item) => item.id == action.payload.id ? action.payload: item)
    case 'UPDATE_IMAGE':
      return state.map((item) => item.id === action.payload.id ? action.payload: item)
    default:
      // if use break, it cannot run the app, I don't know why
      return state
  }
}

export default reducers