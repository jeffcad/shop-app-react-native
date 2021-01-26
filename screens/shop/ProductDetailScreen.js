import React from 'react'
import {
  View,
  Text,
  Image,
  Button,
  ScrollView,
  StyleSheet
} from 'react-native'
import { useDispatch } from 'react-redux'
import * as CartActions from '../../store/actions/cart'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import Colors from '../../constants/Colors'
import CustomHeaderButton from '../../components/UI/HeaderButton'

function ProductDetailScreen(props) {

  const selectedProduct = props.route.params.product

  const dispatch = useDispatch()

  return (
    <ScrollView>
      <Image
        style={styles.image}
        source={{ uri: selectedProduct.imageUrl }}
      />
      <View style={styles.actions}>
        <Button
          title='Add to Cart'
          color={Colors.primary}
          onPress={() => dispatch(CartActions.addToCart(selectedProduct))}
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  )
}

export const screenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.product.title,
    headerRight: () =>
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Cart'
          iconName={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
          onPress={() => navData.navigation.navigate('Cart')}
        />
      </HeaderButtons>
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  actions: {
    marginVertical: 20,
    alignItems: 'center'
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'open-sans-bold'
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    lineHeight: 24,
    fontFamily: 'open-sans'
  }
})

export default ProductDetailScreen