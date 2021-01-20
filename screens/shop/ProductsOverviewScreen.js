import React from 'react'
import {
  View,
  FlatList,
  Platform
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import ProductItem from '../../components/shop/ProductItem'
import * as CartActions from '../../store/actions/cart'
import CustomHeaderButton from '../../components/UI/HeaderButton'

function ProductsOverviewScreen(props) {

  const products = useSelector(state => state.products.availableProducts)

  const dispatch = useDispatch()

  return (
    <View>
      <StatusBar style='light' />
      <FlatList
        data={products}
        renderItem={itemData => {
          return (
            <ProductItem
              product={itemData.item}
              onViewDetail={() => props.navigation.navigate('ProductDetail',
                {
                  product: itemData.item
                }
              )}
              onAddToCart={() => dispatch(CartActions.addToCart(itemData.item))}
            />
          )
        }}
      />
    </View>
  )
}

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'All Products',
    headerRight: () =>
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Cart'
          iconName={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
          onPress={() => navData.navigation.navigate('Cart')}
        />
      </HeaderButtons>
  }
}

export default ProductsOverviewScreen