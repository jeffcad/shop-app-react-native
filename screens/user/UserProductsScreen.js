import React from 'react'
import {
  View,
  Button,
  FlatList,
  StyleSheet,
  Platform,
  Alert
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import ProductItem from '../../components/shop/ProductItem'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'
import * as ProductsActions from '../../store/actions/products'

function UserProductsScreen(props) {

  const userProducts = useSelector(state => state.products.userProducts)

  const dispatch = useDispatch()

  const editProductHandler = (product) => {
    props.navigation.navigate('EditProduct', { product })
  }

  const deleteHandler = (productId) => {
    Alert.alert(
      'Are you sure',
      'Do you want to delete this item?',
      [
        {
          text: 'No',
          style: 'default'
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () =>
            dispatch(ProductsActions.deleteProduct(productId))
        }
      ])
  }

  return (
    <FlatList
      data={userProducts}
      renderItem={itemData =>
        <ProductItem
          product={itemData.item}
          onSelect={() => editProductHandler(itemData.item)}
        >
          <View style={styles.button}>
            <Button
              color={Colors.primary}
              title='Edit'
              onPress={() => editProductHandler(itemData.item)}
            />
          </View>
          <View style={styles.button}>
            <Button
              color={Colors.primary}
              title='Delete'
              onPress={() => deleteHandler(itemData.item.key)}
            />
          </View>
        </ProductItem>
      }
    />
  )
}

const styles = StyleSheet.create({
  button: {
    width: 110
  }
})

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Your Products',
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
          title='Add'
          iconName={Platform.OS === 'ios' ? 'ios-create' : 'md-create'}
          onPress={() => navData.navigation.navigate('EditProduct')}
        />
      </HeaderButtons>
  }
}

export default UserProductsScreen