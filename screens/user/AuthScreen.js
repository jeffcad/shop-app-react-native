import React, { useState, useEffect, useReducer, useCallback } from 'react'
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch } from 'react-redux'

import Input from '../../components/UI/Input'
import Card from '../../components/UI/Card'
import Colors from '../../constants/Colors'
import * as AuthActions from '../../store/actions/auth'

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

function AuthScreen(props) {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [isSignup, setIsSignup] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (error) {
      Alert.alert(
        'Authentication error!',
        'There was an error with your authentication. Please check your information and try again. Also make sure that the login or sign-up is toggle is set correctly.',
        [{ text: 'OK' }]
      )
    }
  }, [error])

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  })

  const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier
    })
  }, [dispatchFormState])

  const authHandler = async () => {
    const actionToTake = isSignup ? AuthActions.signup : AuthActions.login
    setError(null)
    setIsLoading(true)
    try {
      await dispatch(actionToTake(
        formState.inputValues.email,
        formState.inputValues.password
      ))
      setIsLoading(false)
      props.navigation.navigate('Shop')
    } catch (err) {
      setError(err)
      setIsLoading(false)
    }
  }

  const toggleAuthenticate = () => {
    setIsSignup(prevState => !prevState)
  }

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={['#ffedff', '#ffe3ff']}
        style={styles.gradient}
      >
        <Card style={styles.authContainer}>
          <KeyboardAvoidingView behavior='position'>
            <ScrollView>
              <Input
                id='email'
                label='E-Mail'
                keyboardType='email-address'
                required
                email
                autoCapitalize='none'
                errorText='Please enter a valid email address.'
                onInputChange={inputChangeHandler}
                initialValue=''
              />
              <Input
                id='password'
                label='Password'
                keyboardType='default'
                secureTextEntry
                required
                minLength={6}
                autoCapitalize='none'
                errorText='Please enter a valid password.'
                onInputChange={inputChangeHandler}
                initialValue=''
              />
              <View style={styles.buttonContainer}>
                {isLoading ?
                  <ActivityIndicator
                    color={Colors.primary}
                    size='small'
                  /> :
                  <Button
                    title={isSignup ? 'Sign Up' : 'Login'}
                    color={Colors.primary}
                    onPress={authHandler}
                  />}
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                  color={Colors.accent}
                  onPress={toggleAuthenticate}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </Card>
      </LinearGradient>
    </View>
  )
}

AuthScreen.navigationOptions = {
  headerTitle: 'Login or Sign Up'
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 20
  }
})

export default AuthScreen