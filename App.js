import React from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import ShopNavigator from './navigation/ShopNavigator'

// Reducers
import productsReducer from './store/reducers/products'

const rootReducer = combineReducers({
  products: productsReducer
})

const store = createStore(rootReducer)

export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  )
}