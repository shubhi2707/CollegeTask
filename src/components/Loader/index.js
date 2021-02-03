import React from 'react';
import {View, Image} from 'react-native';
import constants from '../../constants';
import styles from './style';

export default function Loader() {



 
  return (
    <View style={styles.outerContainer}>
      <Image source={constants.LoaderGif} style={styles.imageStyle} />
    </View>
  );
}
