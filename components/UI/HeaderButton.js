import React from 'react'
import { Platform } from 'react-native'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'

import Colors from '../../constants/Colors'

function CustomHeaderButton(props) {
  return <HeaderButton
    {...props}
    IconComponent={Ionicons}
    iconSize={23}
    color={Platform.OS === 'ios' ? Colors.primary : 'white'}
  />
}

export default CustomHeaderButton