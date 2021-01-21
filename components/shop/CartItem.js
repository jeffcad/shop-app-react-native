import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Colors from '../../constants/Colors'

function CartItem(props) {
  return (
    <View style={styles.cartItem}>
      {/* <View style={styles.itemData}> */}
      <Text style={styles.quantity}>{props.product.quantity}x  </Text>
      <Text style={styles.title}>{props.product.productTitle}</Text>
      {/* </View> */}
      {/* <View style={styles.itemData}> */}
      <Text style={styles.amount}>${props.product.sum.toFixed(2)}</Text>
      {props.deletable ?
        <TouchableOpacity
          onPress={props.onRemove}
          style={styles.deleteButton}
        >
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
            size={23}
            color='coral'
          />
        </TouchableOpacity>
        : null
      }
      {/* </View> */}
    </View >
  )
}

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: Colors.accent
  },
  // itemData: {
  //   flexDirection: 'row',
  //   alignItems: 'center'
  // },
  quantity: {
    fontFamily: 'open-sans',
    color: '#888',
    fontSize: 16,
    width: '10%',
    textAlignVertical: 'center'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
    width: '50%',
    textAlignVertical: 'center'
  },
  amount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
    width: '28%',
    textAlign: 'right',
    textAlignVertical: 'center'
  },
  deleteButton: {
    marginLeft: 10,
    width: '12%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default CartItem