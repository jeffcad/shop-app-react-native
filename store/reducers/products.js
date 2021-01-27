import PRODUCTS from '../../data/dummy-data'
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS
} from '../actions/products'

import Product from '../../models/product'

const initialState = {
  availableProducts: [],
  userProducts: []
}

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        availableProducts: action.products,
        userProducts: action.userProducts
      }
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        action.productData.ownerId,
        action.productData.pushToken,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      )
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct)
      }
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(prod => prod.key === action.productData.id)
      const updatedProduct = new Product(
        action.productData.id,
        state.userProducts[productIndex].ownerId,
        state.userProducts[productIndex].pushToken,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price
      )
      const updatedUserProducts = [...state.userProducts]
      updatedUserProducts[productIndex] = updatedProduct
      const availableProductIndex = state.availableProducts.findIndex(prod => prod.key === action.productData.id)
      const updatedAvailableProducts = [...state.availableProducts]
      updatedAvailableProducts[availableProductIndex] = updatedProduct
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts
      }
    case DELETE_PRODUCT:
      return {
        ...state,
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