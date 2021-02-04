import React from 'react';
import {View} from 'react-native';
import BackgroundImage from '../BackgroundImage';
import City from '../City';
import WeekTemperature from '../WeekTemperature';
import styles from './style';

export default function DataRendering(props) {
 

  return (
    <BackgroundImage>
      <View
        style={styles.cityContainer}>
        <City {...props} />
      </View>
      <View style={styles.weekContainer}>
        <WeekTemperature {...props} />
      </View>
    </BackgroundImage>
  );
}
