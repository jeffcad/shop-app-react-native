import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart'
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
        // ...state not needed if below items are the entire state
        // ...state,
        items: {
          ...state.items,
          [addedProduct.key]: updatedOrNewCartItem
        },
        totalAmount: state.totalAmount + prodPrice
      }
    case REMOVE_FROM_CART:

    default:
      return state
  }
}

export default cartReducer