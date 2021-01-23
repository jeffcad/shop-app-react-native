import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  Platform,
  ActivityIndicator,
  StyleSheet
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import OrderItem from '../../components/shop/OrderItem'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import * as OrdersActions from '../../store/actions/orders'
import Colors from '../../constants/Colors'

function OrdersScreen(props) {

  const [isLoading, setIsLoading] = useState(false)
  const orders = useSelector(state => state.orders.orders)
  const dispatch = useDispatch()

  useEffect(() => {
    setIsLoading(true)
    dispatch(OrdersActions.fetchOrders())
      .then(() => setIsLoading(false))
      .catch(err => setIsLoading(false))
  }, [dispatch])

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator
          size='large'
          color={Colors.primary}
        />
      </View>
    )
  }

  if (orders.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>You have no orders yet. Why not make some?</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={orders}
      renderItem={itemData => <OrderItem orderData={itemData.item} />}
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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30
  },
  message: {
    fontFamily: 'open-sans',
    fontSize: 20
  }
})

export default OrdersScreen