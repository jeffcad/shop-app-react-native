import React, {
  useEffect,
  useCallback,
  useReducer
} from 'react'
import {
  View,
  ScrollView,
  Platform,
  StyleSheet,
  Alert,
  KeyboardAvoidingView
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch } from 'react-redux'

import CustomHeaderButton from '../../components/UI/HeaderButton'
import * as ProductsActions from '../../store/actions/products'
import Input from '../../components/UI/Input'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    }
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    }
    let updatedFormIsValid = true
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
    }
    return {
      ...state,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid
    }
  }
  return state
}

function EditProductScreen(props) {

  const product = props.navigation.getParam('product')

  const dispatch = useDispatch()

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: product ? product.title : '',
      imageUrl: product ? product.imageUrl : '',
      description: product ? product.description : '',
      price: ''
    },
    inputValidities: {
      title: product ? true : false,
      imageUrl: product ? true : false,
      description: product ? true : false,
      price: product ? true : false
    },
    formIsValid: product ? true : false
  })

  const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier
    })
  }, [dispatchFormState])

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert(
        'Invalid input!',
        'Please check for errors in the form.',
        [{ text: 'OK' }]
      )
      return
    }
    if (product) {
      dispatch(ProductsActions.updateProduct(
        product.key,
        formState.inputValues.title,
        formState.inputValues.imageUrl,
        formState.inputValues.description
      ))
    } else {
      dispatch(ProductsActions.createProduct(
        formState.inputValues.title,
        formState.inputValues.imageUrl,
        formState.inputValues.description,
        +formState.inputValues.price
      ))
    }
    props.navigation.goBack()
  }, [dispatch, product, formState])

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler })
  }, [submitHandler])

  return (
    <KeyboardAvoidingView
      // style={{ flex: 1 }}
      behavior='position'
    // keyboardVerticalOffset={50}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id='title'
            label='Title'
            errorText='Please enter a valid title.'
            keyboardType='default'
            autoCapitalize='words'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={product ? product.title : ''}
            initiallyValid={!!product}
            required
          />
          <Input
            id='imageUrl'
            label='Image URL'
            errorText='Please enter a valid image URL.'
            keyboardType='default'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={product ? product.imageUrl : ''}
            initiallyValid={!!product}
            required
          />
          {/* Can't edit price for existing products */}
          {product ? null :
            <Input
              id='price'
              label='Price'
              errorText='Please enter a valid price.'
              keyboardType='decimal-pad'
              returnKeyType='next'
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />}
          <Input
            id='description'
            label='Description'
            errorText='Please enter a valid description.'
            keyboardType='default'
            autoCapitalize='sentences'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            multiline
            numberOfLines={3}
            initialValue={product ? product.description : ''}
            initiallyValid={!!product}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  }
})

export default EditProductScreen