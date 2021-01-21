import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Platform,
  StyleSheet,
  Alert
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch } from 'react-redux'

import CustomHeaderButton from '../../components/UI/HeaderButton'
import * as ProductsActions from '../../store/actions/products'

function EditProductScreen(props) {

  const product = props.navigation.getParam('product')

  const [title, setTitle] = useState(product ? product.title : '')
  const [imageUrl, setImageUrl] = useState(product ? product.imageUrl : '')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState(product ? product.description : '')

  const dispatch = useDispatch()

  const submitHandler = useCallback(() => {
    if (product) {
      dispatch(ProductsActions.updateProduct(
        product.key,
        title,
        imageUrl,
        description
      ))
    } else {
      dispatch(ProductsActions.createProduct(
        title,
        imageUrl,
        description,
        +price
      ))
    }
    props.navigation.goBack()
  }, [dispatch, product, title, description, imageUrl, price])

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler })
  }, [submitHandler])

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={text => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={text => setImageUrl(text)}
          />
        </View>
        {/* Can't edit price for existing products */}
        {product ? null : <View style={styles.formControl}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={text => setPrice(text)}
          />
        </View>}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  )
}

EditProductScreen.navigationOptions = (navData) => {
  const product = navData.navigation.getParam('product')
  const submitHandler = navData.navigation.getParam('submit')

  return {
    headerTitle: product ? 'Edit Product' : 'Add Product',
    headerRight: () =>
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Save'
          iconName={Platform.OS === 'ios' ? 'ios-checkmark' : 'md-checkmark'}
          onPress={submitHandler}
        />
      </HeaderButtons>
  }
}

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formControl: {
    width: '100%'
  },
  label: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    fontSize: 18,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  }
})

export default EditProductScreen