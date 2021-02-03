import React, {useEffect} from 'react';
import {View, Text, ImageBackground} from 'react-native';

import constants from '../../constants';
import City from '../City';

export default function DataRendering(props) {
  return (
    <ImageBackground
      source={constants.SunnyImage}
      style={{width: '100%', height: '100%'}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <City {...props} />
      </View>
      <View style={{flex: 2, borderWidth: 2}}>
          
      </View>
    </ImageBackground>
  );
}
