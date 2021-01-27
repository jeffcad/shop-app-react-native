import { BASE_URL } from '../../noGitHub'
import Product from '../../models/product'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const ownerId = getState().auth.userId
    try {
      const response = await fetch(`${BASE_URL}products.json`)

      if (!response.ok) {
        throw new Error('Something went wrong!')
      }

      const resData = await response.json()
      const loadedProducts = []
      for (const key in resData) {
        loadedProducts.push(new Product(
          key,
          resData[key].ownerId,
          resData[key].ownerPushToken,
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          resData[key].price
        ))
      }
      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter(prod =>
          prod.ownerId === ownerId)
      })
    } catch (err) {
      throw err
    }
  }
}

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    const response = await fetch(`${BASE_URL}products/${productId}.json?auth=${token}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Oops, something went wrong with updating the product.')
    }

    dispatch({
      type: DELETE_PRODUCT,
      productId
    })
  }
}

export const createProduct = (title, imageUrl, description, price) => {
  return async (dispatch, getState) => {

    let pushToken
    let statusObj = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    if (statusObj.status !== 'granted') {
      statusObj = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    }
    if (statusObj.status !== 'granted') {
      pushToken = null
    } else {
      const response = await Notifications.getExpoPushTokenAsync()
      pushToken = response.data
    }

    const token = getState().auth.token
    const ownerId = getState().auth.userId
    const response = await fetch(`${BASE_URL}products.json?auth=${token}`, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price,
        ownerId,
        ownerPushToken: pushToken
      })
    })
    const resData = await response.json()

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        imageUrl,
        description,
        price,
        ownerId,
        pushToken
      }
    })
  }
}

export const updateProduct = (id, title, imageUrl, description) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    const response = await fetch(
      `${BASE_URL}products/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        header: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl
        })
      })

    if (!response.ok) {
      throw new Error('Oops, something went wrong with updating the product.')
    }

    dispatch({
      type: UPDATE_PRODUCT,
      productData: {
        id,
        title,
        imageUrl,
        description
      }
    })
  }
}