import React, { useEffect } from 'react'
import {
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useDispatch } from 'react-redux'

import * as AuthActions from '../store/actions/auth'
import Colors from '../constants/Colors'

function StartupScreen(props) {

  const dispatch = useDispatch()

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData')
      if (!userData) {
        props.navigation.navigate('Auth')
        return
      }
      const transformedData = JSON.parse(userData)
      const { token, userId, expiryDate } = transformedData
      const expirationDate = new Date(expiryDate)
      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate('Auth')
        return
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime()

      props.navigation.navigate('Shop')
      dispatch(AuthActions.authenticate(userId, token, expirationTime))
    }

    tryLogin()

  }, [dispatch])

  return (
    <View style={styles.screen}>
      <ActivityIndicator
        color={Colors.primary}
        size='large'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default StartupScreen