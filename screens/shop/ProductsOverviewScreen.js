import React from 'react'
import {
  View,
  FlatList,
  StyleSheet
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useSelector } from 'react-redux'

function ProductsOverviewScreen(props) {

  const products = useSelector(state => state.products.availableProducts)

  return (
    <View>
      <StatusBar style="light" />
      <FlatList
        data={products}
        renderItem={itemData => { }}
      />
    </View>
  )
}

ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products'
}

const styles = StyleSheet.create({

})

export default ProductsOverviewScreen