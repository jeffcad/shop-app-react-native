import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import {
  createDrawerNavigator,
  DrawerNavigatorItems
} from 'react-navigation-drawer'
import { View, Platform, Button, SafeAreaView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'

// Screens
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import UserProductsScreen from '../screens/user/UserProductsScreen'
import EditProductScreen from '../screens/user/EditProductScreen'
import AuthScreen from '../screens/user/AuthScreen'
import StartupScreen from '../screens/StartupScreen'

import Colors from '../constants/Colors'
import * as AuthActions from '../store/actions/auth'

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'ios' ? '' : Colors.primary,
  },
  headerTintColor: Platform.OS === 'ios' ? Colors.primary : 'white',
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  }
}

const ProductsNavigator = createStackNavigator({
  ProductsOverview: ProductsOverviewScreen,
  ProductDetail: ProductDetailScreen,
  Cart: CartScreen
}, {
  navigationOptions: {
    drawerIcon: drawerConfig =>
      <Ionicons
        name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
        size={23}
        color={drawerConfig.tintColor}
      />
  },
  defaultNavigationOptions: defaultNavOptions
})

const OrdersNavigator = createStackNavigator({
  Orders: OrdersScreen
}, {
  navigationOptions: {
    drawerIcon: drawerConfig =>
      <Ionicons
        name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
        size={23}
        color={drawerConfig.tintColor}
      />
  },
  defaultNavigationOptions: defaultNavOptions
})

const AdminNavigator = createStackNavigator({
  UserProducts: UserProductsScreen,
  EditProduct: EditProductScreen
}, {
  navigationOptions: {
    drawerIcon: drawerConfig =>
      <Ionicons
        name={Platform.OS === 'ios' ? 'ios-create' : 'md-create'}
        size={23}
        color={drawerConfig.tintColor}
      />
  },
  defaultNavigationOptions: defaultNavOptions
})

const ShopNavigator = createDrawerNavigator({
  Products: ProductsNavigator,
  Orders: OrdersNavigator,
  'Create/Edit/Delete Products': AdminNavigator
}, {
  contentOptions: {
    activeTintColor: Colors.primary
  },
  contentComponent: (props) => {
    const dispatch = useDispatch()
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <SafeAreaView
          forceInset={{ top: 'always', horizontal: 'never' }}
        >
          <DrawerNavigatorItems {...props} />
          <Button
            title='Logout'
            color={Colors.primary}
            onPress={() => {
              dispatch(AuthActions.logout())
              // Below line made unnecessary by NavigationContainer contents
              // If no NavigationContainer, need this again
              // props.navigation.navigate('Auth')
            }}
          />
        </SafeAreaView>
      </View>
    )
  }
})

const AuthNavigator = createStackNavigator({
  Auth: AuthScreen
}, {
  defaultNavigationOptions: defaultNavOptions
})

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator
})

export default createAppContainer(MainNavigator)