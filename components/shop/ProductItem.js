import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native'

import Card from '../UI/Card'

function ProductItem(props) {

  let TouchableCmp = TouchableOpacity
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback
  }

  return (
    <Card style={styles.product}>
      <TouchableCmp
        onPress={props.onSelect}
        useForeground
      >
        <View>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: props.product.imageUrl }}
              style={styles.image}
            />
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>{props.product.title}</Text>
            <Text style={styles.price}>${props.product.price.toFixed(2)}</Text>
          </View>
          <View style={styles.actions}>
            {props.children}
          </View>
        </View>
      </TouchableCmp>
    </Card>
  )
}

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
    overflow: 'hidden'
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  details: {
    alignItems: 'center',
    height: '17%',
    padding: 10
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
    fontFamily: 'open-sans-bold'
  },
  price: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'open-sans'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: 20,
    marginTop: 2
  }
})

export default ProductItem