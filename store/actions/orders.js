import { BASE_URL } from '../../noGitHub'
import Order from '../../models/order'

export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId
    try {
      const response = await fetch(`${BASE_URL}orders/${userId}.json`)

      if (!response.ok) {
        throw new Error('Oops, something went wrong!')
      }

      const resData = await response.json()
      const loadedOrders = []
      for (const key in resData) {
        loadedOrders.push(new Order(
          key,
          resData[key].cartItems,
          resData[key].totalAmount,
          new Date(resData[key].date)
        ))
      }
      dispatch({
        type: SET_ORDERS,
        orders: loadedOrders
      })
    } catch (err) {
      throw err
    }
  }
}
export const addOrder = (cartItems, totalAmount) => {
  const date = new Date().toISOString()
  return async (dispatch, getState) => {
    const token = getState().auth.token
    const userId = getState().auth.userId
    const response = await fetch(`${BASE_URL}orders/${userId}.json?auth=${token}`, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date
      })
    })

    if (!response.ok) {
      throw new Error('Oops, something went wrong!')
    }

    const resData = await response.json()

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date
      }
    })
  }
}