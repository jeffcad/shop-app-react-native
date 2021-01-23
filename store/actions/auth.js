import AsyncStorage from '@react-native-community/async-storage'

import { API_KEY } from '../../noGitHub'

export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime))

    dispatch({
      type: AUTHENTICATE,
      userId,
      token
    })
  }
}

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

    dispatch(authenticate(
      resData.localId,
      resData.idToken,
      parseInt(resData.expiresIn) * 1000
    ))

    const expirationDate = new Date(new Date().getTime() + (parseInt(resData.expiresIn) * 1000))
    saveDataToStorage(resData.idToken, resData.localId, expirationDate)
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

    dispatch(authenticate(
      resData.localId,
      resData.idToken,
      parseInt(resData.expiresIn) * 1000
    ))

    const expirationDate = new Date(new Date().getTime() + (parseInt(resData.expiresIn) * 1000))
    saveDataToStorage(resData.idToken, resData.localId, expirationDate)
  }
}

export const logout = () => {
  clearLogoutTimer()
  AsyncStorage.removeItem('userData')
  return {
    type: LOGOUT
  }
}

let timer
const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer)
  }
}
const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout())
    }, expirationTime)
  }
}

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
      expiryDate: expirationDate.toISOString()
    })
  )
}