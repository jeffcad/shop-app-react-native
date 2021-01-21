import React, { useState } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'

import Colors from '../../constants/Colors'
import CartItem from './CartItem'

function OrderItem(props) {

  const [showDetails, setShowDetails] = useState(false)

  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.orderData.totalAmount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.orderData.readableDate}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails ? 'Hide Details' : 'Show Details'}
        onPress={() => setShowDetails(prevState => !prevState)}
      />
      {showDetails ?
        <View style={styles.detailItems}>
          {props.orderData.items.map(item => {
            return (
              <CartItem
                key={item.productId}
                product={item}
                deletable={false}
              />)
          })}
        </View>
        : null}
    </View>
  )
}

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
    alignItems: 'center'
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  date: {
    fontFamily: 'open-sans',
    fontSize: 16,
    color: '#888'
  },
  detailItems: {
    width: '100%'
  }
})

export default OrderItem