import React from 'react'
import {
  FlatList,
  Platform
} from 'react-native'
import { useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import OrderItem from '../../components/shop/OrderItem'
import CustomHeaderButton from '../../components/UI/HeaderButton'

function OrdersScreen(props) {
  const orders = useSelector(state => state.orders.orders)

  return (
    <FlatList
      data={orders}
      renderItem={itemData =>
        <OrderItem
          orderData={itemData.item}
        />
      }
    />
  )
}

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Your Orders',
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

export default OrdersScreen