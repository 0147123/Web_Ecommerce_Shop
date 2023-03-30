const reducers = (state = [], action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload.user, token: action.payload.token }
    case 'LOGOUT':
      return { user: null, token: null }
    default:
      // if use break, it cannot run the app, I don't know why
      return state
  }
}

export default reducers