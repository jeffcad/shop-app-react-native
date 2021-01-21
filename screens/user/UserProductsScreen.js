import React from 'react'
import {
  View,
  Button,
  FlatList,
  StyleSheet,
  Platform
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

  return (
    <FlatList
      data={userProducts}
      renderItem={itemData =>
        <ProductItem
          product={itemData.item}
          onSelect={() => { }}
        >
          <View style={styles.button}>
            <Button
              color={Colors.primary}
              title='Edit'
              onPress={() => { }}
            />
          </View>
          <View style={styles.button}>
            <Button
              color={Colors.primary}
              title='Delete'
              onPress={() =>
                dispatch(ProductsActions.deleteProduct(itemData.item.key))
              }
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
      </HeaderButtons>
  }
}

export default UserProductsScreen