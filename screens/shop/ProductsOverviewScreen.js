import React, { useEffect } from 'react'
import {
  View,
  FlatList,
  Button,
  StyleSheet,
  Platform
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import ProductItem from '../../components/shop/ProductItem'
import * as CartActions from '../../store/actions/cart'
import * as ProductsActions from '../../store/actions/products'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'

function ProductsOverviewScreen(props) {

  const products = useSelector(state => state.products.availableProducts)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ProductsActions.fetchProducts())
  }, [dispatch])

  const selectItemHandler = (item) => {
    props.navigation.navigate('ProductDetail', { product: item })
  }

  return (
    <View>
      <StatusBar style='light' />
      <FlatList
        data={products}
        renderItem={itemData => {
          return (
            <ProductItem
              product={itemData.item}
              onSelect={() => selectItemHandler(itemData.item)}
            >
              <View style={styles.button}>
                <Button
                  color={Colors.primary}
                  title='View Details'
                  onPress={() => selectItemHandler(itemData.item)}
                />
              </View>
              <View style={styles.button}>
                <Button
                  color={Colors.primary}
                  title='Add To Cart'
                  onPress={() => dispatch(CartActions.addToCart(itemData.item))}
                />
              </View>
            </ProductItem>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 110
  }
})

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'All Products',
    headerLeft: () =>
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Menu'
          iconName={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>,
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