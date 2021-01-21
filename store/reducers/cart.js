import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart'
import { ADD_ORDER } from '../actions/orders'
import { DELETE_PRODUCT } from '../actions/products'
import CartItem from '../../models/cart-item'

const initialState = {
  items: {},
  totalAmount: 0
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product
      const prodPrice = addedProduct.price
      const prodTitle = addedProduct.title

      let updatedOrNewCartItem
      if (state.items[addedProduct.key]) {
        // item is already in cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.key].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.key].sum + prodPrice
        )
      } else {
        updatedOrNewCartItem = new CartItem(
          1,
          prodPrice,
          prodTitle,
          prodPrice)
      }

      return {
        ...state,
        items: {
          ...state.items,
          [addedProduct.key]: updatedOrNewCartItem
        },
        totalAmount: state.totalAmount + prodPrice
      }
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.productId]
      const currentQuantity = selectedCartItem.quantity

      let updatedCartItems
      if (currentQuantity > 1) {
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        )
        updatedCartItems = {
          ...state.items,
          [action.productId]: updatedCartItem
        }
      } else {
        updatedCartItems = { ...state.items }
        delete updatedCartItems[action.productId]
      }

      return {
        ...state,
        items: updatedCartItems,
        totalAmount: Math.abs(state.totalAmount - selectedCartItem.productPrice)
      }
    case ADD_ORDER:
      // Clear the cart
      return initialState
    case DELETE_PRODUCT:
      if (!state.items[action.productId]) {
        return state
      }
      const updatedItems = { ...state.items }
      const itemTotal = state.items[action.productId].sum
      delete updatedItems[action.productId]
      return {
        ...state,
        items: updatedItems,
        totalAmount: Math.abs(state.totalAmount - itemTotal)
      }
    default:
      return state
  }
}

export default cartReducer