import { BASE_URL } from '../../noGitHub'
import Product from '../../models/product'

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

export const fetchProducts = () => {
  return async (dispatch) => {
    const response = await fetch(BASE_URL + 'products.json')
    const resData = await response.json()
    const loadedProducts = []
    for (const key in resData) {
      loadedProducts.push(new Product(
        key,
        'u1',
        resData[key].title,
        resData[key].imageUrl,
        resData[key].description,
        resData[key].price
      ))
    }
    dispatch({
      type: SET_PRODUCTS,
      products: loadedProducts
    })
  }
}

export const deleteProduct = (productId) => {
  return {
    type: DELETE_PRODUCT,
    productId
  }
}

export const createProduct = (title, imageUrl, description, price) => {
  return async (dispatch) => {
    const response = await fetch(BASE_URL + 'products.json', {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price
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
        price
      }
    })
  }
}

export const updateProduct = (id, title, imageUrl, description) => {
  return {
    type: UPDATE_PRODUCT,
    productData: {
      id,
      title,
      imageUrl,
      description
    }
  }
}