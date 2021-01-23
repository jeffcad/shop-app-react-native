import { API_KEY } from '../../noGitHub'

export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      })

    if (!response.ok) {
      throw new Error('Oops, something went wrong!')
    }

    const resData = await response.json()


    dispatch({
      type: SIGNUP
    })
  }
}

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      })

    if (!response.ok) {
      throw new Error('Oops, something went wrong!')
    }

    const resData = await response.json()


    dispatch({
      type: LOGIN
    })
  }
}