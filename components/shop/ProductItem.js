import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native'
import Colors from '../../constants/Colors'

function ProductItem(props) {

  let TouchableCmp = TouchableOpacity
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback
  }

  return (
    <View style={styles.product}>
      <TouchableCmp
        onPress={props.onViewDetail}
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
            <View style={styles.button}>
              <Button
                color={Colors.primary}
                title='View Details'
                onPress={props.onViewDetail}
              />
            </View>
            <View style={styles.button}>
              <Button
                color={Colors.primary}
                title='Add To Cart'
                onPress={props.onAddToCart}
              />
            </View>
          </View>
        </View>
      </TouchableCmp>
    </View>
  )
}

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
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
    height: '15%',
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
    height: '25%',
    paddingHorizontal: 20,
    marginTop: 2
  },
  button: {
    width: 110
  }
})

export default ProductItem