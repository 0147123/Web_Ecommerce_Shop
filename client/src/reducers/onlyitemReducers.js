const reducers = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_ITEM_ONLY_ONE':
      return action.payload
    default:
      // if use break, it cannot run the app, I don't know why
      return state
  }
}

export default reducers