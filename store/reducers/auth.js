import { AUTHENTICATE, LOGOUT } from '../actions/auth'

const initialState = {
  token: null,
  userId: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId
      }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}

export default authReducer