import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Platform,
  ActivityIndicator
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

  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState()
  const products = useSelector(state => state.products.availableProducts)
  const dispatch = useDispatch()

  const loadProducts = useCallback(async () => {
    setError(null)
    setIsRefreshing(true)
    try {
      await dispatch(ProductsActions.fetchProducts())
    } catch (err) {
      setError(err.message)
    }
    setIsRefreshing(false)
  }, [dispatch, setError, setIsRefreshing])

  // This listener reloads the products whenever this screen is brought back into focus, so we always have most up-to-date product data instead of what was in memory
  useEffect(() => {
    const willFocusSub = props.navigation.addListener('willFocus', loadProducts)
    return () => {
      willFocusSub.remove()
    }
  }, [loadProducts])

  // This call of useEffect seems redundant because of above one, but above one won't fire on first rendering, so this is needed for 1st render
  useEffect(() => {
    setIsLoading(true)
    loadProducts()
      .then(() => setIsLoading(false))
  }, [loadProducts, setIsLoading])

  const selectItemHandler = (item) => {
    props.navigation.navigate('ProductDetail', { product: item })
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>
          Oops, there was an error getting the products from the server!
        </Text>
        <Button
          title='Try again'
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    )
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        {/* <StatusBar style='light' /> */}
        <ActivityIndicator
          size='large'
          color={Colors.primary}
        />
      </View>
    )
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        {/* <StatusBar style='light' /> */}
        <Text>No products found.</Text>
      </View>
    )
  }

  return (
    <View>
      {/* <StatusBar style='light' /> */}
      <FlatList
        // The next 2 props are for pull-to-refresh
        onRefresh={loadProducts}
        refreshing={isRefreshing}
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

const styles = StyleSheet.create({
  button: {
    width: 110
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30
  }
})

export default ProductsOverviewScreen