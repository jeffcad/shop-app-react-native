import React from 'react'
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import Colors from '../../constants/Colors'
import CartItem from '../../components/shop/CartItem'
import Card from '../../components/UI/Card'
import * as CartActions from '../../store/actions/cart'
import * as OrdersActions from '../../store/actions/orders'

function CartScreen(props) {

  const cartTotalAmount = useSelector(state => state.cart.totalAmount)
  const cartItems = useSelector(state => {
    const transformedCartItems = []
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      })
    }
    // The sort here was added to prevent the products from changing order when reducing quantities in the cart screen
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1)
  })

  const dispatch = useDispatch()

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>
            ${cartTotalAmount.toFixed(2)}
          </Text>
        </Text>
        <Button
          title="Order Now"
          color={Colors.accent}
          onPress={() => dispatch(OrdersActions.addOrder(cartItems, cartTotalAmount))}
          disabled={cartTotalAmount.toFixed(2) === '0.00'}
        />
      </Card>
      <FlatList
        keyExtractor={item => item.productId}
        data={cartItems}
        renderItem={itemData =>
          <CartItem
            product={itemData.item}
            deletable={true}
            onRemove={() =>
              dispatch(CartActions.removeFromCart(itemData.item.productId))
            }
          />
        }
      />
    </View>
  )
}

CartScreen.navigationOptions = {
  headerTitle: 'Your Cart',
}

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  amount: {
    color: Colors.primary
  }
})

export default CartScreen