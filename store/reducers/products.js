import PRODUCTS from '../../data/dummy-data'
import { DELETE_PRODUCT } from '../actions/products'

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
}

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        availableProducts: state.availableProducts.filter(product =>
          product.key !== action.productId),
        userProducts: state.userProducts.filter(product =>
          product.key !== action.productId)
      }
    default:
      return state
  }
}

export default productsReducer