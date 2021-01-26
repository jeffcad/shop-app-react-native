import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer'
import { View, Platform, Button, SafeAreaView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'

// Screens
import ProductsOverviewScreen, { screenOptions as productOverviewScreenOptions } from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen, { screenOptions as productDetailScreenOptions } from '../screens/shop/ProductDetailScreen'
import CartScreen, { screenOptions as cartScreenOptions } from '../screens/shop/CartScreen'
import OrdersScreen, { screenOptions as ordersScreenOptions } from '../screens/shop/OrdersScreen'
import UserProductsScreen, { screenOptions as userProductsScreenOptions } from '../screens/user/UserProductsScreen'
import EditProductScreen, { screenOptions as editProductsScreenOptions } from '../screens/user/EditProductScreen'
import AuthScreen, { screenOptions as authScreenOptions } from '../screens/user/AuthScreen'
import StartupScreen from '../screens/StartupScreen'

import Colors from '../constants/Colors'
import * as AuthActions from '../store/actions/auth'

const defaultNavOptions = {
  headerStyle: { backgroundColor: Platform.OS === 'ios' ? '' : Colors.primary },
  headerTintColor: Platform.OS === 'ios' ? Colors.primary : 'white',
  headerTitleStyle: { fontFamily: 'open-sans-bold' },
  headerBackTitleStyle: { fontFamily: 'open-sans' }
}

const ProductsStackNavigator = createStackNavigator()
const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsStackNavigator.Screen
        name='ProductsOverview'
        component={ProductsOverviewScreen}
        options={productOverviewScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name='ProductDetail'
        component={ProductDetailScreen}
        options={productDetailScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name='Cart'
        component={CartScreen}
        options={cartScreenOptions}
      />
    </ProductsStackNavigator.Navigator>
  )
}

const OrdersStackNavigator = createStackNavigator()
const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen
        name='Orders'
        component={OrdersScreen}
        options={ordersScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  )
}

const AdminStackNavigator = createStackNavigator()
const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AdminStackNavigator.Screen
        name='UserProducts'
        component={UserProductsScreen}
        options={userProductsScreenOptions}
      />
      <AdminStackNavigator.Screen
        name='EditProduct'
        component={EditProductScreen}
        options={editProductsScreenOptions}
      />

    </AdminStackNavigator.Navigator>
  )
}

const ShopDrawerNavigator = createDrawerNavigator()
export const ShopNavigator = () => {

  const dispatch = useDispatch()

  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={props => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView
              forceInset={{ top: 'always', horizontal: 'never' }}
            >
              <DrawerItemList {...props} />
              <Button
                title='Logout'
                color={Colors.primary}
                onPress={() => dispatch(AuthActions.logout())}
              />
            </SafeAreaView>
          </View>
        )
      }}
      drawerContentOptions={{ activeTintColor: Colors.primary }}
    >
      <ShopDrawerNavigator.Screen
        name='Products'
        component={ProductsNavigator}
        options={{
          drawerIcon: (props) =>
            <Ionicons
              name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
              size={23}
              color={props.color}
            />
        }}
      />
      <ShopDrawerNavigator.Screen
        name='Orders'
        component={OrdersNavigator}
        options={{
          drawerIcon: (props) =>
            <Ionicons
              name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
              size={23}
              color={props.color}
            />
        }}
      />
      <ShopDrawerNavigator.Screen
        name='Create/Edit/Delete Products'
        component={AdminNavigator}
        options={{
          drawerIcon: (props) =>
            <Ionicons
              name={Platform.OS === 'ios' ? 'ios-create' : 'md-create'}
              size={23}
              color={props.color}
            />
        }}
      />
    </ShopDrawerNavigator.Navigator>
  )
}

const AuthStackNavigator = createStackNavigator()
export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name='Auth'
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  )
}